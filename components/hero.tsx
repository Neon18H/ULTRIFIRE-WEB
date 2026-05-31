'use client';

import ShaderHero from '@/components/ui/animated-shader-hero';

export function Hero() {
  const scrollToContact = () => {
    document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToHowItWorks = () => {
    document.querySelector('#como-funciona')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <ShaderHero
      trustBadge={{ text: 'Hecho en Colombia 🇨🇴' }}
      microLabel="PROTECCIÓN DE NUEVA GENERACIÓN"
      headline={{ line1: 'Defensa inteligente', line2: 'para amenazas modernas' }}
      subtitle="Firewalls Next-Generation físicos y virtuales, fabricados en Colombia y gestionados desde una sola plataforma. Sin licencias en dólares."
      buttons={{
        primary: { text: 'Solicitar demo', onClick: scrollToContact },
        secondary: { text: 'Ver cómo funciona →', onClick: scrollToHowItWorks }
      }}
    />
  );
}
