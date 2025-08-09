import type { JSX } from 'react';

export default function NotFound(): JSX.Element {
  return (
    <section className="prose">
      <h1>Stránka nenalezena</h1>
      <p>
        <span>Stránku se nepodařilo najít. Zkuste pokračovat na </span>
        <a href="/">homepage</a>
        <span> nebo na </span>
        <a href="/zpravy">Zprávy</a>
        <span>.</span>
      </p>
    </section>
  );
}
