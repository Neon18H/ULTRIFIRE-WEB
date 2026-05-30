'use client';

import { ArrowRight, Mail, Phone } from 'lucide-react';
import { Reveal } from './motion-wrapper';

export function Contact() {
  return (
    <section id="contacto" className="relative overflow-hidden px-4 py-24 sm:px-6">
      <div className="absolute inset-x-0 top-1/2 h-72 -translate-y-1/2 bg-gradient-to-r from-bluefire/20 via-cyanfire/15 to-orangefire/16 blur-[110px]" aria-hidden="true" />
      <Reveal className="relative mx-auto grid max-w-7xl gap-8 overflow-hidden rounded-[2.25rem] border border-cyanfire/25 bg-gradient-to-br from-panel via-[#07142A] to-night p-6 shadow-glow-strong sm:p-10 lg:grid-cols-[0.9fr_1.1fr] lg:p-12">
        <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-cyanfire/20 blur-[100px]" aria-hidden="true" />
        <div className="relative">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.35em] text-cyanfire">Demo gratuita</p>
          <h2 className="font-display text-4xl font-bold tracking-[-0.05em] text-white sm:text-5xl">Protege tu empresa hoy. Solicita una demo gratuita.</h2>
          <p className="mt-5 max-w-xl text-lg leading-8 text-textfire/72">
            Agenda una sesión con UltriFire y descubre qué arquitectura se adapta mejor a tu sede, nube o aplicación crítica.
          </p>
          <div className="mt-8 grid gap-3 text-sm text-textfire/70">
            <a href="mailto:contacto@ultrifire.co" className="inline-flex items-center gap-3 transition hover:text-cyanfire">
              <Mail className="h-4 w-4" aria-hidden="true" /> contacto@ultrifire.co
            </a>
            <a href="tel:+573001234567" className="inline-flex items-center gap-3 transition hover:text-cyanfire">
              <Phone className="h-4 w-4" aria-hidden="true" /> +57 300 123 4567
            </a>
          </div>
        </div>
        <form
          className="relative grid gap-4 rounded-[1.75rem] border border-white/10 bg-night/70 p-5 backdrop-blur-xl"
          action="mailto:contacto@ultrifire.co"
          method="post"
          encType="text/plain"
        >
          {[
            { name: 'nombre', label: 'Nombre', type: 'text', placeholder: 'Tu nombre' },
            { name: 'empresa', label: 'Empresa', type: 'text', placeholder: 'Nombre de la empresa' },
            { name: 'email', label: 'Email corporativo', type: 'email', placeholder: 'nombre@empresa.com' },
            { name: 'telefono', label: 'Teléfono', type: 'tel', placeholder: '+57' }
          ].map((field) => (
            <label key={field.name} className="grid gap-2 text-sm font-semibold text-textfire/78">
              {field.label}
              <input
                required
                name={field.name}
                type={field.type}
                placeholder={field.placeholder}
                className="focus-ring rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3 text-white placeholder:text-mutedfire/80 transition hover:border-cyanfire/30"
              />
            </label>
          ))}
          <button type="submit" className="focus-ring group mt-2 inline-flex items-center justify-center rounded-2xl fire-button px-6 py-4 text-sm font-bold text-white transition hover:-translate-y-1">
            Solicitar Demo
            <ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
          </button>
          <p className="text-xs leading-5 text-textfire/45">Formulario listo para conectar a un endpoint propio, CRM o automatización de ventas.</p>
        </form>
      </Reveal>
    </section>
  );
}
