import siteContentJson from '../../content/tina/site-content.json';
import client from '../../tina/__generated__/client';
import { addMetadata, hashFromQuery } from 'tinacms/dist/react';
import { DEFAULT_LOCALE, HTML_LANGS, OG_LOCALES, type Locale } from '../i18n/config';

type JsonRecord = Record<string, any>;

export type TinaBridgeProps = {
  query: string;
  variables: Record<string, unknown>;
  data: Record<string, unknown>;
};

export type SiteDocumentResult = {
  siteContent: JsonRecord;
  tinaBridgeProps: TinaBridgeProps | null;
};

const isLocalStaticBuild = import.meta.env.PROD && process.env.TINA_PUBLIC_IS_LOCAL === 'true';

export const loadSiteDocument = async (): Promise<SiteDocumentResult> => {
  let tinaPayload = null;

  if (!isLocalStaticBuild) {
    try {
      tinaPayload = await client.queries.siteContent({ relativePath: 'site-content.json' });
    } catch {
      tinaPayload = null;
    }
  }

  const queryIdentity = tinaPayload ? JSON.stringify({ query: tinaPayload.query, variables: tinaPayload.variables }) : '';
  const siteContentResponse = tinaPayload
    ? addMetadata(hashFromQuery(queryIdentity), structuredClone(tinaPayload.data), [])
    : ({ siteContent: structuredClone(siteContentJson) } as { siteContent: JsonRecord });

  return {
    siteContent: (siteContentResponse as { siteContent: JsonRecord }).siteContent,
    tinaBridgeProps: tinaPayload
      ? {
          query: tinaPayload.query,
          variables: tinaPayload.variables as Record<string, unknown>,
          data: tinaPayload.data as unknown as Record<string, unknown>,
        }
      : null,
  };
};

export const getLocaleSettings = (siteContent: JsonRecord, locale: Locale): JsonRecord => {
  const localeSettings = siteContent.siteSettings?.locales?.find?.((entry: JsonRecord) => entry?.code === locale);

  return {
    code: locale,
    htmlLang: localeSettings?.htmlLang ?? HTML_LANGS[locale],
    ogLocale: localeSettings?.ogLocale ?? OG_LOCALES[locale],
    label: localeSettings?.label ?? locale.toUpperCase(),
    shortLabel: localeSettings?.shortLabel ?? locale.toUpperCase(),
    nativeLabel: localeSettings?.nativeLabel ?? locale.toUpperCase(),
  };
};

export const getHomeTranslation = (siteContent: JsonRecord, locale: Locale): JsonRecord => {
  const translations = siteContent.pages?.home?.translations;
  if (translations?.[locale]) return translations[locale];
  return translations?.[DEFAULT_LOCALE] ?? {};
};
