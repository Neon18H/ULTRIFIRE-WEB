import { Reveal } from './motion-wrapper';
import { GlobeLive } from './ui/cobe-globe-live';

const stats = [
  { value: '36.000M+', label: 'ataques a Colombia en 2024' },
  { value: '1,5M+', label: 'PYME sin protección real' },
  { value: '$0', label: 'licencias anuales en USD' },
  { value: '100%', label: 'soporte local' }
];

export function Stats() {
  return (
    <section aria-label="Estadísticas de ciberseguridad" className="px-5 py-28 sm:px-8 lg:py-36">
      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(380px,0.88fr)] lg:gap-16">
        <div>
          <Reveal className="mb-12 max-w-3xl">
            <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#5B9BFF]">Contexto</p>
            <h2 className="text-4xl font-extralight leading-[1.04] tracking-[-0.02em] text-textfire sm:text-5xl lg:text-6xl">
              Seguridad <span className="font-semibold">avanzada</span> para una realidad que ya cambió.
            </h2>
          </Reveal>

          <div className="grid grid-cols-2 gap-0 overflow-hidden border-y border-line/90 bg-deep/75 shadow-soft backdrop-blur-xl">
            {stats.map((stat, index) => (
              <Reveal
                key={stat.label}
                delay={index * 0.06}
                className="border-line/70 px-5 py-8 sm:px-8 lg:min-h-44 [&:nth-child(2n)]:border-l [&:nth-child(n+3)]:border-t"
              >
                <p className="text-4xl font-extralight tracking-[-0.04em] text-textfire sm:text-5xl xl:text-6xl">
                  <span className="font-semibold">{stat.value}</span>
                </p>
                <p className="mt-4 max-w-48 text-sm leading-6 text-mutedfire">{stat.label}</p>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.12} className="relative mx-auto w-full max-w-lg lg:max-w-xl">
          <div className="absolute inset-x-8 top-1/2 h-px bg-gradient-to-r from-transparent via-[#00B4FF]/30 to-transparent" aria-hidden="true" />
          <GlobeLive />
          <p className="mt-5 text-center text-[11px] font-semibold uppercase tracking-[0.32em] text-cyanfire">
            Mapa de amenazas globales · tiempo real
          </p>
        </Reveal>
      </div>
    </section>
  );
}
