import { toAbsoluteUrl } from '@/lib/site';
import type { Metadata } from 'next';
import type { JSX } from 'react';

export const metadata: Metadata = {
  title: 'O webu',
  description: 'Informace o archivu webových stránek farnosti Přibyslav.',
  alternates: { canonical: toAbsoluteUrl('/o-webu') },
  openGraph: {
    type: 'website',
    url: toAbsoluteUrl('/o-webu'),
    title: 'O webu',
    description: 'Informace o archivu webových stránek farnosti Přibyslav.',
  },
};

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
