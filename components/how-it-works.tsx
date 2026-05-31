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
    <section id="como-funciona" className="px-5 py-28 sm:px-8 lg:py-36">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Cómo funciona"
          title={<>Implementación <span className="font-semibold">clara</span>. Operación centralizada.</>}
          description="Eliges cómo proteger —físico, virtual o gateway—, conectas la solución a la plataforma y administras todo desde un panel."
        />
        <div className="relative grid gap-8 lg:grid-cols-3 lg:gap-12">
          <div className="absolute left-0 right-0 top-9 hidden h-px bg-gradient-to-r from-transparent via-line to-transparent lg:block" aria-hidden="true" />
          {steps.map((step, index) => (
            <Reveal key={step.title} delay={index * 0.08} className="relative border border-line/75 bg-deep/75 p-6 shadow-soft backdrop-blur-xl lg:border-0 lg:bg-deep/70 lg:pr-6">
              <div className="mb-10 flex h-[4.5rem] w-[4.5rem] items-center justify-center border border-line bg-deep/85 p-5 backdrop-blur-xl text-cyanfire shadow-[0_0_45px_rgba(0,180,255,0.08)]">
                <step.icon className="h-7 w-7 stroke-[1.35]" aria-hidden="true" />
              </div>
              <p className="mb-4 text-sm font-semibold text-bluefire">0{index + 1}</p>
              <h3 className="text-2xl font-light tracking-[-0.02em] text-textfire"><span className="font-semibold">{step.title}</span></h3>
              <p className="mt-4 max-w-sm text-base font-light leading-7 text-mutedfire">{step.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
