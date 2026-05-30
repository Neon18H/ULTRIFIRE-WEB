'use client';

import { ArrowRight, Cpu, Flag, LockKeyhole, Network, Radar, ShieldCheck } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Partículas determinísticas para evitar diferencias de hidratación entre servidor y cliente.
const particles = Array.from({ length: 18 }, (_, index) => ({
  id: index,
  left: `${8 + ((index * 17) % 86)}%`,
  top: `${14 + ((index * 29) % 68)}%`,
  delay: index * 0.18
}));

export function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 700], [0, 110]);
  const opacity = useTransform(scrollY, [0, 620], [1, 0.25]);

  return (
    <section id="inicio" className="relative flex min-h-screen items-center overflow-hidden px-4 pb-20 pt-32 sm:px-6 lg:pt-40">
      <div className="cyber-grid absolute inset-0 animate-grid-move opacity-70" aria-hidden="true" />
      <div className="noise pointer-events-none absolute inset-0 opacity-[0.05]" aria-hidden="true" />
      <motion.div style={{ y, opacity }} className="absolute left-1/2 top-24 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-cyanfire/20 blur-[120px] animate-aurora" aria-hidden="true" />
      <div className="absolute right-[-12rem] top-20 h-[34rem] w-[34rem] rounded-full bg-violetfire/20 blur-[140px]" aria-hidden="true" />
      <div className="absolute bottom-10 left-[-10rem] h-[28rem] w-[28rem] rounded-full bg-bluefire/20 blur-[120px]" aria-hidden="true" />

      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className="absolute h-1.5 w-1.5 rounded-full bg-cyanfire shadow-[0_0_18px_rgba(0,180,255,0.9)]"
          style={{ left: particle.left, top: particle.top }}
          animate={{ y: [0, -18, 0], opacity: [0.25, 1, 0.25], scale: [1, 1.6, 1] }}
          transition={{ duration: 4.6, repeat: Infinity, delay: particle.delay, ease: 'easeInOut' }}
          aria-hidden="true"
        />
      ))}

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.82, ease: [0.22, 1, 0.36, 1] }}>
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-cyanfire/25 bg-cyanfire/10 px-4 py-2 text-sm font-semibold text-cyanfire shadow-glow backdrop-blur-xl">
            <Flag className="h-4 w-4" aria-hidden="true" />
            Hecho en Colombia para empresas que no pueden detenerse
          </div>
          <h1 className="font-display text-5xl font-bold leading-[0.94] tracking-[-0.06em] text-white sm:text-6xl lg:text-7xl xl:text-8xl">
            El primer firewall <span className="text-gradient">Next-Generation</span> fabricado en Colombia
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-textfire/75 sm:text-xl">
            Protección de nivel empresarial para PYME, sin licencias en dólares, con soporte local y gestión centralizada en la nube.
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <a href="#contacto" className="focus-ring group inline-flex items-center justify-center rounded-full bg-gradient-to-r from-bluefire via-cyanfire to-greenfire bg-[length:180%_180%] px-7 py-4 text-sm font-bold text-white shadow-glow transition duration-300 hover:-translate-y-1 hover:bg-right hover:shadow-glow-strong">
              Solicitar Demo
              <ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
            </a>
            <a href="#servicios" className="focus-ring inline-flex items-center justify-center rounded-full border border-white/12 bg-white/[0.04] px-7 py-4 text-sm font-bold text-white backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-cyanfire/45 hover:bg-cyanfire/10">
              Conocer más
            </a>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 48 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }} className="glass-card relative rounded-[2rem] p-4 sm:p-6">
          <div className="absolute inset-x-10 -top-px h-px bg-gradient-to-r from-transparent via-cyanfire to-transparent" aria-hidden="true" />
          <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#050A13] p-5">
            <div className="absolute inset-0 animate-scan bg-gradient-to-b from-transparent via-cyanfire/10 to-transparent" aria-hidden="true" />
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-mutedfire">UltriFire OS</p>
                <h2 className="mt-2 font-display text-2xl font-bold text-white">Command Center</h2>
              </div>
              <div className="rounded-2xl border border-greenfire/25 bg-greenfire/10 p-3 text-greenfire">
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
                  <p className="mt-1 font-display text-lg font-bold text-white">{item.value}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-2xl border border-cyanfire/20 bg-cyanfire/10 p-4">
              <div className="mb-3 flex items-center justify-between text-xs text-textfire/65">
                <span>Tráfico inspeccionado</span>
                <span>98.7%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <motion.div className="h-full rounded-full bg-gradient-to-r from-bluefire to-cyanfire" initial={{ width: '14%' }} animate={{ width: '98.7%' }} transition={{ duration: 1.8, delay: 0.8, ease: 'easeOut' }} />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
