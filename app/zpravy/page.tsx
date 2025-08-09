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
    <section>
      <h1>Zprávy</h1>
      {years.map(rok => (
        <section key={rok}>
          <h2 id={`rok-${rok}`}>{rok}</h2>
          <ul>
            {grouped.get(rok)!.map(z => (
              <li key={`${z.rok}-${z.idr}`}>
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
