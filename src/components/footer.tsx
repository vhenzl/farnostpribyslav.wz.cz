'use client';

export default function Footer() {
  return (
    <footer className="bg-amber-50/50 text-amber-800/70 text-xs md:text-sm border-t border-amber-200">
      <div className="mx-auto max-w-4xl px-4 py-4 text-center min-h-16 flex items-center justify-center">
        <div>
          <span>© </span>
          <span>{new Date().getFullYear()}</span>
          {' '}
          <a href="https://www.farnostpribyslav.cz">Římskokatolická farnost Přibyslav</a>
          <span> & </span>
          <a href="https://github.com/vhenzl">Vašek Henzl</a>
        </div>
      </div>
    </footer>
  );
}
