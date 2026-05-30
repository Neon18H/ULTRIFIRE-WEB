import { Reveal } from './motion-wrapper';

const trustItems = ['Tecnología de seguridad de código abierto', 'Hecho en Colombia', 'Soporte local en español', 'Costos previsibles en COP'];

export function WhyUltrifire() {
  return (
    <section aria-label="Franja de confianza" className="border-y border-line/80 bg-deep/35 px-5 py-8 sm:px-8">
      <Reveal className="mx-auto flex max-w-7xl flex-col gap-4 text-sm text-mutedfire md:flex-row md:items-center md:justify-between">
        {trustItems.map((item, index) => (
          <div key={item} className="flex items-center gap-4">
            <span className="h-1.5 w-1.5 rounded-full bg-bluefire" aria-hidden="true" />
            <span>{item}</span>
            {index < trustItems.length - 1 ? <span className="hidden h-px w-12 bg-line lg:block" aria-hidden="true" /> : null}
          </div>
        ))}
      </Reveal>
    </section>
  );
}
