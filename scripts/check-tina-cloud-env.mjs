import fs from 'node:fs';
import path from 'node:path';

const requiredEnvVars = ['NEXT_PUBLIC_TINA_CLIENT_ID', 'TINA_TOKEN'];

const shellEnvKeys = new Set(Object.keys(process.env));

const stripQuotes = (value) => {
  const trimmed = value.trim();
  if (trimmed.length < 2) return trimmed;
  const first = trimmed[0];
  const last = trimmed[trimmed.length - 1];
  if ((first === '"' && last === '"') || (first === "'" && last === "'")) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
};

const loadEnvFile = (filename) => {
  const filePath = path.resolve(process.cwd(), filename);
  if (!fs.existsSync(filePath)) return;

  const source = fs.readFileSync(filePath, 'utf8');
  for (const rawLine of source.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;

    const match = rawLine.match(/^\s*(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
    if (!match) continue;

    const key = match[1];
    const value = stripQuotes(match[2]);

    // Keep explicit shell exports authoritative.
    if (shellEnvKeys.has(key)) continue;

    process.env[key] = value;
  }
};

loadEnvFile('.env');
loadEnvFile('.env.local');

const missingEnvVars = requiredEnvVars.filter((key) => {
  const value = process.env[key];
  return !value || value.trim().length === 0;
});

if (missingEnvVars.length > 0) {
  console.error('[tina] TinaCloud mode is missing required environment variables.');
  console.error(`[tina] Missing: ${missingEnvVars.join(', ')}`);
  console.error('[tina] Copy .env.example to .env and set these values from app.tina.io.');
  console.error('[tina] If you want local file-based editing instead, run: pnpm dev:local');
  process.exit(1);
}
