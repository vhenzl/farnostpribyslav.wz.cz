import { notFound } from 'next/navigation';
import type { JSX } from 'react';
import { getVarhanyBySlug, listVarhany } from '../../../lib/varhany.ts';

export async function generateStaticParams() {
  const all = await listVarhany();
  return all.map(i => ({ slug: i.slug }));
}

type PageProps = { params: Promise<{ slug: string }> };

export default async function VarhanyDetail({ params }: PageProps): Promise<JSX.Element> {
  const { slug } = await params;
  const item = await getVarhanyBySlug(slug);
  if (!item) return notFound();
  return (
    <article>
      <h1>{item.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: item.bodyHtml }} />
    </article>
  );
}
