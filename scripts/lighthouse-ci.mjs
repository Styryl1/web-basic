import { spawn } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import lighthouse from 'lighthouse';

const RUNS = 3;
const MAX_REGRESSION = 5;
const TARGET_URL = process.env.LIGHTHOUSE_URL || 'http://127.0.0.1:4321/';
const BASELINE_PATH = process.env.LIGHTHOUSE_BASELINE_PATH || '.lighthouse-baseline.json';
const CHROME_PATH = process.env.CHROME_PATH || process.env.GOOGLE_CHROME_BIN || 'google-chrome';

const THRESHOLDS = {
  performance: 90,
  accessibility: 95,
  'best-practices': 95,
  seo: 95,
};

const categoryLabels = {
  performance: 'Performance',
  accessibility: 'Accessibility',
  'best-practices': 'Best Practices',
  seo: 'SEO',
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const median = (values) => {
  const sorted = [...values].sort((a, b) => a - b);
  return sorted[Math.floor(sorted.length / 2)];
};

const loadBaseline = () => {
  const resolvedPath = path.resolve(process.cwd(), BASELINE_PATH);
  if (!fs.existsSync(resolvedPath)) return null;

  try {
    return JSON.parse(fs.readFileSync(resolvedPath, 'utf8'));
  } catch (error) {
    throw new Error(`Failed to parse Lighthouse baseline at ${resolvedPath}: ${String(error)}`);
  }
};

const waitForDebugger = async (port, timeoutMs = 15000) => {
  const endpoint = `http://127.0.0.1:${port}/json/version`;
  const deadline = Date.now() + timeoutMs;

  while (Date.now() < deadline) {
    try {
      const response = await fetch(endpoint);
      if (response.ok) {
        return;
      }
    } catch {
      // Wait and retry.
    }

    await sleep(250);
  }

  throw new Error(`Chrome debugger did not start on port ${port}.`);
};

const startChrome = async () => {
  const debuggingPort = 9200 + Math.floor(Math.random() * 500);
  const userDataDir = fs.mkdtempSync(path.join(os.tmpdir(), 'lh-chrome-'));
  const chromeFlags = [
    '--headless',
    '--disable-gpu',
    '--no-sandbox',
    '--disable-dev-shm-usage',
    `--remote-debugging-port=${debuggingPort}`,
    `--user-data-dir=${userDataDir}`,
    'about:blank',
  ];

  const processHandle = spawn(CHROME_PATH, chromeFlags, {
    stdio: 'ignore',
  });

  await waitForDebugger(debuggingPort);

  return {
    processHandle,
    port: debuggingPort,
    userDataDir,
  };
};

const stopChrome = async ({ processHandle, userDataDir }) => {
  if (!processHandle.killed) {
    processHandle.kill('SIGTERM');
  }

  await sleep(200);

  if (!processHandle.killed) {
    processHandle.kill('SIGKILL');
  }

  fs.rmSync(userDataDir, { recursive: true, force: true });
};

const runLighthouse = async (url) => {
  const chrome = await startChrome();

  try {
    const result = await lighthouse(url, {
      port: chrome.port,
      logLevel: 'error',
      output: 'json',
      onlyCategories: Object.keys(THRESHOLDS),
    });

    if (!result?.lhr) {
      throw new Error('Lighthouse returned no report.');
    }

    const scores = {};
    for (const key of Object.keys(THRESHOLDS)) {
      const score = result.lhr.categories?.[key]?.score;
      if (typeof score !== 'number') {
        throw new Error(`Missing category score: ${key}`);
      }
      scores[key] = Math.round(score * 100);
    }

    return scores;
  } finally {
    await stopChrome(chrome);
  }
};

const run = async () => {
  const baseline = loadBaseline();
  const allRunScores = [];

  for (let index = 0; index < RUNS; index += 1) {
    const scores = await runLighthouse(TARGET_URL);
    allRunScores.push(scores);
    console.log(`Run ${index + 1}/${RUNS}:`, scores);
  }

  const medianScores = {};
  for (const key of Object.keys(THRESHOLDS)) {
    medianScores[key] = median(allRunScores.map((scores) => scores[key]));
  }

  console.log('Median scores:', medianScores);

  const failures = [];

  for (const [key, threshold] of Object.entries(THRESHOLDS)) {
    const score = medianScores[key];

    if (score < threshold) {
      failures.push(`${categoryLabels[key]} median score ${score} is below threshold ${threshold}.`);
    }

    const baselineValue = baseline?.[key];
    if (typeof baselineValue === 'number') {
      const drop = baselineValue - score;
      if (drop > MAX_REGRESSION) {
        failures.push(
          `${categoryLabels[key]} regressed by ${drop} points (baseline ${baselineValue} -> median ${score}, allowed ${MAX_REGRESSION}).`,
        );
      }
    }
  }

  if (failures.length > 0) {
    console.error('\nLighthouse quality gate failed:\n- ' + failures.join('\n- '));
    process.exit(1);
  }

  console.log('\nLighthouse quality gate passed.');
};

run().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
