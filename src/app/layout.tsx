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
    <html lang="cs" style={{ fontSize: 18 }}>
      <body className="grid grid-rows-[auto_1fr_auto] min-h-dvh bg-white">
        <header className="border-b-4 border-amber-400 text-white bg-linear-to-b from-amber-600 to-amber-800">
          <div className="mx-auto max-w-4xl px-4 flex align-baseline gap-4 py-4">
            <div className="font-bold">
              Farnost Přibyslav – archiv 2001–2008
            </div>
            <nav className="flex gap-4 ml-auto font-semibold text-white/90">
              <Link className="hover:underline hover:text-white" href="/">Domů</Link>
              <Link className="hover:underline hover:text-white" href="/zpravy">Zprávy</Link>
              <Link className="hover:underline hover:text-white" href="/varhany">Opravy varhan</Link>
              <Link className="hover:underline hover:text-white" href="/o-webu">O webu</Link>
            </nav>
          </div>
        </header>
        <main className=" bg-linear-to-b from-white via-white via-85% to-amber-100/40">
          <div className="mx-auto max-w-4xl p-4">
            {children}
          </div>
        </main>
        <footer className="bg-amber-50/50 text-amber-800/70 py-8 border-t border-amber-200">
          <div className="mx-auto max-w-4xl px-4 text-center">
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
