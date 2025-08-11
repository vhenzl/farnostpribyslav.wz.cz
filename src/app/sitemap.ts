import type { MetadataRoute } from 'next';
import { getAllZpravy } from '../lib/content';
import { toAbsoluteUrl } from '../lib/site';
import { listVarhany } from '../lib/varhany';

export const dynamic = 'force-static';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base: MetadataRoute.Sitemap = [
    { url: toAbsoluteUrl('/'), changeFrequency: 'monthly', priority: 1 },
    { url: toAbsoluteUrl('/zpravy'), changeFrequency: 'weekly', priority: 0.9 },
    { url: toAbsoluteUrl('/varhany'), changeFrequency: 'yearly', priority: 0.5 },
    { url: toAbsoluteUrl('/o-webu'), changeFrequency: 'yearly', priority: 1 },
  ];

  const zpravy = await getAllZpravy();
  const zpravyUrls: MetadataRoute.Sitemap = zpravy.map(z => ({
    url: toAbsoluteUrl(`/zpravy/${z.rok}-${z.idr}`),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const varhany = await listVarhany();
  const varhanyUrls: MetadataRoute.Sitemap = varhany
    .filter(v => v.slug !== 'index')
    .map(v => ({ url: toAbsoluteUrl(`/varhany/${v.slug}`), changeFrequency: 'yearly', priority: 0.5 }));

  return [...base, ...zpravyUrls, ...varhanyUrls];
}
