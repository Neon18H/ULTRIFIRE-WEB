'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

const HERO_3D_IMAGE = '/images/hero-3d.png';
const heroCapabilities = ['Detección inteligente', 'Monitoreo 24/7', 'Gestión centralizada', 'Hecho en Colombia'];

function ShieldFallback() {
  return (
    <svg viewBox="0 0 720 720" role="img" aria-label="Render conceptual de escudos y firewall UltriFire" className="h-full w-full drop-shadow-[0_28px_90px_rgba(0,180,255,0.18)]">
      <defs>
        <radialGradient id="heroGlow" cx="50%" cy="45%" r="60%">
          <stop offset="0%" stopColor="#00B4FF" stopOpacity="0.32" />
          <stop offset="58%" stopColor="#1A6FFF" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#060810" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="shieldBlue" x1="180" y1="120" x2="540" y2="620" gradientUnits="userSpaceOnUse">
          <stop stopColor="#5B9BFF" stopOpacity="0.95" />
          <stop offset="0.52" stopColor="#1A6FFF" stopOpacity="0.54" />
          <stop offset="1" stopColor="#081120" stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id="edge" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#F0F4FA" stopOpacity="0.72" />
          <stop offset="0.45" stopColor="#00B4FF" stopOpacity="0.44" />
          <stop offset="1" stopColor="#1A6FFF" stopOpacity="0.12" />
        </linearGradient>
        <filter id="softBlur" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="18" />
        </filter>
      </defs>

      <circle cx="360" cy="360" r="310" fill="url(#heroGlow)" />
      <g opacity="0.34" stroke="#5B9BFF" strokeWidth="1.2" fill="none">
        <path d="M98 266h132l54 54h78" />
        <path d="M95 438h126l66-66h96" />
        <path d="M492 252h74l58-58" />
        <path d="M484 480h88l64 64" />
        <circle cx="98" cy="266" r="5" fill="#00B4FF" />
        <circle cx="95" cy="438" r="5" fill="#00B4FF" />
        <circle cx="624" cy="194" r="5" fill="#00B4FF" />
        <circle cx="636" cy="544" r="5" fill="#00B4FF" />
      </g>

      <g transform="translate(58 36) rotate(-8 220 300)" opacity="0.56">
        <path d="M220 118 368 170v132c0 118-72 205-148 238-76-33-148-120-148-238V170l148-52Z" fill="#081120" stroke="url(#edge)" strokeWidth="2" />
        <path d="M220 160 326 197v100c0 82-46 148-106 179-60-31-106-97-106-179V197l106-37Z" fill="#0A0E16" stroke="#1A6FFF" strokeOpacity="0.38" />
      </g>

      <g transform="translate(176 80)">
        <path d="M184 68 380 137v174c0 156-95 271-196 315C83 582-12 467-12 311V137L184 68Z" fill="url(#shieldBlue)" stroke="url(#edge)" strokeWidth="3" />
        <path d="M184 112 338 166v141c0 121-70 211-154 251C100 518 30 428 30 307V166l154-54Z" fill="#07101d" fillOpacity="0.82" stroke="#5B9BFF" strokeOpacity="0.24" />
        <path d="M184 235c-38 0-69 31-69 69v18h35v-18c0-19 15-34 34-34s34 15 34 34v18h35v-18c0-38-31-69-69-69Z" fill="#00B4FF" fillOpacity="0.16" stroke="#8FC5FF" strokeOpacity="0.78" strokeWidth="2" />
        <rect x="96" y="321" width="176" height="126" rx="26" fill="#0A0E16" stroke="#00B4FF" strokeOpacity="0.55" strokeWidth="2" />
        <circle cx="184" cy="374" r="17" fill="#5B9BFF" />
        <path d="M184 390v28" stroke="#5B9BFF" strokeWidth="10" strokeLinecap="round" />
      </g>

      <g opacity="0.62" filter="url(#softBlur)">
        <path d="M472 150 584 190v105c0 84-48 150-112 181-64-31-112-97-112-181V190l112-40Z" fill="#00B4FF" fillOpacity="0.12" />
        <path d="M178 182 278 218v96c0 74-43 133-100 161-57-28-100-87-100-161v-96l100-36Z" fill="#1A6FFF" fillOpacity="0.16" />
      </g>
    </svg>
  );
}

