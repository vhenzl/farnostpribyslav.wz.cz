'use client';

import { cn } from '@/lib/cn';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

function useActiveLink() {
  const pathname = usePathname();
  return (href: string, exact = false) => {
    const isActive = exact ? pathname === href : pathname.startsWith(href);
    return isActive;
  };
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const isActive = useActiveLink();

  const links = [
    { href: '/', label: 'Domů', exact: true },
    { href: '/zpravy', label: 'Zprávy', exact: false },
    { href: '/varhany', label: 'Opravy varhan', exact: false },
    { href: '/o-webu', label: 'O webu', exact: false },
  ];

  return (
    <header className="border-b-4 border-amber-400 text-white bg-linear-to-b from-amber-600 to-amber-800">
      <div className="mx-auto max-w-4xl px-4 flex items-center gap-4 py-2 md:py-4 min-h-16">
        <div className="text-balance">
          <Link href="/" className="">
            <span className="font-bold text-xl">Farnost Přibyslav</span>
            {' '}
            <span className="text-base font-normal">archiv 2001–2008</span>
          </Link>
        </div>

        <nav className="hidden md:flex gap-4 ml-auto font-semibold text-white/90">
          {links.map(x => (
            <Link
              key={x.href}
              className={cn('hover:underline hover:text-white', { 'text-white': isActive(x.href, x.exact) })}
              href={x.href}
            >
              {x.label}
            </Link>
          ))}
        </nav>

        <button
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen(x => !x)}
          className="ml-auto md:hidden h-10 w-10 flex items-center justify-center p-0 rounded-md text-white/90 hover:text-white focus:outline-none focus:ring-2 focus:ring-amber-300"
        >
          {open && (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          )}
          {!open && (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      <div className={cn('md:hidden border-t border-amber-700', open ? 'block' : 'hidden')}>
        <nav className="mx-auto max-w-4xl py-2 flex flex-col gap-2 font-semibold text-white/90">
          {links.map(x => (
            <Link
              key={x.href}
              href={x.href}
              onClick={() => setOpen(false)}
              className={cn('block px-4  py-2 hover:underline hover:text-white', { 'text-white': isActive(x.href, x.exact) })}
            >
              {x.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
