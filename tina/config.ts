import { defineConfig } from 'tinacms';
import siteContentJson from '../content/tina/site-content.json';

type JsonPrimitive = string | number | boolean | null;
type JsonValue = JsonPrimitive | JsonValue[] | { [key: string]: JsonValue };

type TinaField = Record<string, unknown>;

type StringFieldOptions = {
  required?: boolean;
  isTextarea?: boolean;
};

const envBranch =
  process.env.CF_PAGES_BRANCH ||
  process.env.HEAD ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.GITHUB_REF_NAME ||
  process.env.GITHUB_HEAD_REF;

const branch = (envBranch || 'main').trim();
const clientId = process.env.NEXT_PUBLIC_TINA_CLIENT_ID?.trim() || null;
const token = process.env.TINA_TOKEN?.trim() || null;
const isLocalTina = process.env.TINA_PUBLIC_IS_LOCAL === 'true';
const previewOriginEnv =
  process.env.TINA_PREVIEW_ORIGIN?.trim() ||
  process.env.CF_PAGES_URL?.trim() ||
  process.env.PUBLIC_SITE_URL?.trim() ||
  process.env.SITE_URL?.trim() ||
  '';
const previewOrigin = isLocalTina ? 'http://localhost:4321' : previewOriginEnv;

const siteContent = siteContentJson as Record<string, JsonValue>;

const toLabel = (name: string) =>
  name
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/[-_]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/^./, (char) => char.toUpperCase());

const isUrlValue = (value: string): boolean => {
  if (value.startsWith('#')) return true;
  if (value.startsWith('/')) return true;
  if (value.startsWith('./') || value.startsWith('../')) return true;
  if (/^(https?:\/\/|mailto:|tel:)/i.test(value)) return true;

  try {
    // Allow valid absolute URLs without explicit protocol in regex branch.
    // eslint-disable-next-line no-new
    new URL(value);
    return true;
  } catch {
    return false;
  }
};

const isLikelyUrlField = (name: string): boolean => /(?:href|url|origin)$/i.test(name);

const isLikelyImageField = (name: string): boolean => {
  const lower = name.toLowerCase();
  if (lower.endsWith('imagealt') || lower.endsWith('alt')) return false;
  return lower === 'ogimage' || lower === 'heroimagepath' || lower.endsWith('image') || lower.endsWith('imagepath');
};

const isAltField = (name: string): boolean => /alt$/i.test(name);

const stringValidator = (label: string, required = false) => (value: unknown): string | void => {
  const text = typeof value === 'string' ? value.trim() : '';
  if (required && !text) {
    return `${label} is required.`;
  }
};

const urlValidator = (label: string, required = true) => (value: unknown): string | void => {
  const text = typeof value === 'string' ? value.trim() : '';
  if (!text) {
    if (required) return `${label} is required.`;
    return;
  }

  if (!isUrlValue(text)) {
    return `${label} must be an absolute URL, relative path, or hash anchor.`;
  }
};

const imageValidator = (label: string, required = true) => (value: unknown): string | void => {
  const text = typeof value === 'string' ? value.trim() : '';
  if (!text && required) {
    return `${label} is required.`;
  }
};

const createStringField = (name: string, value: string, options: StringFieldOptions = {}): TinaField => {
  const label = toLabel(name);
  const isTextarea = options.isTextarea ?? (value.includes('\n') || value.length > 140);

  return {
    type: 'string',
    name,
    label,
    ui: {
      ...(isTextarea ? { component: 'textarea' } : {}),
      validate: stringValidator(label, options.required ?? false),
    },
  };
};

const createUrlField = (name: string, required = true): TinaField => {
  const label = toLabel(name);

  return {
    type: 'string',
    name,
    label,
    ui: {
      component: 'text',
      validate: urlValidator(label, required),
    },
  };
};

const createImageField = (name: string, required = true): TinaField => {
  const label = toLabel(name);

  return {
    type: 'image',
    name,
    label,
    ui: {
      validate: imageValidator(label, required),
    },
  };
};

const createAltField = (name: string, value: string): TinaField =>
  createStringField(name, value, {
    required: true,
    isTextarea: false,
  });

const withList = (field: TinaField): TinaField => ({
  ...field,
  list: true,
});

const buildExplicitField = (name: string, value: JsonValue): TinaField => {
  if (typeof value === 'string') {
    if (isLikelyImageField(name)) {
      return createImageField(name, true);
    }

    if (isLikelyUrlField(name)) {
      return createUrlField(name, true);
    }

    if (isAltField(name)) {
      return createAltField(name, value);
    }

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
      if (isLikelyImageField(name)) {
        return withList(createImageField(name, true));
      }

      if (isLikelyUrlField(name)) {
        return withList(createUrlField(name, true));
      }

      if (isAltField(name)) {
        return withList(createAltField(name, first));
      }

      return withList(createStringField(name, first));
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

  return createStringField(name, '');
};

const buildObjectFields = (value: Record<string, JsonValue>): TinaField[] =>
  Object.entries(value).map(([name, fieldValue]) => buildExplicitField(name, fieldValue));

export default defineConfig({
  branch,
  clientId,
  token,
  ui: previewOrigin
    ? {
        previewUrl: () => ({ url: previewOrigin }),
      }
    : undefined,
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
          router: () => '/',
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: buildObjectFields(siteContent) as any,
      },
    ],
  },
});
