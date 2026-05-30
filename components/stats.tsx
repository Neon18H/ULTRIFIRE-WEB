'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Activity, BadgeDollarSign, Headset, ShieldAlert } from 'lucide-react';

const stats = [
  { value: 36000, suffix: 'M+', label: 'ataques a Colombia en 2024', icon: ShieldAlert },
  { value: 1.5, suffix: 'M+', label: 'PYME sin protección real', icon: Activity, decimals: 1 },
  { value: 0, suffix: '', label: 'licencias en USD', icon: BadgeDollarSign },
  { value: 100, suffix: '%', label: 'soporte local en español', icon: Headset }
];

// Count-up ligero: se activa solo cuando la estadística entra en viewport.
function CountUp({ value, suffix, decimals = 0 }: { value: number; suffix: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1500;
    const start = performance.now();
    const animate = (time: number) => {
      const progress = Math.min((time - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(value * eased);
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {display.toLocaleString('es-CO', { maximumFractionDigits: decimals, minimumFractionDigits: decimals })}
      {suffix}
    </span>
  );
}

export function Stats() {
  return (
    <section aria-label="Estadísticas de ciberseguridad" className="relative z-10 px-4 py-10 sm:px-6">
      <div className="mx-auto grid max-w-7xl gap-4 rounded-[2rem] border border-white/10 bg-white/[0.035] p-3 shadow-2xl backdrop-blur-2xl sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: index * 0.08 }}
            className="rounded-[1.5rem] border border-white/10 bg-panel/70 p-5 transition hover:-translate-y-1 hover:border-cyanfire/35 hover:shadow-glow"
          >
            <stat.icon className="mb-5 h-6 w-6 text-cyanfire" aria-hidden="true" />
            <p className="font-display text-3xl font-bold tracking-[-0.04em] text-white">
              <CountUp value={stat.value} suffix={stat.suffix} decimals={stat.decimals} />
            </p>
            <p className="mt-2 text-sm leading-6 text-textfire/62">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
