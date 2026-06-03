'use client';

import { ArrowRight, Mail, Phone } from 'lucide-react';
import { Reveal } from './motion-wrapper';

export function Contact() {
  return (
    <section id="contacto" className="relative overflow-hidden px-4 py-16 sm:px-8 sm:py-20 lg:py-36">
      <div className="absolute inset-x-0 top-1/2 h-96 -translate-y-1/2 bg-[radial-gradient(circle_at_50%_50%,rgba(255,90,31,0.075),transparent_34rem)]" aria-hidden="true" />
      <Reveal className="relative mx-auto max-w-7xl overflow-hidden border border-line bg-deep/80 px-4 py-10 shadow-soft backdrop-blur-xl sm:px-8 sm:py-14 lg:px-16 lg:py-24">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_0%,rgba(26,111,255,0.055)_45%,rgba(255,90,31,0.06)_100%)]" aria-hidden="true" />
        <div className="relative grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-14">
          <div className="text-center lg:text-left">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-orangefire sm:mb-5 sm:tracking-[0.28em]">Demo ejecutiva</p>
            <h2 className="mx-auto max-w-4xl text-3xl font-extralight leading-[1.08] tracking-[-0.02em] text-textfire sm:text-5xl lg:mx-0 lg:text-7xl">
              Protege tu empresa <span className="font-semibold">hoy</span>.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base font-light leading-7 text-mutedfire sm:mt-7 sm:text-lg sm:leading-8 lg:mx-0">
              Agenda una sesión para evaluar tu perímetro y definir si necesitas appliance físico, firewall virtual o gateway cloud gestionado.
            </p>
            <div className="mt-8 grid gap-3 text-sm text-mutedfire sm:mt-10">
              <a href="mailto:contacto@ultrifire.co" className="focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-xl transition hover:text-bluefire lg:justify-start"><Mail className="h-4 w-4" aria-hidden="true" /> contacto@ultrifire.co</a>
              <a href="tel:+573001234567" className="focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-xl transition hover:text-bluefire lg:justify-start"><Phone className="h-4 w-4" aria-hidden="true" /> +57 300 123 4567</a>
            </div>
          </div>

          <form className="grid gap-4 rounded-2xl border border-line/80 bg-night/55 p-4 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] sm:p-6" action="mailto:contacto@ultrifire.co" method="post" encType="text/plain">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2 text-sm font-medium text-textfire">
                Nombre
                <input name="nombre" type="text" autoComplete="name" required className="focus-ring min-h-12 w-full rounded-xl border border-line bg-black/30 px-4 py-3 text-base text-textfire outline-none transition placeholder:text-mutedfire/55 hover:border-bluefire/50" placeholder="Tu nombre" />
              </label>
              <label className="grid gap-2 text-sm font-medium text-textfire">
                Empresa
                <input name="empresa" type="text" autoComplete="organization" className="focus-ring min-h-12 w-full rounded-xl border border-line bg-black/30 px-4 py-3 text-base text-textfire outline-none transition placeholder:text-mutedfire/55 hover:border-bluefire/50" placeholder="Nombre de la empresa" />
              </label>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2 text-sm font-medium text-textfire">
                Email
                <input name="email" type="email" autoComplete="email" required className="focus-ring min-h-12 w-full rounded-xl border border-line bg-black/30 px-4 py-3 text-base text-textfire outline-none transition placeholder:text-mutedfire/55 hover:border-bluefire/50" placeholder="correo@empresa.com" />
              </label>
              <label className="grid gap-2 text-sm font-medium text-textfire">
                Teléfono
                <input name="telefono" type="tel" autoComplete="tel" className="focus-ring min-h-12 w-full rounded-xl border border-line bg-black/30 px-4 py-3 text-base text-textfire outline-none transition placeholder:text-mutedfire/55 hover:border-bluefire/50" placeholder="+57 300 000 0000" />
              </label>
            </div>
            <label className="grid gap-2 text-sm font-medium text-textfire">
              ¿Qué necesitas proteger?
              <textarea name="mensaje" required rows={5} className="focus-ring min-h-32 w-full resize-y rounded-xl border border-line bg-black/30 px-4 py-3 text-base leading-7 text-textfire outline-none transition placeholder:text-mutedfire/55 hover:border-bluefire/50" placeholder="Sedes, nube, usuarios remotos, aplicaciones críticas..." />
            </label>
            <button type="submit" className="focus-ring inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-[linear-gradient(135deg,#1A6FFF_0%,#1A6FFF_58%,#FF5A1F_135%)] px-7 py-4 text-sm font-semibold text-white shadow-[0_18px_60px_rgba(26,111,255,0.25)] transition hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:w-auto sm:justify-self-start">
              Solicitar demo
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </button>
          </form>
        </div>
      </Reveal>
    </section>
  );
}
