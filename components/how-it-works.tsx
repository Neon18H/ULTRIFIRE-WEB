import { Cable, Settings2, ShieldCheck } from 'lucide-react';
import { Reveal } from './motion-wrapper';
import { SectionHeading } from './section-heading';

const steps = [
  { icon: Settings2, title: 'Eliges cómo proteger', text: 'Seleccionas appliance físico, firewall virtual o UltriFire Gateway Cloud según tu perímetro, nube y operación.' },
  { icon: Cable, title: 'Se conecta a la plataforma', text: 'El control queda enlazado con túneles cifrados, políticas base, alertas y telemetría centralizada.' },
  { icon: ShieldCheck, title: 'Administras todo desde un panel', text: 'Gestionas sedes, VPN, reglas, usuarios y reportes desde una consola SaaS multi-tenant.' }
];

export function HowItWorks() {
  return (
    <section id="como-funciona" className="px-4 py-16 sm:px-8 sm:py-20 lg:py-36">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Cómo funciona"
          title={<>Implementación <span className="font-semibold">clara</span>. Operación centralizada.</>}
          description="Eliges cómo proteger —físico, virtual o gateway—, conectas la solución a la plataforma y administras todo desde un panel."
        />
        <div className="relative grid gap-5 md:gap-6 lg:grid-cols-3 lg:gap-12">
          <div className="absolute bottom-8 left-9 top-8 w-px bg-gradient-to-b from-transparent via-line to-transparent lg:left-0 lg:right-0 lg:top-9 lg:h-px lg:w-auto lg:bg-gradient-to-r" aria-hidden="true" />
          {steps.map((step, index) => (
            <Reveal key={step.title} delay={index * 0.08} className="relative border border-line/75 bg-deep/85 p-5 pl-24 shadow-soft backdrop-blur-xl sm:p-6 sm:pl-28 lg:border-0 lg:bg-deep/80 lg:pl-6 lg:pr-6">
              <div className="absolute left-5 top-6 flex h-16 w-16 items-center justify-center border border-line bg-deep/95 p-4 text-cyanfire shadow-[0_0_45px_rgba(0,180,255,0.08)] backdrop-blur-xl sm:left-6 sm:h-[4.5rem] sm:w-[4.5rem] sm:p-5 lg:static lg:mb-10">
                <step.icon className="h-7 w-7 stroke-[1.35]" aria-hidden="true" />
              </div>
              <p className="mb-3 text-sm font-semibold text-bluefire sm:mb-4">0{index + 1}</p>
              <h3 className="text-xl font-light tracking-[-0.02em] text-textfire sm:text-2xl"><span className="font-semibold">{step.title}</span></h3>
              <p className="mt-3 max-w-sm text-sm font-light leading-7 text-mutedfire sm:mt-4 sm:text-base">{step.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
