import { defineMiddleware } from 'astro:middleware';
import {
  DEFAULT_LOCALE,
  LOCALE_COOKIE_MAX_AGE,
  LOCALE_COOKIE_NAME,
  getLocaleFromPathname,
  getLocalizedPath,
  getPreferredLocaleFromHeader,
  isBotUserAgent,
  isLocale,
  normalizePathname,
} from './i18n/config';

const appendVary = (response: Response, value: string) => {
  const current = response.headers.get('Vary');
  if (!current) {
    response.headers.set('Vary', value);
    return;
  }

  const tokens = current
    .split(',')
    .map((entry) => entry.trim().toLowerCase())
    .filter(Boolean);

  if (!tokens.includes(value.toLowerCase())) {
    response.headers.set('Vary', `${current}, ${value}`);
  }
};

const isBypassedPath = (pathname: string): boolean =>
  pathname.startsWith('/admin') ||
  pathname.startsWith('/_astro') ||
  pathname.startsWith('/api/') ||
  pathname.startsWith('/set-language') ||
  pathname.startsWith('/favicon');

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;
  const normalizedPathname = normalizePathname(pathname);

  if (isBypassedPath(normalizedPathname) || !['GET', 'HEAD'].includes(context.request.method)) {
    return next();
  }

  const localeCookie = context.cookies.get(LOCALE_COOKIE_NAME)?.value;
  const storedLocale = isLocale(localeCookie) ? localeCookie : undefined;
  const requestLocale = getLocaleFromPathname(normalizedPathname);

  if (normalizedPathname === '/') {
    const preferredLocale =
      storedLocale ??
      (isBotUserAgent(context.request.headers.get('user-agent'))
        ? DEFAULT_LOCALE
        : getPreferredLocaleFromHeader(context.request.headers.get('accept-language')));

    if (preferredLocale !== DEFAULT_LOCALE) {
      const redirectResponse = context.redirect(getLocalizedPath(normalizedPathname, preferredLocale), 302);
      appendVary(redirectResponse, 'Accept-Language');
      appendVary(redirectResponse, 'Cookie');
      return redirectResponse;
    }
  }

  const response = await next();
  const contentType = response.headers.get('content-type') ?? '';

  if (contentType.includes('text/html')) {
    appendVary(response, 'Accept-Language');
    appendVary(response, 'Cookie');
    context.cookies.set(LOCALE_COOKIE_NAME, requestLocale, {
      path: '/',
      maxAge: LOCALE_COOKIE_MAX_AGE,
      sameSite: 'lax',
      secure: context.url.protocol === 'https:',
      httpOnly: false,
    });
  }

  return response;
});
