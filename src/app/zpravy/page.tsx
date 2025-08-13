import { toAbsoluteUrl } from '@/lib/site';
import { getAllZpravy } from '@/lib/zpravy';
import type { Metadata } from 'next';
import Link from 'next/link';
import type { JSX } from 'react';

export const metadata: Metadata = {
  title: 'Zprávy 2001–2008',
  description: 'Archiv webových zpráv farnosti Přibyslav z let 2001 až 2008.',
  alternates: { canonical: toAbsoluteUrl('/zpravy') },
  openGraph: {
    type: 'website',
    url: toAbsoluteUrl('/zpravy'),
    title: 'Zprávy 2001–2008',
    description: 'Archiv webových zpráv farnosti Přibyslav z let 2001 až 2008.',
  },
};

export default async function ZpravyPage(): Promise<JSX.Element> {
  const zpravy = await getAllZpravy();
  const grouped = new Map<number, typeof zpravy>();
  for (const item of zpravy) {
    const arr = grouped.get(item.rok) ?? [];
    arr.push(item);
    grouped.set(item.rok, arr);
  }
  const years = Array.from(grouped.keys()).sort((a, b) => b - a);
  return (
    <section className="prose">
      <h1>Zprávy</h1>
      {years.map(rok => (
        <section key={rok} className="year-section">
          <h2 id={`rok-${rok}`} className="year-heading">{rok}</h2>
          <ul className="zpravy-list">
            {grouped.get(rok)!.map(x => (
              <li key={`${x.rok}-${x.idr}`} className="zpravy-item">
                <Link href={`/zpravy/${x.rok}-${x.idr}`}>{x.nazev}</Link>
                <span> </span>
                <small>
                  <span>— </span>
                  <span>{x.autor}</span>
                </small>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </section>
  );
}
