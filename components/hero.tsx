'use client';

import Image from 'next/image';
import { ArrowRight, Cpu, Flag, LockKeyhole, Network, Radar, ShieldCheck } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

const HERO_HARDWARE_IMAGE = '/images/hero-hardware.jpg';

// Ajustar encuadre/zoom de la imagen aquí: mueve el object-position para priorizar las luces azul/roja.
const heroImageFrameClass = 'object-cover object-[center_center] sm:object-[58%_center] lg:object-[center_right]';

// Ajustar encuadre/zoom de la imagen aquí: escala menor = menos zoom visual y más contexto del hardware.
const heroImageZoomClass = 'scale-[0.92] sm:scale-[0.95] lg:scale-[0.97]';

// Ajustar encuadre/zoom de la imagen aquí: opacidad baja para que funcione como textura premium, no como foto protagonista.
const heroImageOpacityClass = 'opacity-55 sm:opacity-60 lg:opacity-64';

// Ajustar aquí la integración con el fondo #02040A: más opacidad = imagen más oscura y sutil.
const heroImageDarknessClass = 'bg-[#02040A]/86 sm:bg-[#02040A]/78 lg:bg-[#02040A]/70';
const heroHorizontalBlendClass = 'bg-gradient-to-r from-[#02040A] via-[#02040A]/82 sm:via-[#02040A]/74 lg:via-[#02040A]/64 to-[#02040A]/20';
const heroVerticalBlendClass = 'bg-gradient-to-b from-[#02040A]/58 via-[#02040A]/34 to-[#02040A]';
const heroMobileBlendClass = 'bg-[#02040A]/16 sm:bg-transparent';

// Coordenadas determinísticas para evitar diferencias de hidratación y mantener el fondo estable.
const nodes = [
  [8, 22], [18, 15], [30, 27], [43, 17], [58, 26], [72, 14], [88, 24],
  [12, 58], [26, 46], [39, 62], [53, 50], [69, 66], [82, 49], [93, 61]
] as const;

const embers = Array.from({ length: 20 }, (_, index) => ({
  id: index,
  left: `${58 + ((index * 13) % 38)}%`,
  top: `${28 + ((index * 19) % 58)}%`,
  delay: `${index * 0.28}s`,
  duration: `${5.6 + (index % 5) * 0.55}s`
}));

