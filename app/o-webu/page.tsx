export const metadata = { title: 'O webu' };

import type { JSX } from 'react';

export default function AboutPage(): JSX.Element {
  return (
    <article>
      <h1>O webu</h1>
      <p>
        <span>Archivní projekt zachovává vybrané části původního webu farnosti Přibyslav.</span>
        <br />
        <span>Cílem je čitelnost, dostupnost a stálost odkazů bez potřeby serverového runtime.</span>
      </p>
    </article>
  );
}
