import { Cable, Settings2, ShieldCheck } from 'lucide-react';
import { Reveal } from './motion-wrapper';
import { SectionHeading } from './section-heading';

const steps = [
  { icon: Settings2, title: 'Evaluamos el perímetro', text: 'Revisamos sedes, nube, aplicaciones críticas, usuarios remotos y exposición actual para definir la arquitectura correcta.' },
  { icon: Cable, title: 'Desplegamos el control', text: 'Instalamos appliance, firewall virtual o gateway cloud con túneles cifrados, reglas base y segmentación inicial.' },
  { icon: ShieldCheck, title: 'Operamos desde una consola', text: 'Gestionamos políticas, VPN, alertas y reportes desde el panel SaaS con soporte local en español.' }
];

export function HowItWorks() {
  return (
    <section id="como-funciona" className="px-5 py-32 sm:px-8 lg:py-40">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Cómo funciona"
          title="Implementación clara. Operación centralizada."
          description="La seguridad enterprise no tiene que sentirse compleja. UltriFire ordena el perímetro, aplica controles y mantiene visibilidad desde una sola plataforma."
        />
        <div className="relative grid gap-8 lg:grid-cols-3 lg:gap-12">
          <div className="absolute left-0 right-0 top-9 hidden h-px bg-line lg:block" aria-hidden="true" />
          {steps.map((step, index) => (
            <Reveal key={step.title} delay={index * 0.08} className="relative bg-night pr-6">
              <div className="mb-10 flex h-[4.5rem] w-[4.5rem] items-center justify-center border border-line bg-deep p-5 text-bluefire">
                <step.icon className="h-7 w-7 stroke-[1.6]" aria-hidden="true" />
              </div>
              <p className="mb-4 text-sm font-semibold text-bluefire">0{index + 1}</p>
              <h3 className="text-2xl font-semibold tracking-[-0.035em] text-textfire">{step.title}</h3>
              <p className="mt-4 max-w-sm text-base leading-7 text-mutedfire">{step.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
