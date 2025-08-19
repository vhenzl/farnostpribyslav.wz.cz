import BrandLink from '@/components/brand-link';
import PageTitle from '@/components/page-title';
import { toAbsoluteUrl } from '@/lib/site';
import { getAllZpravy } from '@/lib/zpravy';
import type { Metadata } from 'next';
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
    <section>
      <PageTitle className="mt-4">Zprávy</PageTitle>
      {years.map(rok => (
        <section key={rok} className="my-8">
          <h2 id={`rok-${rok}`} className="sticky top-0 bg-amber-100 border-b border-amber-200 p-2 text-xl font-bold text-amber-900">{rok}</h2>
          <ul>
            {grouped.get(rok)!.map(x => (
              <li key={`${x.rok}-${x.idr}`} className="p-2 border-b border-dashed border-amber-200">
                <BrandLink
                  href={`/zpravy/${x.rok}-${x.idr}`}
                >
                  {x.nazev}
                </BrandLink>
                <span> </span>
                <small className="text-gray-500">
                  <span>—&nbsp;</span>
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
