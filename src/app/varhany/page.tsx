import { notFound } from 'next/navigation';
import type { JSX } from 'react';
import { getVarhanyBySlug } from '../../lib/varhany';

export const metadata = { title: 'Opravy varhan ve farnosti' };

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
