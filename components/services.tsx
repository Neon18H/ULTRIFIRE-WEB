import { Check, Cloud, CloudCog, MonitorCog, ServerCog, Shield } from 'lucide-react';
import { Reveal } from './motion-wrapper';
import { SectionHeading } from './section-heading';
import { cn } from '@/lib/utils';

const services = [
  {
    icon: ServerCog,
    title: 'Firewall Físico',
    subtitle: 'Appliance NGFW',
    description: 'Appliances Next-Generation ensamblados en Colombia con hardware Intel profesional para sedes físicas.',
    features: ['Base hasta 80 dispositivos, Medio hasta 200 y Enterprise hasta 1000', 'Firewall, IPS/IDS con Suricata, VPN, filtrado DNS y segmentación VLAN', 'Instalación en oficinas, clínicas, colegios, retail y empresas con sede física']
  },
  {
    icon: Cloud,
    title: 'Firewall Virtual',
    subtitle: 'Infraestructura del cliente',
    description: 'El mismo motor de seguridad, sin hardware, desplegado en AWS, Azure, Proxmox, VMware, Hyper-V o VPS del cliente.',
    features: ['Protege instancias cloud, servidores virtuales y entornos híbridos propios', 'El cliente provee el entorno; UltriFire provee la imagen y la gestión', 'Gateway seguro, concentrador VPN y perímetro para infraestructura virtualizada']
  },
  {
    icon: Shield,
    title: 'UltriFire Gateway Cloud',
    subtitle: 'Gestionado por nosotros',
    badge: 'Gestionado por UltriFire',
    highlight: true,
    description: 'Desplegamos y operamos el firewall en nuestra propia infraestructura para ocultar servidores y aplicaciones del cliente.',
    features: ['La infraestructura del cliente queda en red privada, sin exposición directa a internet', 'Todo el tráfico pasa por nuestro gateway, se filtra, inspecciona con IPS y viaja por túnel cifrado', 'Servicio llave en mano: reverse proxy + VPN, cero administración para el cliente']
  },
  {
    icon: MonitorCog,
    title: 'Plataforma de Gestión',
    subtitle: 'SaaS Multi-tenant',
    description: 'El cerebro que administra todos los firewalls físicos, virtuales y gateways desde un solo panel centralizado.',
    features: ['Monitoreo en tiempo real, reglas, VPN, alertas, reportes y usuarios', 'Administra 1 o 100 firewalls sin entrar manualmente a cada equipo', 'Ideal para empresas multi-sede, MSPs e integradores de TI']
  }
];

export function Services() {
  return (
    <section id="servicios" className="relative overflow-hidden px-4 py-24 sm:px-6">
      <div className="absolute left-0 top-1/3 h-96 w-96 rounded-full bg-bluefire/15 blur-[110px]" aria-hidden="true" />
      <div className="absolute right-0 top-20 h-96 w-96 rounded-full bg-cyanfire/10 blur-[120px]" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Nuestros servicios"
          title="Cuatro capas para proteger cada punto de entrada"
          description="Desde la sede física hasta aplicaciones cloud privadas, UltriFire combina NGFW, operación gestionada y un panel SaaS que simplifica la seguridad."
        />
        <div id="productos" className="grid gap-5 lg:grid-cols-2">
          {services.map((service, index) => (
            <Reveal key={service.title} delay={index * 0.08} className={cn('group glass-card relative overflow-hidden rounded-[2rem] p-7 transition duration-300 hover:-translate-y-2', service.highlight ? 'border-cyanfire/35 shadow-glow lg:row-span-2' : 'hover:border-cyanfire/30 hover:shadow-glow')}>
              {service.highlight ? <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(0,180,255,0.22),transparent_22rem)]" aria-hidden="true" /> : null}
              <div className="relative">
                <div className="mb-7 flex flex-wrap items-start justify-between gap-4">
                  <div className="rounded-2xl border border-cyanfire/20 bg-cyanfire/10 p-3 text-cyanfire transition group-hover:scale-110">
                    <service.icon className="h-7 w-7" aria-hidden="true" />
                  </div>
                  {service.badge ? <span className="rounded-full border border-greenfire/30 bg-greenfire/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-greenfire">{service.badge}</span> : null}
                </div>
                <p className="text-sm font-bold uppercase tracking-[0.28em] text-mutedfire">{service.subtitle}</p>
                <h3 className="mt-3 font-display text-3xl font-bold tracking-[-0.04em] text-white">{service.title}</h3>
                <p className="mt-4 text-base leading-8 text-textfire/68">{service.description}</p>
                <ul className="mt-7 grid gap-4">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex gap-3 text-sm leading-6 text-textfire/72">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyanfire/12 text-cyanfire">
                        <Check className="h-3.5 w-3.5" aria-hidden="true" />
                      </span>
                      {feature}
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
