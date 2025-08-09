import Link from 'next/link';
import type { JSX, ReactNode } from 'react';
import './global.css';

export const metadata = {
  title: 'Farnost Přibyslav – Webarchiv',
  description: 'Statický archiv starého webu farnosti Přibyslav (2002–2008).',
};

export default function RootLayout({ children }: { children: ReactNode }): JSX.Element {
  return (
    <html lang="cs">
      <body>
        <header style={{ padding: '1rem' }}>
          <nav style={{ display: 'flex', gap: '1rem' }}>
            <Link href="/">Domů</Link>
            <Link href="/zpravy">Zprávy</Link>
            <Link href="/varhany">Opravy varhan</Link>
            <Link href="/o-webu">O webu</Link>
          </nav>
        </header>
        <main style={{ padding: '1rem', maxWidth: 900, margin: '0 auto' }}>{children}</main>
        <footer style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>
          <span>© </span>
          <span>{new Date().getFullYear()}</span>
          <span> </span>
          <span>Webarchiv farnosti Přibyslav</span>
        </footer>
      </body>
    </html>
  );
}
