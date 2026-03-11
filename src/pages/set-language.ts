import type { APIRoute } from 'astro';
import { DEFAULT_LOCALE, LOCALE_COOKIE_MAX_AGE, LOCALE_COOKIE_NAME, getLocalizedPath, isLocale } from '../i18n/config';

export const prerender = false;

const resolveRedirectPath = (redirectTo: string | null, locale: string): string => {
  if (!redirectTo || !redirectTo.startsWith('/') || redirectTo.startsWith('//')) {
    return getLocalizedPath('/', isLocale(locale) ? locale : DEFAULT_LOCALE);
  }

  return redirectTo;
};

export const GET: APIRoute = ({ cookies, redirect, url }) => {
  const requestedLocale = url.searchParams.get('locale');
  const locale = isLocale(requestedLocale) ? requestedLocale : DEFAULT_LOCALE;
  const redirectTo = resolveRedirectPath(url.searchParams.get('redirect'), locale);

  cookies.set(LOCALE_COOKIE_NAME, locale, {
    path: '/',
    maxAge: LOCALE_COOKIE_MAX_AGE,
    sameSite: 'lax',
    secure: url.protocol === 'https:',
    httpOnly: false,
  });

  return redirect(redirectTo, 302);
};
