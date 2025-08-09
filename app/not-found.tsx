import Link from 'next/link';
import type { JSX } from 'react';

export default function NotFound(): JSX.Element {
  return (
    <section>
      <h1>Stránka nenalezena</h1>
      <p>
        <span>Stránku se nepodařilo najít. Zkuste pokračovat na </span>
        <Link href="/">homepage</Link>
        <span> nebo na </span>
        <Link href="/zpravy">Zprávy</Link>
        <span>.</span>
      </p>
    </section>
  );
}
