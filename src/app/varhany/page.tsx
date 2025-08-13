import { toAbsoluteUrl } from '@/lib/site';
import { getVarhanyBySlug } from '@/lib/varhany';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { JSX } from 'react';

export const metadata: Metadata = {
  title: 'Opravy varhan ve farnosti',
  description: 'Archiv textů o opravách varhan ve farnosti Přibyslav.',
  alternates: { canonical: toAbsoluteUrl('/varhany') },
  openGraph: {
    type: 'website',
    url: toAbsoluteUrl('/varhany'),
    title: 'Opravy varhan ve farnosti',
    description: 'Archiv textů o opravách varhan ve farnosti Přibyslav.',
  },
};

export default async function VarhanyIndex(): Promise<JSX.Element> {
  const item = await getVarhanyBySlug('index');
  if (!item) return notFound();
  return (
    <article className="prose">
      <h1>{item.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: item.bodyHtml }} />
    </article>
  );
}
