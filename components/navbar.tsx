'use client';

import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { Logo } from './logo';
import { cn } from '@/lib/utils';

const links = [
  { href: '#servicios', label: 'Servicios' },
  { href: '#por-que', label: 'Por qué UltriFire' },
  { href: '#productos', label: 'Productos' },
  { href: '#contacto', label: 'Contacto' }
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <motion.nav
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          'mx-auto flex max-w-7xl items-center justify-between rounded-2xl border px-4 py-3 transition-all duration-300',
          isScrolled
            ? 'border-white/10 bg-night/78 shadow-2xl shadow-cyanfire/10 backdrop-blur-2xl'
            : 'border-white/5 bg-white/[0.03] backdrop-blur-md'
        )}
      >
        <a href="#inicio" className="focus-ring rounded-xl">
          <Logo />
        </a>

        <div className="hidden items-center gap-8 lg:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="focus-ring rounded-lg text-sm font-medium text-textfire/75 transition hover:text-white">
              {link.label}
            </a>
          ))}
        </div>

        <a
          href="#contacto"
          className="focus-ring hidden rounded-full bg-gradient-to-r from-bluefire to-cyanfire px-5 py-2.5 text-sm font-bold text-white shadow-glow transition hover:-translate-y-0.5 hover:shadow-glow-strong lg:inline-flex"
        >
          Solicitar Demo
        </a>

        <button
          type="button"
          aria-label="Abrir menú"
          onClick={() => setIsOpen((value) => !value)}
          className="focus-ring rounded-xl border border-white/10 p-2 text-white lg:hidden"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </motion.nav>

      {isOpen ? (
        <div className="mx-auto mt-3 max-w-7xl rounded-2xl border border-white/10 bg-night/95 p-4 shadow-2xl backdrop-blur-2xl lg:hidden">
          <div className="grid gap-2">
            {links.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setIsOpen(false)} className="rounded-xl px-4 py-3 text-sm font-medium text-textfire/80 transition hover:bg-white/5 hover:text-white">
                {link.label}
              </a>
            ))}
            <a href="#contacto" onClick={() => setIsOpen(false)} className="mt-2 rounded-xl bg-gradient-to-r from-bluefire to-cyanfire px-4 py-3 text-center text-sm font-bold text-white">
              Solicitar Demo
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
