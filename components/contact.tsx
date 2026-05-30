'use client';

import { ArrowRight, Mail, Phone } from 'lucide-react';
import { Reveal } from './motion-wrapper';

export function Contact() {
  return (
    <section id="contacto" className="relative overflow-hidden px-5 py-32 sm:px-8 lg:py-40">
      <div className="absolute inset-x-0 top-1/2 h-80 -translate-y-1/2 bg-[radial-gradient(circle_at_50%_50%,rgba(255,90,31,0.075),transparent_34rem)]" aria-hidden="true" />
      <Reveal className="relative mx-auto max-w-7xl border border-line bg-deep/70 px-6 py-16 text-center shadow-soft sm:px-10 lg:px-16 lg:py-24">
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.34em] text-orangefire">Demo ejecutiva</p>
        <h2 className="mx-auto max-w-4xl text-4xl font-semibold leading-[1.02] tracking-[-0.055em] text-textfire sm:text-5xl lg:text-7xl">Protege tu empresa hoy.</h2>
        <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-mutedfire">
          Agenda una sesión para evaluar tu perímetro y definir si necesitas appliance físico, firewall virtual o gateway cloud gestionado.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-5 sm:flex-row">
          <a href="mailto:contacto@ultrifire.co?subject=Solicitud%20de%20demo%20UltriFire" className="focus-ring inline-flex items-center justify-center rounded-full bg-bluefire px-7 py-4 text-sm font-semibold text-white transition hover:bg-[#2C7BFF]">
            Solicitar demo
            <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </a>
          <div className="flex flex-col gap-2 text-sm text-mutedfire sm:text-left">
            <a href="mailto:contacto@ultrifire.co" className="inline-flex items-center gap-2 transition hover:text-bluefire"><Mail className="h-4 w-4" aria-hidden="true" /> contacto@ultrifire.co</a>
            <a href="tel:+573001234567" className="inline-flex items-center gap-2 transition hover:text-bluefire"><Phone className="h-4 w-4" aria-hidden="true" /> +57 300 123 4567</a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
