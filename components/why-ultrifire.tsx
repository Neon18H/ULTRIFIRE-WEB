import { Reveal } from './motion-wrapper';

const trustItems = ['Tecnología open source', 'Hecho en Colombia 🇨🇴', 'Soporte local', 'Costos previsibles en COP'];

export function WhyUltrifire() {
  return (
    <section aria-label="Franja de confianza" className="border-y border-line/80 bg-deep/35 px-5 py-7 sm:px-8">
      <Reveal className="mx-auto flex max-w-7xl flex-col gap-4 text-xs uppercase tracking-[0.18em] text-mutedfire/85 md:flex-row md:items-center md:justify-center md:gap-8">
        {trustItems.map((item, index) => (
          <div key={item} className="flex items-center gap-4">
            <span>{item}</span>
            {index < trustItems.length - 1 ? <span className="hidden h-px w-14 bg-line lg:block" aria-hidden="true" /> : null}
          </div>
        ))}
      </Reveal>
    </section>
  );
}
