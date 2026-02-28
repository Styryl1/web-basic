import fs from 'node:fs';
import path from 'node:path';
import { defineConfig } from 'tinacms';

type JsonPrimitive = string | number | boolean | null;
type JsonValue = JsonPrimitive | JsonValue[] | { [key: string]: JsonValue };

const envBranch =
  process.env.CF_PAGES_BRANCH ||
  process.env.HEAD ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.GITHUB_REF_NAME ||
  process.env.GITHUB_HEAD_REF;

const branch = (envBranch || 'main').trim();
const clientId = process.env.NEXT_PUBLIC_TINA_CLIENT_ID?.trim() || null;
const token = process.env.TINA_TOKEN?.trim() || null;

const siteContentPath = path.join(process.cwd(), 'content', 'tina', 'site-content.json');
const siteContentSource = fs.readFileSync(siteContentPath, 'utf8');
const siteContent = JSON.parse(siteContentSource) as Record<string, JsonValue>;

const toLabel = (name: string) =>
  name
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/[-_]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/^./, (char) => char.toUpperCase());

const createStringField = (name: string, value: string) => {
  const baseField: Record<string, unknown> = {
    type: 'string',
    name,
    label: toLabel(name),
  };

  if (value.includes('\n') || value.length > 140) {
    baseField.ui = { component: 'textarea' };
  }

  return baseField;
};

const buildObjectFields = (value: Record<string, JsonValue>): Record<string, unknown>[] =>
  Object.entries(value).map(([name, fieldValue]) => buildField(name, fieldValue));

const buildField = (name: string, value: JsonValue): Record<string, unknown> => {
  if (typeof value === 'string') {
    return createStringField(name, value);
  }

  if (typeof value === 'number') {
    return {
      type: 'number',
      name,
      label: toLabel(name),
    };
  }

  if (typeof value === 'boolean') {
    return {
      type: 'boolean',
      name,
      label: toLabel(name),
    };
  }

  if (Array.isArray(value)) {
    const first = value.find((entry) => entry !== null && entry !== undefined);

    if (typeof first === 'string') {
      return {
        type: 'string',
        name,
        label: toLabel(name),
        list: true,
      };
    }

    if (typeof first === 'number') {
      return {
        type: 'number',
        name,
        label: toLabel(name),
        list: true,
      };
    }

    if (typeof first === 'boolean') {
      return {
        type: 'boolean',
        name,
        label: toLabel(name),
        list: true,
      };
    }

    if (first && typeof first === 'object' && !Array.isArray(first)) {
      return {
        type: 'object',
        name,
        label: toLabel(name),
        list: true,
        fields: buildObjectFields(first as Record<string, JsonValue>),
      };
    }

    return {
      type: 'string',
      name,
      label: toLabel(name),
      list: true,
    };
  }

  if (value && typeof value === 'object') {
    return {
      type: 'object',
      name,
      label: toLabel(name),
      fields: buildObjectFields(value as Record<string, JsonValue>),
    };
  }

  return {
    type: 'string',
    name,
    label: toLabel(name),
  };
};

export default defineConfig({
  branch,
  clientId,
  token,
  build: {
    outputFolder: 'admin',
    publicFolder: 'public',
  },
  media: {
    tina: {
      mediaRoot: '',
      publicFolder: 'public',
    },
  },
  schema: {
    collections: [
      {
        name: 'siteContent',
        label: 'Site Content',
        path: 'content/tina',
        format: 'json',
        match: {
          include: 'site-content',
        },
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: buildObjectFields(siteContent),
      },
    ],
  },
});
