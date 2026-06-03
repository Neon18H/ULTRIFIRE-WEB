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

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 py-4 sm:px-6 lg:px-8">
      <nav
        className={cn(
          'mx-auto flex min-h-16 max-w-7xl items-center justify-between rounded-2xl border px-4 py-3 transition-all duration-300 sm:px-5 lg:px-7',
          isScrolled || isOpen ? 'border-line/90 bg-night/92 shadow-soft backdrop-blur-xl' : 'border-white/[0.03] bg-night/[0.08] backdrop-blur-md'
        )}
        aria-label="Navegación principal"
      >
        <a href="#inicio" onClick={closeMenu} className="focus-ring rounded-lg" aria-label="Ir al inicio">
          <Logo imageSize={28} textClassName="text-xs tracking-[0.18em] sm:text-sm sm:tracking-[0.22em]" />
        </a>

        <div className="hidden items-center gap-8 lg:flex xl:gap-9">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="focus-ring inline-flex min-h-11 items-center rounded-md px-1 text-sm font-medium text-mutedfire transition hover:text-textfire">
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="#contacto"
            onClick={closeMenu}
            className="focus-ring inline-flex min-h-11 items-center justify-center rounded-xl border border-line px-3 py-2 text-xs font-semibold text-textfire transition hover:border-bluefire hover:bg-bluefire/10 hover:text-white sm:px-5 sm:text-sm"
          >
            Solicitar demo
          </a>

          <button
            type="button"
            aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsOpen((value) => !value)}
            className="focus-ring inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl border border-line text-textfire transition hover:border-bluefire hover:bg-bluefire/10 lg:hidden"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {isOpen ? (
        <div id="mobile-menu" className="mx-auto mt-3 max-w-7xl overflow-hidden rounded-2xl border border-line bg-night/96 p-3 shadow-soft backdrop-blur-xl lg:hidden">
          <div className="grid gap-1">
            {links.map((link) => (
              <a key={link.href} href={link.href} onClick={closeMenu} className="focus-ring flex min-h-12 items-center rounded-xl px-4 py-3 text-sm font-medium text-mutedfire transition hover:bg-white/[0.04] hover:text-textfire">
                {link.label}
              </a>
            ))}
            <a href="#contacto" onClick={closeMenu} className="focus-ring mt-2 flex min-h-12 items-center justify-center rounded-xl border border-bluefire/55 bg-bluefire/10 px-4 py-3 text-center text-sm font-semibold text-textfire">
              Solicitar demo
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
