'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { Reveal } from './motion-wrapper';

const stats = [
  { value: 36000, suffix: 'M+', label: 'ataques a Colombia en 2024' },
  { value: 1.5, suffix: 'M+', label: 'PYME sin protección real', decimals: 1 },
  { value: 0, suffix: '', prefix: '$', label: 'licencias anuales en USD' },
  { value: 100, suffix: '%', label: 'soporte local en español' }
];

// Count-up sutil: un único movimiento corto cuando el número entra en pantalla.
function CountUp({ value, suffix, prefix = '', decimals = 0 }: { value: number; suffix: string; prefix?: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1300;
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
      {prefix}
      {display.toLocaleString('es-CO', { maximumFractionDigits: decimals, minimumFractionDigits: decimals })}
      {suffix}
    </span>
  );
}

export function Stats() {
  return (
    <section aria-label="Estadísticas de ciberseguridad" className="px-5 py-32 sm:px-8 lg:py-40">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-16 max-w-3xl">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.34em] text-bluefire">Contexto</p>
          <h2 className="text-4xl font-semibold leading-[1.03] tracking-[-0.055em] text-textfire sm:text-5xl lg:text-6xl">Seguridad avanzada para una realidad que ya cambió.</h2>
        </Reveal>
        <div className="grid gap-10 border-y border-line py-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-14">
          {stats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 0.06} className="min-h-32">
              <p className={index === 2 ? 'text-5xl font-semibold tracking-[-0.06em] text-orangefire sm:text-6xl' : 'text-5xl font-semibold tracking-[-0.06em] text-textfire sm:text-6xl'}>
                <CountUp value={stat.value} suffix={stat.suffix} prefix={stat.prefix} decimals={stat.decimals} />
              </p>
              <p className="mt-4 max-w-48 text-sm leading-6 text-mutedfire">{stat.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
