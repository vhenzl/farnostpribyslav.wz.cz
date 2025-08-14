import { getSiteUrl, toAbsoluteUrl } from '@/lib/site';
import type { Metadata } from 'next';
import Link from 'next/link';
import type { JSX, ReactNode } from 'react';
import './global.css';

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: 'Archiv farnosti Přibyslav',
    template: '%s | Archiv farnosti Přibyslav',
  },
  description: 'Archiv webových stránek farnosti Přibyslav z let 2001 až 2008.',
  openGraph: {
    siteName: 'Archiv farnosti Přibyslav',
    type: 'website',
    locale: 'cs_CZ',
    url: toAbsoluteUrl('/'),
    title: 'Archiv farnosti Přibyslav',
    description: 'Archiv webových stránek farnosti Přibyslav z let 2001 až 2008.',
  },
};

export default function RootLayout({ children }: { children: ReactNode }): JSX.Element {
  return (
    <html lang="cs">
      <body>
        <header>
          <div>
            <div>Farnost Přibyslav – Webarchiv</div>
            <nav>
              <Link href="/">Domů</Link>
              <Link href="/zpravy">Zprávy</Link>
              <Link href="/varhany">Opravy varhan</Link>
              <Link href="/o-webu">O webu</Link>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer>
          <div>
            <span>
              <span>© </span>
              <span>{new Date().getFullYear()}</span>
              <span> Webarchiv farnosti Přibyslav</span>
            </span>
          </div>
        </footer>
      </body>
    </html>
  );
}