export function Hero() {
  const [imageFailed, setImageFailed] = useState(false);
  const { scrollY } = useScroll();
  const visualY = useTransform(scrollY, [0, 760], [-10, 26]);

  return (
    <section id="inicio" className="relative flex min-h-screen items-center overflow-hidden bg-night px-5 pb-24 pt-36 sm:px-8 lg:pt-40">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_28%,rgba(10,24,56,0.82),transparent_32rem)]" aria-hidden="true" />
      <div className="subtle-grid absolute inset-0 opacity-70" aria-hidden="true" />
      <div className="absolute right-[8%] top-20 h-[34rem] w-[34rem] rounded-full bg-bluefire/10 blur-[150px] animate-breathe" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 right-0 h-44 bg-gradient-to-t from-night to-transparent" aria-hidden="true" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-16 lg:grid-cols-[0.96fr_1.04fr]">
        <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.78, ease: [0.22, 1, 0.36, 1] }} className="max-w-3xl">
          <p className="mb-7 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#5B9BFF]">Protección de nueva generación</p>
          <h1 className="text-[3.25rem] font-extralight leading-[1.05] tracking-[-0.02em] text-textfire sm:text-6xl lg:text-7xl">
            Defensa <span className="font-semibold">inteligente</span> para amenazas <span className="bg-gradient-to-r from-[#FF8A3D] to-orangefire bg-clip-text font-semibold text-transparent">modernas</span>.
          </h1>
          <p className="mt-8 max-w-[450px] text-base font-light leading-[1.6] text-mutedfire sm:text-lg">
            Firewalls físicos, virtuales y gateway cloud gestionado para ocultar tu infraestructura, centralizar políticas y operar seguridad enterprise con soporte local.
          </p>
          <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center">
            <a href="#contacto" className="focus-ring inline-flex items-center justify-center rounded-full bg-[linear-gradient(135deg,#1A6FFF_0%,#1A6FFF_62%,#FF5A1F_140%)] px-7 py-4 text-sm font-semibold text-white shadow-[0_18px_60px_rgba(26,111,255,0.25)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_70px_rgba(26,111,255,0.34)]">
              Solicitar demo
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </a>
            <a href="#como-funciona" className="focus-ring group inline-flex items-center rounded-full px-1 py-3 text-sm font-medium text-textfire/90 transition hover:text-bluefire">
              Ver cómo funciona <span className="ml-2 transition group-hover:translate-x-1">→</span>
            </a>
          </div>
        </motion.div>

        <motion.div style={{ y: visualY }} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.12 }} className="relative mx-auto w-full max-w-[650px]">
          <div className="absolute inset-8 rounded-full bg-cyanfire/10 blur-[90px]" aria-hidden="true" />
          <motion.div animate={{ y: [-7, 7, -7] }} transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }} className="relative aspect-square">
            {!imageFailed ? (
              <Image src={HERO_3D_IMAGE} alt="Escudos 3D de ciberseguridad UltriFire" fill priority sizes="(max-width: 1024px) 92vw, 48vw" className="object-contain" onError={() => setImageFailed(true)} />
            ) : (
              <ShieldFallback />
            )}
          </motion.div>
          <div className="relative -mt-8 grid gap-3 border border-line/80 bg-deep/55 p-4 shadow-soft backdrop-blur-xl sm:grid-cols-2">
            {heroCapabilities.map((capability) => (
              <div key={capability} className="flex items-center gap-3 text-xs font-medium text-mutedfire">
                <span className="h-1.5 w-1.5 rounded-full bg-cyanfire shadow-[0_0_18px_rgba(0,180,255,0.8)]" aria-hidden="true" />
                {capability}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
