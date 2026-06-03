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
    <section aria-label="Estadísticas de ciberseguridad" className="overflow-hidden px-4 py-16 sm:px-8 sm:py-20 lg:py-36">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.88fr)] lg:gap-16">
        <Reveal delay={0.12} className="relative order-1 mx-auto w-full max-w-[min(27rem,86vw)] lg:order-2 lg:max-w-xl">
          <div className="absolute inset-x-8 top-1/2 h-px bg-gradient-to-r from-transparent via-[#00B4FF]/30 to-transparent" aria-hidden="true" />
          <GlobeLive />
          <p className="mt-4 text-center text-[10px] font-semibold uppercase tracking-[0.22em] text-cyanfire sm:mt-5 sm:text-[11px] sm:tracking-[0.32em]">
            Mapa de amenazas globales · tiempo real
          </p>
        </Reveal>

        <div className="order-2 lg:order-1">
          <Reveal className="mb-8 max-w-3xl sm:mb-12">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#5B9BFF] sm:mb-5 sm:tracking-[0.28em]">Contexto</p>
            <h2 className="text-3xl font-extralight leading-[1.08] tracking-[-0.02em] text-textfire sm:text-5xl lg:text-6xl">
              Seguridad <span className="font-semibold">avanzada</span> para una realidad que ya cambió.
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 overflow-hidden border-y border-line/90 bg-deep/75 shadow-soft backdrop-blur-xl min-[480px]:grid-cols-2">
            {stats.map((stat, index) => (
              <Reveal
                key={stat.label}
                delay={index * 0.06}
                className="border-line/70 px-5 py-7 min-[480px]:[&:nth-child(2n)]:border-l min-[480px]:[&:nth-child(n+3)]:border-t sm:px-8 sm:py-8 lg:min-h-44"
              >
                <p className="text-3xl font-extralight tracking-[-0.04em] text-textfire sm:text-5xl xl:text-6xl">
                  <span className="font-semibold">{stat.value}</span>
                </p>
                <p className="mt-3 max-w-48 text-sm leading-6 text-mutedfire sm:mt-4">{stat.label}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
