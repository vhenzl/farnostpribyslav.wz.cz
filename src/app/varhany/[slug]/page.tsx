import { toAbsoluteUrl } from '@/lib/site';
import { getVarhanyBySlug, listVarhany } from '@/lib/varhany';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { JSX } from 'react';

export async function generateStaticParams() {
  const all = (await listVarhany()).filter(x => x.slug !== 'index');
  return all.map(i => ({ slug: i.slug }));
}

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = await getVarhanyBySlug(slug);
  if (!item) return { title: 'Opravy varhan' };

  const url = toAbsoluteUrl(`/varhany/${item.slug}`);
  return {
    title: item.title,
    description: 'Archiv textů o opravách varhan ve farnosti Přibyslav.',
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title: item.title,
      description: 'Archiv textů o opravách varhan ve farnosti Přibyslav.',
    },
  };
}

export default async function VarhanyDetail({ params }: PageProps): Promise<JSX.Element> {
  const { slug } = await params;
  // no need to handle index thanks to "output: export" config and generateStaticParams()
  const item = await getVarhanyBySlug(slug);
  if (!item) return notFound();
  return (
    <article className="prose">
      <h1>{item.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: item.bodyHtml }} />
    </article>
  );
}
