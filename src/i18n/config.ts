export const DEFAULT_LOCALE = 'en' as const;
export const SUPPORTED_LOCALES = ['en', 'nl'] as const;
export const LOCALE_COOKIE_NAME = 'ep_locale';
export const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export type Locale = (typeof SUPPORTED_LOCALES)[number];

const LOCALE_PREFIXES: Record<Locale, string> = {
  en: '',
  nl: 'nl',
};

export const OG_LOCALES: Record<Locale, string> = {
  en: 'en_GB',
  nl: 'nl_NL',
};

export const HTML_LANGS: Record<Locale, string> = {
  en: 'en',
  nl: 'nl',
};

export const isLocale = (value: string | undefined | null): value is Locale =>
  Boolean(value && SUPPORTED_LOCALES.includes(value as Locale));

export const normalizePathname = (pathname: string): string => {
  if (!pathname) return '/';
  const normalized = pathname.startsWith('/') ? pathname : `/${pathname}`;

  if (normalized === '/') return normalized;
  if (normalized.endsWith('/')) return normalized;

  return `${normalized}/`;
};

export const getLocaleFromPathname = (pathname: string): Locale => {
  const normalized = normalizePathname(pathname);

  for (const locale of SUPPORTED_LOCALES) {
    const prefix = LOCALE_PREFIXES[locale];
    if (!prefix) continue;
    if (normalized === `/${prefix}/` || normalized.startsWith(`/${prefix}/`)) {
      return locale;
    }
  }

  return DEFAULT_LOCALE;
};

export const stripLocaleFromPathname = (pathname: string): string => {
  const normalized = normalizePathname(pathname);
  const locale = getLocaleFromPathname(normalized);
  const prefix = LOCALE_PREFIXES[locale];

  if (!prefix) return normalized;

  const stripped = normalized.replace(new RegExp(`^/${prefix}(?=/|$)`), '');
  return stripped || '/';
};

export const getLocalizedPath = (pathname: string, locale: Locale): string => {
  const stripped = stripLocaleFromPathname(pathname);
  const prefix = LOCALE_PREFIXES[locale];

  if (!prefix) return stripped;
  if (stripped === '/') return `/${prefix}/`;

  return `/${prefix}${stripped}`;
};

export const getLanguageSwitcherHref = (pathname: string, locale: Locale): string => {
  const redirect = getLocalizedPath(pathname, locale);
  const params = new URLSearchParams({
    locale,
    redirect,
  });

  return `/set-language?${params.toString()}`;
};

export const getPreferredLocaleFromHeader = (acceptLanguageHeader: string | null): Locale => {
  if (!acceptLanguageHeader) return DEFAULT_LOCALE;

  const requestedLocales = acceptLanguageHeader
    .split(',')
    .map((entry) => entry.trim().split(';')[0]?.toLowerCase())
    .filter(Boolean) as string[];

  if (requestedLocales.some((value) => value === 'nl' || value.startsWith('nl-'))) {
    return 'nl';
  }

  return DEFAULT_LOCALE;
};

export const isBotUserAgent = (userAgentHeader: string | null): boolean => {
  if (!userAgentHeader) return false;
  return /bot|crawler|spider|slurp|bingpreview|headless|lighthouse/i.test(userAgentHeader);
};
