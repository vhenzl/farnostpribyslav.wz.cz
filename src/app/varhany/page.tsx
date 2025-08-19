import PageTitle from '@/components/page-title';
import Prose from '@/components/prose';
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
    <article>
      <PageTitle className="mb-8 mt-4">{item.title}</PageTitle>
      <Prose
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: item.bodyHtml }}
      />
    </article>
  );
}