function ConstellationField() {
  return (
    <svg className="absolute inset-0 h-full w-full opacity-65" viewBox="0 0 100 80" preserveAspectRatio="none" aria-hidden="true">
      <motion.path
        d="M8 22 L18 15 L30 27 L43 17 L58 26 L72 14 L88 24 M12 58 L26 46 L39 62 L53 50 L69 66 L82 49 L93 61 M30 27 L39 62 M58 26 L53 50 M72 14 L82 49"
        fill="none"
        stroke="url(#heroLine)"
        strokeWidth="0.16"
        strokeDasharray="1 1.4"
        initial={{ pathLength: 0.35, opacity: 0.25 }}
        animate={{ pathLength: [0.35, 1, 0.55], opacity: [0.24, 0.68, 0.34] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />
      {nodes.map(([cx, cy], index) => (
        <motion.circle
          key={`${cx}-${cy}`}
          cx={cx}
          cy={cy}
          r="0.52"
          fill={index % 5 === 0 ? '#FF6B00' : '#00B4FF'}
          animate={{ opacity: [0.35, 1, 0.35], scale: [0.85, 1.35, 0.85] }}
          transition={{ duration: 3.2 + (index % 4), delay: index * 0.16, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
      <defs>
        <linearGradient id="heroLine" x1="0" x2="100" y1="0" y2="80" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1A6FFF" />
          <stop offset="0.78" stopColor="#00B4FF" />
          <stop offset="1" stopColor="#FF6B00" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function Hero() {
  const { scrollY } = useScroll();
  const glowY = useTransform(scrollY, [0, 700], [0, 110]);
  const imageY = useTransform(scrollY, [0, 700], [-18, 34]);
  const opacity = useTransform(scrollY, [0, 620], [1, 0.25]);

  return (
    <section id="inicio" className="relative flex min-h-screen items-center overflow-hidden bg-[#02040A] px-4 pb-20 pt-32 sm:px-6 lg:pt-40">
      <motion.div style={{ y: imageY }} className="absolute inset-x-0 -inset-y-10 z-0 bg-[#02040A]" aria-hidden="true">
        <div className={`absolute inset-0 ${heroImageZoomClass}`}>
          <Image
            src={HERO_HARDWARE_IMAGE}
            alt=""
            fill
            priority
            sizes="100vw"
            className={`scale-x-[-1] ${heroImageFrameClass} ${heroImageOpacityClass}`}
          />
        </div>
      </motion.div>

      <div className={`pointer-events-none absolute inset-0 z-10 ${heroImageDarknessClass}`} aria-hidden="true" />
      <div className={`pointer-events-none absolute inset-0 z-10 ${heroMobileBlendClass}`} aria-hidden="true" />
      <div className={`pointer-events-none absolute inset-0 z-10 ${heroHorizontalBlendClass}`} aria-hidden="true" />
      <div className={`pointer-events-none absolute inset-0 z-10 ${heroVerticalBlendClass}`} aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_72%_32%,rgba(0,180,255,0.13),transparent_30rem),radial-gradient(circle_at_88%_54%,rgba(255,107,0,0.09),transparent_26rem)]" aria-hidden="true" />

      <div className="cyber-grid absolute inset-0 z-20 animate-grid-move opacity-70" aria-hidden="true" />
      <div className="absolute inset-0 z-20" aria-hidden="true">
        <ConstellationField />
      </div>
      <div className="noise pointer-events-none absolute inset-0 z-20 opacity-[0.05]" aria-hidden="true" />
      <motion.div style={{ y: glowY, opacity }} className="absolute left-1/2 top-24 z-20 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-cyanfire/20 blur-[120px] animate-aurora" aria-hidden="true" />
      <div className="absolute right-[-12rem] top-20 z-20 h-[34rem] w-[34rem] rounded-full bg-orangefire/10 blur-[140px]" aria-hidden="true" />
      <div className="absolute bottom-10 left-[-10rem] z-20 h-[28rem] w-[28rem] rounded-full bg-bluefire/20 blur-[120px]" aria-hidden="true" />

      {embers.map((ember) => (
        <span
          key={ember.id}
          className="absolute z-20 h-1.5 w-1.5 rounded-full bg-orangefire shadow-[0_0_18px_rgba(255,107,0,0.92)] animate-ember"
          style={{ left: ember.left, top: ember.top, animationDelay: ember.delay, animationDuration: ember.duration }}
          aria-hidden="true"
        />
      ))}

      <div className="relative z-30 mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.82, ease: [0.22, 1, 0.36, 1] }}>
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-cyanfire/25 bg-cyanfire/10 px-4 py-2 text-sm font-semibold text-cyanfire shadow-glow backdrop-blur-xl">
            <Flag className="h-4 w-4" aria-hidden="true" />
            🇨🇴 Hecho en Colombia
          </div>
          <h1 className="font-display text-5xl font-bold leading-[0.94] tracking-[-0.06em] text-white sm:text-6xl lg:text-7xl xl:text-8xl">
            El primer firewall <span className="text-gradient">Next-Generation</span> fabricado en Colombia
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-textfire/75 sm:text-xl">
            Protección de nivel empresarial para PYME — sin licencias en dólares, con soporte local y gestión centralizada en la nube.
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <a href="#contacto" className="focus-ring fire-button group inline-flex items-center justify-center rounded-full px-7 py-4 text-sm font-bold text-white transition duration-300 hover:-translate-y-1">
              Solicitar Demo
              <ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
            </a>
            <a href="#servicios" className="focus-ring inline-flex items-center justify-center rounded-full border border-cyanfire/35 bg-white/[0.04] px-7 py-4 text-sm font-bold text-white backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-cyanfire/70 hover:bg-cyanfire/10 hover:shadow-glow">
              Conocer más
            </a>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 48 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }} className="glass-card relative rounded-[2rem] p-4 sm:p-6">
          <div className="absolute inset-x-10 -top-px h-px bg-gradient-to-r from-transparent via-cyanfire to-transparent" aria-hidden="true" />
          <div className="absolute -right-6 top-14 h-24 w-24 rounded-full bg-orangefire/20 blur-3xl" aria-hidden="true" />
          <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#050A13] p-5">
            <div className="absolute inset-0 animate-scan bg-gradient-to-b from-transparent via-cyanfire/10 to-transparent" aria-hidden="true" />
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-mutedfire">UltriFire OS</p>
                <h2 className="mt-2 font-display text-2xl font-bold text-white">Command Center</h2>
              </div>
              <div className="rounded-2xl border border-orangefire/30 bg-orangefire/10 p-3 text-orangefire shadow-fire">
                <ShieldCheck className="h-6 w-6" aria-hidden="true" />
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { icon: LockKeyhole, label: 'IPS/IDS activo', value: 'Suricata' },
                { icon: Network, label: 'VPN cifrada', value: 'Túneles seguros' },
                { icon: Radar, label: 'Eventos hoy', value: '18.402' },
                { icon: Cpu, label: 'Latencia gateway', value: '12 ms' }
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-white/10 bg-white/[0.035] p-4 transition hover:border-cyanfire/30 hover:bg-cyanfire/5">
                  <item.icon className="mb-4 h-5 w-5 text-cyanfire" aria-hidden="true" />
                  <p className="text-xs text-mutedfire">{item.label}</p>
                  <p className="mt-1 font-display text-xl font-bold text-white">{item.value}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-2xl border border-cyanfire/15 bg-cyanfire/5 p-4">
              <div className="mb-3 flex items-center justify-between text-xs text-textfire/58">
                <span>Tráfico inspeccionado</span>
                <span className="text-cyanfire">98.7%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <motion.div className="h-full rounded-full bg-gradient-to-r from-bluefire via-cyanfire to-orangefire" initial={{ width: '0%' }} animate={{ width: '98.7%' }} transition={{ duration: 1.8, delay: 0.6, ease: 'easeOut' }} />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
