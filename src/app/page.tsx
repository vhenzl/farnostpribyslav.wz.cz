import { toAbsoluteUrl } from '@/lib/site';
import { getYearsSummary } from '@/lib/zpravy';
import type { Metadata } from 'next';
import Link from 'next/link';
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
    <section>
      <h1>Farnost Přibyslav</h1>
      <p>Archiv webových stránek farnosti Přibyslav z let 2001 až 2008.</p>
      <p>
        Stránky uchovávají vybraný obsah prvního farního webu. Najdete zde
        {' '}
        <Link href="/zpravy">zprávy</Link>
        {' '}
        o událostech ve farnosti, články o
        {' '}
        <Link href="/varhany">opravách varhan</Link>
        {' '}
        a v sekci
        {' '}
        <Link href="/o-webu">O webu</Link>
        {' '}
        stručnou historii těchto stránek.
      </p>

      <p>Rychlé odkazy na zprávy z jednotlivých let:</p>
      <div>
        {years.map(y => (
          <Link key={y} href={`/zpravy#rok-${y}`}>
            {y}
          </Link>
        ))}
      </div>
      <p>
        Současné webové stránky farnosti Přibyslav naleznete na
        {' '}
        <a href="https://www.farnostpribyslav.cz">www.farnostpribyslav.cz</a>
        .
      </p>
    </section>
  );
}
