type HeroProps = {
  trustBadge?: {
    text: string;
    icons?: string[];
  };
  microLabel?: string;
  headline: {
    line1: string;
    line2: string;
  };
  subtitle: string;
  buttons?: {
    primary?: {
      text: string;
      href: string;
    };
    secondary?: {
      text: string;
      href: string;
    };
  };
  className?: string;
};

function StaticHero({
  trustBadge,
  microLabel = 'PROTECCIÓN DE NUEVA GENERACIÓN',
  headline,
  subtitle,
  buttons,
  className = ''
}: HeroProps) {
  const accentedLine = headline.line2.replace(/^para\s+/i, '');

  return (
    <section id="inicio" className={`hero-static-bg relative min-h-screen w-full overflow-hidden ${className}`}>
      {/* Capas decorativas 100% CSS: fondo premium sin ejecución en runtime. */}
      <div className="hero-cyber-grid" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[#060810]/18" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-0 z-[2] bg-[linear-gradient(90deg,rgba(6,8,16,0.94)_0%,rgba(6,8,16,0.78)_36%,rgba(6,8,16,0.42)_66%,rgba(6,8,16,0.18)_100%)]"
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] h-40 bg-gradient-to-t from-night to-transparent" aria-hidden="true" />

      <div className="relative z-10 flex min-h-screen flex-col items-start justify-center px-5 pb-24 pt-36 text-left text-white sm:px-8 lg:px-16 lg:pt-40 xl:px-24">
        <div className="max-w-4xl">
          {trustBadge && (
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 rounded-lg border border-blue-300/20 bg-blue-500/10 px-4 py-2 text-sm backdrop-blur-md">
                {trustBadge.icons && (
                  <div className="flex">
                    {trustBadge.icons.map((icon, index) => (
                      <span key={index} className="text-[#5B9BFF]">
                        {icon}
                      </span>
                    ))}
                  </div>
                )}
                <span className="text-[#DCE8FF]">{trustBadge.text}</span>
              </div>
            </div>
          )}

          <p className="mb-7 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#5B9BFF]">
            {microLabel}
          </p>

          <div className="space-y-3">
            <h1 className="text-5xl font-extralight leading-[1.02] tracking-[-0.02em] text-[#F0F4FA] sm:text-6xl lg:text-7xl">
              {headline.line1}
            </h1>
            <h2 className="text-5xl font-extralight leading-[1.02] tracking-[-0.02em] text-[#F0F4FA] sm:text-6xl lg:text-7xl">
              para{' '}
              <span className="bg-gradient-to-r from-[#1A6FFF] via-[#00B4FF] to-[#5B9BFF] bg-clip-text font-semibold text-transparent">
                {accentedLine}
              </span>
            </h2>
          </div>

          <p className="mt-8 max-w-2xl text-base font-light leading-8 text-[#B7C4D8] sm:text-lg lg:text-xl">
            {subtitle}
          </p>

          {buttons && (
            <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center">
              {buttons.primary && (
                <a
                  href={buttons.primary.href}
                  className="inline-flex items-center justify-center rounded-lg bg-[linear-gradient(135deg,#1A6FFF_0%,#1A6FFF_64%,#FF5A1F_140%)] px-7 py-4 text-sm font-semibold text-white shadow-[0_18px_60px_rgba(26,111,255,0.24)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_70px_rgba(26,111,255,0.32)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B9BFF] focus-visible:ring-offset-2 focus-visible:ring-offset-night motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                >
                  {buttons.primary.text}
                </a>
              )}
              {buttons.secondary && (
                <a
                  href={buttons.secondary.href}
                  className="inline-flex items-center justify-center rounded-lg px-1 py-4 text-sm font-semibold text-[#DCE8FF] transition duration-300 hover:translate-x-1 hover:text-[#00B4FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B9BFF] focus-visible:ring-offset-2 focus-visible:ring-offset-night motion-reduce:transition-none motion-reduce:hover:translate-x-0"
                >
                  {buttons.secondary.text}
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export function Hero() {
  return (
    <StaticHero
      trustBadge={{ text: 'Hecho en Colombia 🇨🇴' }}
      microLabel="PROTECCIÓN DE NUEVA GENERACIÓN"
      headline={{ line1: 'Defensa inteligente', line2: 'para amenazas modernas' }}
      subtitle="Firewalls Next-Generation físicos y virtuales, fabricados en Colombia y gestionados desde una sola plataforma. Sin licencias en dólares."
      buttons={{
        primary: { text: 'Solicitar demo', href: '#contacto' },
        secondary: { text: 'Ver cómo funciona →', href: '#como-funciona' }
      }}
    />
  );
}
