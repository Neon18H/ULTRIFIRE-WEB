import { Cloud, Eye, PlugZap, ShieldCheck } from 'lucide-react';
import { Reveal } from './motion-wrapper';
import { SectionHeading } from './section-heading';

const steps = [
  { icon: PlugZap, title: 'Instalas', text: 'Implementamos el firewall físico, virtual o gateway cloud según tu infraestructura.' },
  { icon: Cloud, title: 'Conecta', text: 'El dispositivo se registra automáticamente en la nube segura de UltriFire.' },
  { icon: Eye, title: 'Administras', text: 'Controlas reglas, VPN, usuarios y reportes desde un panel centralizado.' },
  { icon: ShieldCheck, title: 'Protege 24/7', text: 'Monitoreo continuo, alertas y tráfico inspeccionado antes de llegar a tus sistemas.' }
];

export function HowItWorks() {
  return (
    <section className="px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Cómo funciona"
          title="De la instalación a la protección continua en cuatro pasos"
          description="Una experiencia operativa simple para equipos de TI que necesitan seguridad avanzada sin complejidad innecesaria."
        />
        <div className="relative grid gap-4 lg:grid-cols-4">
          <div className="absolute left-0 right-0 top-14 hidden h-px bg-gradient-to-r from-transparent via-cyanfire/45 to-transparent lg:block" aria-hidden="true" />
          {steps.map((step, index) => (
            <Reveal key={step.title} delay={index * 0.09} className="relative rounded-[1.75rem] border border-white/10 bg-panel/65 p-6 backdrop-blur-xl transition hover:-translate-y-2 hover:border-cyanfire/35 hover:shadow-glow">
              <div className="mb-7 flex h-16 w-16 items-center justify-center rounded-2xl border border-cyanfire/25 bg-night text-cyanfire shadow-glow">
                <step.icon className="h-7 w-7" aria-hidden="true" />
              </div>
              <span className="text-sm font-bold text-cyanfire">0{index + 1}</span>
              <h3 className="mt-2 font-display text-2xl font-bold text-white">{step.title}</h3>
              <p className="mt-3 leading-7 text-textfire/65">{step.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
