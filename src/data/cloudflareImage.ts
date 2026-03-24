export interface CloudflareImageOptions {
  width?: number;
  height?: number;
  quality?: number;
  fit?: 'contain' | 'cover' | 'crop' | 'pad' | 'scale-down';
}

const LOCAL_HOSTNAMES = new Set(['localhost', '127.0.0.1', '[::1]']);

const isLocalRequest = (requestUrl: URL) => LOCAL_HOSTNAMES.has(requestUrl.hostname);

const isTransformableRaster = (value: string) => /\.(?:avif|gif|jpe?g|png|webp)(?:$|\?)/i.test(value);

const getSourcePath = (imageSrc: string, requestUrl: URL, allowedHosts: Set<string>): string | null => {
  if (!imageSrc || imageSrc.startsWith('data:') || imageSrc.startsWith('/cdn-cgi/image/')) return null;

  try {
    const url = /^https?:\/\//i.test(imageSrc) ? new URL(imageSrc) : new URL(imageSrc, requestUrl);
    if (/^https?:\/\//i.test(imageSrc) && !allowedHosts.has(url.host)) return null;
    return `${url.pathname}${url.search}`;
  } catch {
    return null;
  }
};

const buildTransformParams = (options: CloudflareImageOptions) => {
  const params = [
    'format=auto',
    `quality=${options.quality ?? 75}`,
    'metadata=none',
  ];

  if (options.width) params.push(`width=${Math.round(options.width)}`);
  if (options.height) params.push(`height=${Math.round(options.height)}`);
  if (options.fit) params.push(`fit=${options.fit}`);

  return params.join(',');
};

export const transformImageForRequest = (
  imageSrc: string,
  requestUrl: URL,
  options: CloudflareImageOptions,
  allowedHosts: string[] = [],
): string => {
  if (!imageSrc || isLocalRequest(requestUrl)) return imageSrc;

  const allowedHostSet = new Set([requestUrl.host, ...allowedHosts].filter(Boolean));
  const sourcePath = getSourcePath(imageSrc, requestUrl, allowedHostSet);
  if (!sourcePath || !isTransformableRaster(sourcePath)) return imageSrc;

  return `/cdn-cgi/image/${buildTransformParams(options)}${sourcePath}`;
};

export const transformImageSrcSetForRequest = (
  imageSrc: string,
  requestUrl: URL,
  variants: CloudflareImageOptions[],
  allowedHosts: string[] = [],
): string | undefined => {
  if (!variants.length || isLocalRequest(requestUrl)) return undefined;

  const allowedHostSet = new Set([requestUrl.host, ...allowedHosts].filter(Boolean));
  const sourcePath = getSourcePath(imageSrc, requestUrl, allowedHostSet);
  if (!sourcePath || !isTransformableRaster(sourcePath)) return undefined;

  return variants
    .filter((variant) => typeof variant.width === 'number' && variant.width > 0)
    .map((variant) => `/cdn-cgi/image/${buildTransformParams(variant)}${sourcePath} ${Math.round(variant.width!)}w`)
    .join(', ');
};
