export function getSiteUrl(): string {
  return 'http://farnostpribyslav.wz.cz';
}

export function toAbsoluteUrl(pathname: string): string {
  const base = getSiteUrl();
  return new URL(pathname, base).toString();
}
