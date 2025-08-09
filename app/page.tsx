import Link from 'next/link';
import type { JSX } from 'react';
import { getYearsSummary } from '../lib/content';

export default async function Page(): Promise<JSX.Element> {
  const years: number[] = await getYearsSummary();
  return (
    <section>
      <h1>Webarchiv farnosti Přibyslav</h1>
      <p>
        Stránky uchovávají vybrané obsahy z let 2002–2008. Najdete zde Zprávy, sekci o
        opravách varhan a krátké představení tohoto archivu.
      </p>
      <ul>
        <li><Link href="/zpravy">Zprávy</Link></li>
        <li><Link href="/varhany">Opravy varhan</Link></li>
        <li><Link href="/o-webu">O webu</Link></li>
      </ul>
      <h2>Přehled ročníků</h2>
      <p>Rychlé odkazy na roky ze Zpráv:</p>
      <p>
        {years.map(y => (
          <Link key={y} href={`/zpravy#rok-${y}`} style={{ marginRight: 8 }}>
            {y}
          </Link>
        ))}
      </p>
    </section>
  );
}
