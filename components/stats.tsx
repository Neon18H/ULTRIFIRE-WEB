import { Reveal } from './motion-wrapper';

const stats = [
  { value: '36.000M+', label: 'ataques a Colombia en 2024' },
  { value: '1,5M+', label: 'PYME sin protección real' },
  { value: '$0', label: 'licencias anuales en USD' },
  { value: '100%', label: 'soporte local' }
];

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
        <div className="grid gap-0 overflow-hidden border-y border-line/90 bg-deep/75 shadow-soft backdrop-blur-xl sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 0.06} className="border-line/70 px-0 py-10 sm:px-8 lg:border-l lg:first:border-l-0">
              <p className="text-5xl font-extralight tracking-[-0.04em] text-textfire sm:text-6xl">
                <span className="font-semibold">{stat.value}</span>
              </p>
              <p className="mt-4 max-w-48 text-sm leading-6 text-mutedfire">{stat.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
