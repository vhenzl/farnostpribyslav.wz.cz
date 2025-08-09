import Link from 'next/link';
import type { JSX } from 'react';
import { getYearsSummary } from '../lib/content';

export default async function Page(): Promise<JSX.Element> {
  const years: number[] = await getYearsSummary();
  return (
    <section className="prose">
      <h1>Webarchiv farnosti Přibyslav</h1>
      <p>
        Stránky uchovávají vybrané obsahy z let 2002–2008. Najdete zde Zprávy, sekci o
        opravách varhan a krátké představení tohoto archivu.
      </p>
      <ul className="link-list">
        <li><Link href="/zpravy">Zprávy</Link></li>
        <li><Link href="/varhany">Opravy varhan</Link></li>
        <li><Link href="/o-webu">O webu</Link></li>
      </ul>
      <h2>Přehled ročníků</h2>
      <p>Rychlé odkazy na roky ze Zpráv:</p>
      <div className="year-chips">
        {years.map(y => (
          <Link key={y} className="chip" href={`/zpravy#rok-${y}`}>
            {y}
          </Link>
        ))}
      </div>
    </section>
  );
}
