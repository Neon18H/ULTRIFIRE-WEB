'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { Reveal } from './motion-wrapper';

const stats = [
  { value: 36000, suffix: 'M+', label: 'ataques a Colombia en 2024' },
  { value: 1.5, suffix: 'M+', label: 'PYME sin protección real', decimals: 1 },
  { value: 0, suffix: '', prefix: '$', label: 'licencias anuales en USD' },
  { value: 24, suffix: '/7', label: 'monitoreo y soporte local' }
];

// Count-up sobrio: una sola entrada gradual cuando cada cifra aparece en viewport.
function CountUp({ value, suffix, prefix = '', decimals = 0 }: { value: number; suffix: string; prefix?: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1250;
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
    <section aria-label="Estadísticas de ciberseguridad" className="px-5 py-28 sm:px-8 lg:py-36">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-16 max-w-3xl">
          <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#5B9BFF]">Contexto</p>
          <h2 className="text-4xl font-extralight leading-[1.04] tracking-[-0.02em] text-textfire sm:text-5xl lg:text-6xl">
            Seguridad <span className="font-semibold">avanzada</span> para una realidad que ya cambió.
          </h2>
        </Reveal>
        <div className="grid gap-0 overflow-hidden border-y border-line/90 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 0.06} className="border-line/70 px-0 py-10 sm:px-8 lg:border-l lg:first:border-l-0">
              <p className="text-5xl font-extralight tracking-[-0.04em] text-textfire sm:text-6xl">
                <span className="font-semibold"><CountUp value={stat.value} suffix={stat.suffix} prefix={stat.prefix} decimals={stat.decimals} /></span>
              </p>
              <p className="mt-4 max-w-48 text-sm leading-6 text-mutedfire">{stat.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
