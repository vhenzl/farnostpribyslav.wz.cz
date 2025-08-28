import PageTitle from '@/components/page-title';
import Prose from '@/components/prose';
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
      <PageTitle className="mb-8 mt-4">O webu</PageTitle>
      <Prose>
        <p>
          Tyto stránky byly
          {' '}
          <strong>
            původním oficiálním webem
            {' '}
            <em>Římskokatolické farnosti Přibyslav</em>
            {' '}
            v letech 2001 až 2008
          </strong>
          .
        </p>
        <p>
          První verzi vytvořil
          {' '}
          <em>Libor Jaroš</em>
          {' '}
          počátkem roku 2001 jako soubor statických HTML stránek.
          Koncem roku 2002 převzal technickou část
          {' '}
          <em>Vašek Henzl</em>
          {' '}
          a předělal web na dynamický,
          což umožnilo snadněji aktualizovat obsah. O dva roky později Vašek celý web přepracoval
          a v únoru 2005 spustil novou verzi s vylepšeným redakčním systémem, která sloužila až do roku 2008.
        </p>
        <p>
          Po celou dobu byli Libor a Vašek hlavními správci a tvůrci obsahu.
          Příležitostně se ale podíleli i další farníci, jmenovitě Stanislav Močuba a Tomáš Lehrl.
        </p>
        <p>
          Koncem roku 2007 pastorační rada
          {' '}
          <a href="/zpravy/2007-26">rozhodla</a>
          {' '}
          o vytvoření nových oficiálních stránek farnosti
          a v létě 2008 spustil Tomáš Miškovský z
          {' '}
          <i>Fenomen multimedia</i>
          {' '}
          nový web na
          {' '}
          <a href="https://www.farnostpribyslav.cz">www.farnostpribyslav.cz</a>
          .
          Tím se uzavřela aktivní kapitola farních stránek na
          {' '}
          <a href="http://farnostpribyslav.wz.cz">farnostpribyslav.wz.cz</a>
          .
          Starý web ale běžel dál a sloužil jako archiv zpráv.
        </p>
        <p>
          Osud redakčního systému z roku 2005 se završil o dvacet let později.
          V dubnu 2025
          {' '}
          <i>Web zdarma</i>
          {' '}
          <a href="https://www.webzdarma.cz/novinky/detail/migrace-dokoncena-209">ukončil</a>
          {' '}
          podporu zastaralé verze PHP, na jejíž vlastnosti systém spoléhal,
          a celý web se svým historickým obsahem se stal nedostupným.
        </p>
        <p>
          V srpnu 2025 se Vašek rozhodl web zachránit a vytvořil tento
          {' '}
          <strong>archiv s vybraným obsahem starého webu</strong>
          .
        </p>
      </Prose>
    </article>
  );
}
