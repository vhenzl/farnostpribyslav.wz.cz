import Script from 'next/script';

export function UmamiAnalytics() {
  const websiteId = process.env['NEXT_PUBLIC_UMAMI_WEBSITE_ID'];
  if (!websiteId || process.env.NODE_ENV !== 'production') {
    return null;
  }
  return <Script defer src="https://cloud.umami.is/script.js" data-website-id={websiteId} />;
}
