'use client';

import { Cloud, Eye, PlugZap, Server, ShieldCheck, Waypoints } from 'lucide-react';
import { motion } from 'framer-motion';
import { Reveal } from './motion-wrapper';
import { SectionHeading } from './section-heading';

const paths = [
  { icon: Server, title: 'Opción A', text: 'Appliance físico en tu oficina.' },
  { icon: Cloud, title: 'Opción B', text: 'Firewall virtual en tu propia nube.' },
  { icon: ShieldCheck, title: 'Opción C', text: 'Gateway gestionado por UltriFire con cero exposición.' }
];

const steps = [
  { icon: PlugZap, title: 'Se conecta', text: 'El firewall se registra automáticamente a la plataforma UltriFire.' },
  { icon: Eye, title: 'Lo administras', text: 'Reglas, VPN, usuarios, alertas y reportes desde un solo panel.' },
  { icon: Waypoints, title: 'Protección 24/7', text: 'Tráfico inspeccionado, monitoreo continuo y respuesta operativa local.' }
];

export function HowItWorks() {
  return (
    <section id="como-funciona" className="relative overflow-hidden px-4 py-24 sm:px-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(0,180,255,0.10),transparent_28rem),radial-gradient(circle_at_85%_65%,rgba(255,107,0,0.08),transparent_25rem)]" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Cómo funciona"
          title="Eliges cómo proteger tu empresa"
          description="Appliance físico, firewall virtual o gateway gestionado: cualquier camino termina en una operación centralizada, visible y monitoreada 24/7."
        />

        <Reveal className="relative overflow-hidden rounded-[2.25rem] border border-white/10 bg-panel/60 p-6 backdrop-blur-2xl sm:p-8 lg:p-10">
          <svg className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block" viewBox="0 0 1200 520" preserveAspectRatio="none" aria-hidden="true">
            <motion.path
              d="M105 135 C260 135 260 260 420 260 H780 C920 260 920 386 1088 386"
              fill="none"
              stroke="url(#flowLine)"
              strokeWidth="3"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, margin: '-120px' }}
              transition={{ duration: 1.7, ease: 'easeInOut' }}
            />
            <defs>
              <linearGradient id="flowLine" x1="70" x2="1130" y1="120" y2="390" gradientUnits="userSpaceOnUse">
                <stop stopColor="#1A6FFF" />
                <stop offset="0.72" stopColor="#00B4FF" />
                <stop offset="1" stopColor="#FF6B00" />
              </linearGradient>
            </defs>
          </svg>

          <div className="relative grid gap-5 lg:grid-cols-[0.9fr_0.28fr_1fr] lg:items-center">
            <div className="grid gap-4">
              {paths.map((path, index) => (
                <Reveal key={path.title} delay={index * 0.08} className="rounded-[1.5rem] border border-cyanfire/15 bg-night/58 p-5 transition hover:-translate-y-1 hover:border-cyanfire/40 hover:shadow-glow">
                  <div className="flex items-start gap-4">
                    <div className="rounded-2xl border border-cyanfire/25 bg-cyanfire/10 p-3 text-cyanfire">
                      <path.icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-sm font-bold uppercase tracking-[0.22em] text-cyanfire">{path.title}</p>
                      <p className="mt-2 text-textfire/72">{path.text}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <div className="mx-auto hidden h-28 w-28 items-center justify-center rounded-full border border-orangefire/35 bg-orangefire/10 text-orangefire shadow-fire lg:flex">
              <Waypoints className="h-10 w-10" aria-hidden="true" />
            </div>

            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {steps.map((step, index) => (
                <Reveal key={step.title} delay={0.25 + index * 0.08} className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5 transition hover:-translate-y-1 hover:border-cyanfire/35 hover:shadow-glow">
                  <step.icon className="mb-4 h-6 w-6 text-cyanfire" aria-hidden="true" />
                  <span className="text-sm font-bold text-cyanfire">0{index + 1}</span>
                  <h3 className="mt-2 font-display text-xl font-bold text-white">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-textfire/65">{step.text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
