import Link from 'next/link';
import type { JSX } from 'react';
import { listVarhany, type VarhanyItem } from '../../lib/varhany';

export const metadata = { title: 'Opravy varhan' };

export default async function VarhanyListPage(): Promise<JSX.Element> {
  const items: VarhanyItem[] = await listVarhany();
  return (
    <section>
      <h1>Opravy varhan</h1>
      <ul>
        {items.map(i => (
          <li key={i.slug}>
            <Link href={`/varhany/${i.slug}`}>{i.title}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
