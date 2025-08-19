import BrandLink from '@/components/brand-link';
import PageTitle from '@/components/page-title';
import { toAbsoluteUrl } from '@/lib/site';
import { getYearsSummary } from '@/lib/zpravy';
import type { Metadata } from 'next';
import type { JSX } from 'react';

export const metadata: Metadata = {
  title: 'Archiv farnosti Přibyslav',
  description: 'Archiv webových stránek farnosti Přibyslav z let 2001 až 2008.',
  alternates: { canonical: toAbsoluteUrl('/') },
  openGraph: {
    type: 'website',
    url: toAbsoluteUrl('/'),
    title: 'Archiv farnosti Přibyslav',
    description: 'Archiv webových stránek farnosti Přibyslav z let 2001 až 2008.',
  },
};

export default async function Page(): Promise<JSX.Element> {
  const years: number[] = await getYearsSummary();
  return (
    <section className="flex items-center justify-center min-h-[60vh] flex-col text-stone-800">
      <PageTitle className="sm:text-5xl mb-4">Farnost Přibyslav</PageTitle>
      <p className="text-amber-600 font-semibold text-xl sm:text-2xl text-center mb-12">
        Archiv webových stránek farnosti Přibyslav z let 2001 až 2008.
      </p>
      <p className="text-center max-w-xl mb-8 font-semibold">
        Stránky uchovávají vybraný obsah prvního farního webu.
        {' '}
        <br className="hidden sm:block" />
        Najdete zde původní
        {' '}
        <BrandLink href="/zpravy">zprávy o událostech ve farnosti</BrandLink>
        , informace o tehdy probíhajících
        {' '}
        <BrandLink href="/varhany">opravách varhan</BrandLink>
        {' '}
        a také stručnou
        {' '}
        <BrandLink href="/o-webu">historii těchto stránek</BrandLink>
        {' '}
        .
      </p>

      <p className="mb-2">Rychlé odkazy na zprávy z jednotlivých let:</p>
      <div className="mb-12 flex flex-wrap justify-center gap-3">
        {years.map(y => (
          <BrandLink key={y} className="font-semibold" href={`/zpravy#rok-${y}`}>
            {y}
          </BrandLink>
        ))}
      </div>
      <p className="text-center font">
        Současné webové stránky farnosti Přibyslav naleznete na
        {' '}
        <BrandLink className="font-bold" href="https://www.farnostpribyslav.cz">www.farnostpribyslav.cz</BrandLink>
        .
      </p>
    </section>
  );
}
