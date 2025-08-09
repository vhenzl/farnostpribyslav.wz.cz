import Link from 'next/link';
import type { JSX } from 'react';
import { getAllZpravy } from '../../lib/content';

export const metadata = { title: 'Zprávy' };

export default async function ZpravyPage(): Promise<JSX.Element> {
  const zpravy = await getAllZpravy();
  const grouped = new Map<number, typeof zpravy>();
  for (const z of zpravy) {
    const arr = grouped.get(z.rok) ?? [];
    arr.push(z);
    grouped.set(z.rok, arr);
  }
  const years = Array.from(grouped.keys()).sort((a, b) => b - a);
  return (
    <section className="prose">
      <h1>Zprávy</h1>
      {years.map(rok => (
        <section key={rok} className="year-section">
          <h2 id={`rok-${rok}`} className="year-heading">{rok}</h2>
          <ul className="zpravy-list">
            {grouped.get(rok)!.map(z => (
              <li key={`${z.rok}-${z.idr}`} className="zpravy-item">
                <Link href={`/zpravy/${z.rok}-${z.idr}`}>{z.nazev}</Link>
                <span> </span>
                <small>
                  <span>— </span>
                  <span>{z.autor}</span>
                </small>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </section>
  );
}
