import { Check, Cloud, MonitorCog, ServerCog, Shield } from 'lucide-react';
import { Reveal } from './motion-wrapper';
import { SectionHeading } from './section-heading';
import { cn } from '@/lib/utils';

const services = [
  {
    icon: ServerCog,
    title: 'Firewall Físico',
    subtitle: 'Appliances NGFW Colombia',
    description: 'Equipos físicos para sedes que necesitan perímetro, segmentación, VPN e inspección de tráfico con operación local y costos en COP.',
    features: ['Tres tiers: Base 80 dispositivos, Medio 200 y Enterprise 1000', 'IPS/IDS, VPN, DNS filtering, VLAN y políticas por sede', 'Instalación para clínicas, colegios, retail, industria y oficinas']
  },
  {
    icon: Cloud,
    title: 'Firewall Virtual',
    subtitle: 'Nube e infraestructura del cliente',
    description: 'La misma postura de seguridad desplegada en AWS, Azure, Proxmox, VMware o VPS, sin adquirir hardware dedicado.',
    features: ['Protección de workloads cloud, servidores virtuales y topologías híbridas', 'El cliente conserva su infraestructura; UltriFire provee imagen y gestión', 'Gateway seguro para VPN site-to-site, usuarios remotos y servicios internos']
  },
  {
    icon: Shield,
    title: 'UltriFire Gateway Cloud',
    subtitle: 'Perímetro gestionado',
    badge: 'Gestionado · Cero exposición',
    highlight: true,
    description: 'Montamos el firewall en nuestra infraestructura. La nube o servidores del cliente quedan ocultos detrás de un túnel cifrado.',
    features: ['Sin exposición directa de la infraestructura del cliente a internet', 'Tráfico filtrado e inspeccionado antes de llegar a tus aplicaciones', 'Servicio llave en mano para startups, e-commerce y aplicaciones críticas', 'Un punto de entrada seguro para una o varias instancias privadas']
  },
  {
    icon: MonitorCog,
    title: 'Plataforma SaaS de Gestión',
    subtitle: 'Panel central multi-tenant',
    description: 'Un centro de control para administrar firewalls físicos, virtuales y gateways gestionados con consistencia operacional.',
    features: ['Reglas, VPN, alertas, reportes y usuarios desde una consola', 'Operación de múltiples sedes sin ingresar manualmente a cada equipo', 'Diseñado para empresas multi-sede, MSPs e integradores de TI']
  }
];

export function Services() {
  return (
    <section id="servicios" className="relative overflow-hidden px-4 py-16 sm:px-8 sm:py-20 lg:py-36">
      <div className="absolute right-[-10rem] top-20 h-[22rem] w-[22rem] rounded-full bg-bluefire/8 blur-[110px] sm:right-0 sm:top-28 sm:h-[32rem] sm:w-[32rem] sm:blur-[140px]" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Servicios"
          title={<>Arquitectura <span className="font-semibold">sobria</span> para cada punto de entrada.</>}
          description="UltriFire combina appliances, firewall virtual, perímetro cloud gestionado y una plataforma SaaS para reducir complejidad sin sacrificar control."
        />
        <div id="productos" className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-2">
          {services.map((service, index) => (
            <Reveal key={service.title} delay={index * 0.06} className={cn('group enterprise-panel relative overflow-hidden p-5 transition duration-300 hover:-translate-y-1 hover:border-bluefire/70 hover:shadow-[0_30px_110px_rgba(26,111,255,0.12)] sm:p-6 lg:p-10', service.highlight ? 'border-orangefire/45 lg:row-span-2' : '')}>
              {service.highlight ? <div className="absolute right-[-4rem] top-0 h-52 w-52 rounded-full bg-orangefire/[0.06] blur-[70px] sm:right-0 sm:h-64 sm:w-64 sm:blur-[80px]" aria-hidden="true" /> : null}
              <div className="relative">
                <div className="mb-7 flex flex-wrap items-start justify-between gap-4 sm:mb-10">
                  <div className="border border-line p-3 text-cyanfire transition group-hover:border-bluefire/50 group-hover:text-[#5B9BFF]">
                    <service.icon className="h-6 w-6 stroke-[1.35]" aria-hidden="true" />
                  </div>
                  {service.badge ? <span className="border border-orangefire/35 bg-orangefire/[0.035] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-orangefire">{service.badge}</span> : null}
                </div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-mutedfire">{service.subtitle}</p>
                <h3 className="mt-3 text-2xl font-light tracking-[-0.02em] text-textfire sm:mt-4 sm:text-3xl lg:text-4xl"><span className="font-semibold">{service.title}</span></h3>
                <p className="mt-4 max-w-2xl text-sm font-light leading-7 text-mutedfire sm:mt-5 sm:text-base">{service.description}</p>
                <ul className="mt-7 grid gap-3 sm:mt-9 sm:gap-4">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex gap-3 text-sm leading-6 text-mutedfire">
                      <Check className="mt-1 h-4 w-4 shrink-0 text-bluefire" aria-hidden="true" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
