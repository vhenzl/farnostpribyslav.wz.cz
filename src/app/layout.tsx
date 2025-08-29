import { UmamiAnalytics } from '@/components/analytics';
import Footer from '@/components/footer';
import Header from '@/components/header';
import { getSiteUrl, toAbsoluteUrl } from '@/lib/site';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
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

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="cs" style={{ fontSize: 18 }}>
      <UmamiAnalytics />
      <body className="grid grid-rows-[auto_1fr_auto] min-h-dvh bg-white">
        <Header />
        <main className=" bg-linear-to-b from-white via-white via-85% to-amber-100/40">
          <div className="mx-auto max-w-4xl p-4">
            {children}
          </div>
        </main>
        <Footer></Footer>
      </body>
    </html>
  );
}
