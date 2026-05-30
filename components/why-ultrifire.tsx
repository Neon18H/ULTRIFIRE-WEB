import { BadgeDollarSign, CloudCog, Cpu, Gauge, Headset, MapPin } from 'lucide-react';
import { Reveal } from './motion-wrapper';
import { SectionHeading } from './section-heading';

const reasons = [
  { icon: MapPin, title: 'Fabricación nacional colombiana', text: 'Sin aranceles ni importación costosa: appliances ensamblados localmente con estándares profesionales.' },
  { icon: BadgeDollarSign, title: 'Precios en pesos colombianos', text: 'Modelo comercial diseñado para PYME: elimina la presión de licencias anuales en USD.' },
  { icon: Headset, title: 'Soporte técnico local', text: 'Atención en español, con contexto del mercado colombiano y respuesta cercana.' },
  { icon: Cpu, title: 'Basado en OPNsense', text: 'Motor open source probado, extensible y sin costos de licencia de software propietario.' },
  { icon: CloudCog, title: 'Gestión centralizada en la nube', text: 'Administra reglas, VPN, alertas y reportes desde un panel multi-tenant moderno.' },
  { icon: Gauge, title: 'Escalable por diseño', text: 'Protege oficinas físicas, entornos virtualizados, nubes públicas y topologías híbridas.' }
];

export function WhyUltrifire() {
  return (
    <section id="por-que" className="relative px-4 py-24 sm:px-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(26,111,255,0.12),transparent_36rem)]" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Por qué UltriFire"
          title="Seguridad de clase mundial con ventaja local"
          description="Unimos hardware profesional, software abierto y operación cloud para llevar protección avanzada a empresas que necesitan control, soporte y costos predecibles."
        />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason, index) => (
            <Reveal key={reason.title} delay={index * 0.06} className="group glass-card rounded-[1.75rem] p-6 transition duration-300 hover:-translate-y-2 hover:border-cyanfire/35 hover:shadow-glow">
              <div className="mb-6 inline-flex rounded-2xl border border-cyanfire/20 bg-cyanfire/10 p-3 text-cyanfire transition group-hover:scale-110 group-hover:bg-cyanfire/15">
                <reason.icon className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="font-display text-xl font-bold text-white">{reason.title}</h3>
              <p className="mt-3 leading-7 text-textfire/65">{reason.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
