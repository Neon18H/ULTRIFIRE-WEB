import { Reveal } from './motion-wrapper';

const trustItems = ['Tecnología open source', 'Hecho en Colombia', 'Soporte local'];

export function WhyUltrifire() {
  return (
    <section aria-label="Franja de confianza" className="border-y border-line/80 bg-deep/75 px-4 py-7 backdrop-blur-xl sm:px-8">
      <Reveal className="mx-auto grid max-w-7xl grid-cols-1 gap-3 text-xs uppercase tracking-[0.16em] text-mutedfire/85 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 md:tracking-[0.18em]">
        {trustItems.map((item) => (
          <div key={item} className="flex min-h-11 items-center justify-center rounded-xl border border-line/60 bg-white/[0.02] px-4 text-center md:border-0 md:bg-transparent">
            <span>{item}</span>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
