'use client';

import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Logo } from './logo';
import { cn } from '@/lib/utils';

const links = [
  { href: '#servicios', label: 'Servicios' },
  { href: '#como-funciona', label: 'Cómo funciona' },
  { href: '#comparativa', label: 'Comparativa' },
  { href: '#contacto', label: 'Contacto' }
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-5 py-5 sm:px-8">
      <nav
        className={cn(
          'mx-auto flex max-w-7xl items-center justify-between border px-5 py-3 transition-all duration-300 lg:px-7',
          isScrolled ? 'border-line/90 bg-night/88 shadow-soft backdrop-blur-xl' : 'border-white/[0.03] bg-night/[0.02] backdrop-blur-[2px]'
        )}
      >
        <a href="#inicio" className="focus-ring rounded-lg" aria-label="Ir al inicio">
          <Logo imageSize={32} />
        </a>

        <div className="hidden items-center gap-9 lg:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="focus-ring rounded-md text-sm font-medium text-mutedfire transition hover:text-textfire">
              {link.label}
            </a>
          ))}
        </div>

        <a href="#contacto" className="focus-ring hidden rounded-lg border border-line px-5 py-2.5 text-sm font-semibold text-textfire transition hover:border-bluefire hover:bg-bluefire/10 hover:text-white lg:inline-flex">
          Solicitar demo
        </a>

        <button type="button" aria-label="Abrir menú" onClick={() => setIsOpen((value) => !value)} className="focus-ring rounded-lg border border-line p-2 text-textfire lg:hidden">
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {isOpen ? (
        <div className="mx-auto mt-3 max-w-7xl border border-line bg-night/96 p-3 shadow-soft backdrop-blur-xl lg:hidden">
          <div className="grid gap-1">
            {links.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setIsOpen(false)} className="rounded-lg px-4 py-3 text-sm font-medium text-mutedfire transition hover:bg-white/[0.04] hover:text-textfire">
                {link.label}
              </a>
            ))}
            <a href="#contacto" onClick={() => setIsOpen(false)} className="mt-2 rounded-lg border border-line px-4 py-3 text-center text-sm font-semibold text-textfire">
              Solicitar demo
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
