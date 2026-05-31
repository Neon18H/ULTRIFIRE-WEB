'use client';

import dynamic from 'next/dynamic';

const HeroGradientFallback = () => (
  <div className="relative min-h-screen w-full overflow-hidden bg-black">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_22%,rgba(0,180,255,0.22),transparent_34rem),radial-gradient(circle_at_88%_72%,rgba(255,90,31,0.1),transparent_24rem),linear-gradient(135deg,#060810_0%,#07162b_48%,#020409_100%)]" />
    <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,8,16,0.92)_0%,rgba(6,8,16,0.72)_34%,rgba(6,8,16,0.34)_64%,rgba(6,8,16,0.16)_100%)]" />
  </div>
);

const ShaderHero = dynamic(() => import('@/components/ui/animated-shader-hero'), {
  ssr: false,
  loading: HeroGradientFallback
});

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
