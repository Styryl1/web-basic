import fs from 'node:fs/promises';
import path from 'node:path';

const CONTENT_PATH = path.resolve(process.cwd(), 'content/tina/site-content.json');
const deeplApiKey = process.env.DEEPL_API_KEY?.trim();

if (!deeplApiKey) {
  console.error('Missing DEEPL_API_KEY. This script uses the official DeepL /v2/translate API to fill translations.');
  process.exit(1);
}

const siteContent = JSON.parse(await fs.readFile(CONTENT_PATH, 'utf8'));
const translationConfig = siteContent.translationAutomation ?? {};
const sourceLocale = (process.env.TRANSLATION_SOURCE_LOCALE ?? translationConfig.sourceLocale ?? 'en').toLowerCase();
const targetLocales = (process.env.TRANSLATION_TARGET_LOCALES?.split(',') ?? translationConfig.targetLocales ?? ['nl'])
  .map((value) => String(value).trim().toLowerCase())
  .filter(Boolean);
const deeplBaseUrl = String(process.env.DEEPL_API_BASE_URL ?? translationConfig.deeplBaseUrl ?? 'https://api-free.deepl.com').replace(/\/$/, '');
const businessName = siteContent.siteSettings?.businessName ?? '';

const NON_TRANSLATABLE_KEY_PATTERN = /(?:href|url|origin|imagePath|path|code|htmlLang|ogLocale|shortLabel)$/i;
const BATCH_SIZE = 25;

const isTranslatableString = (keyPath, value) => {
  if (typeof value !== 'string') return false;
  const trimmed = value.trim();
  if (!trimmed) return false;
  if (trimmed === businessName) return false;
  if (NON_TRANSLATABLE_KEY_PATTERN.test(keyPath.at(-1) ?? '')) return false;
  if (/^(https?:\/\/|mailto:|tel:|\/|#)/i.test(trimmed)) return false;
  if (/^[@][a-z0-9._-]+$/i.test(trimmed)) return false;
  if (/^[A-Z]{2,4}$/.test(trimmed)) return false;
  if (/^[\d\s€$£+/%.,:;()&-]+$/u.test(trimmed)) return false;
  return true;
};

const shouldTranslateValue = (sourceValue, targetValue, keyPath) => {
  if (!isTranslatableString(keyPath, sourceValue)) return false;
  if (typeof targetValue !== 'string') return true;

  const normalizedSource = sourceValue.trim();
  const normalizedTarget = targetValue.trim();

  return !normalizedTarget || normalizedTarget === normalizedSource;
};

const collectJobs = (sourceNode, targetNode, keyPath = [], jobs = []) => {
  if (typeof sourceNode === 'string') {
    if (shouldTranslateValue(sourceNode, targetNode, keyPath)) {
      jobs.push({
        keyPath,
        text: sourceNode,
      });
    }
    return jobs;
  }

  if (Array.isArray(sourceNode)) {
    sourceNode.forEach((value, index) => {
      collectJobs(value, Array.isArray(targetNode) ? targetNode[index] : undefined, [...keyPath, index], jobs);
    });
    return jobs;
  }

  if (sourceNode && typeof sourceNode === 'object') {
    Object.entries(sourceNode).forEach(([key, value]) => {
      collectJobs(value, targetNode?.[key], [...keyPath, key], jobs);
    });
  }

  return jobs;
};

const setNestedValue = (root, keyPath, value) => {
  let pointer = root;

  for (let index = 0; index < keyPath.length - 1; index += 1) {
    const segment = keyPath[index];
    const nextSegment = keyPath[index + 1];

    if (pointer[segment] === undefined) {
      pointer[segment] = typeof nextSegment === 'number' ? [] : {};
    }

    pointer = pointer[segment];
  }

  pointer[keyPath.at(-1)] = value;
};

const translateBatch = async (texts, sourceLang, targetLang) => {
  const response = await fetch(`${deeplBaseUrl}/v2/translate`, {
    method: 'POST',
    headers: {
      Authorization: `DeepL-Auth-Key ${deeplApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text: texts,
      source_lang: sourceLang.toUpperCase(),
      target_lang: targetLang.toUpperCase(),
      preserve_formatting: true,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`DeepL request failed (${response.status}): ${errorBody}`);
  }

  const payload = await response.json();
  return (payload.translations ?? []).map((entry) => entry.text);
};

for (const [pageKey, pageValue] of Object.entries(siteContent.pages ?? {})) {
  const translations = pageValue?.translations;
  const sourceTranslation = translations?.[sourceLocale];

  if (!sourceTranslation) continue;

  for (const targetLocale of targetLocales) {
    if (targetLocale === sourceLocale) continue;

    const targetTranslation = translations[targetLocale] ?? structuredClone(sourceTranslation);
    translations[targetLocale] = targetTranslation;

    const jobs = collectJobs(sourceTranslation, targetTranslation);

    for (let index = 0; index < jobs.length; index += BATCH_SIZE) {
      const batch = jobs.slice(index, index + BATCH_SIZE);
      const translatedTexts = await translateBatch(
        batch.map((job) => job.text),
        sourceLocale,
        targetLocale,
      );

      translatedTexts.forEach((translatedText, translatedIndex) => {
        setNestedValue(targetTranslation, batch[translatedIndex].keyPath, translatedText);
      });
    }

    console.log(`Translated ${jobs.length} field(s) for page "${pageKey}" -> ${targetLocale}.`);
  }
}

await fs.writeFile(CONTENT_PATH, `${JSON.stringify(siteContent, null, 2)}\n`);
console.log(`Updated ${CONTENT_PATH}`);
