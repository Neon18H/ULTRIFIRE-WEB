import { Comparison } from '@/components/comparison';
import { Contact } from '@/components/contact';
import { Footer } from '@/components/footer';
import { Hero } from '@/components/hero';
import { HowItWorks } from '@/components/how-it-works';
import { Navbar } from '@/components/navbar';
import { Services } from '@/components/services';
import { Stats } from '@/components/stats';
import { WhyUltrifire } from '@/components/why-ultrifire';
import { ErrorBoundary } from '@/components/ui/error-boundary';

function SectionFallback({ title }: { title: string }) {
  return (
    <section className="px-4 py-12 sm:px-8" aria-label={`Respaldo ${title}`}>
      <div className="mx-auto max-w-7xl rounded-2xl border border-line/75 bg-deep/85 p-6 text-mutedfire shadow-soft">
        {/* Comentario en español: una falla aislada no debe desmontar las secciones siguientes. */}
        <p className="text-sm">La sección {title} no pudo cargarse, pero el resto de UltriFire continúa disponible.</p>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main className="relative overflow-x-hidden bg-night">
      <Navbar />
      <ErrorBoundary name="Hero" fallback={<SectionFallback title="Inicio" />}>
        <Hero />
      </ErrorBoundary>
      <section className="premium-section-bg relative overflow-hidden bg-[#060810]" aria-label="Contenido UltriFire">
        {/* Fondo continuo y liviano para las secciones: gradientes + grid CSS. */}
        <div className="section-cyber-grid" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-x-0 -top-44 z-[1] h-72 bg-gradient-to-b from-night via-[#060810]/94 to-[#060810]" aria-hidden="true" />
        <div className="relative z-10">
          {/* Cada sección se monta de forma independiente; Servicios/Cómo Funciona no importan WebGL/canvas. */}
          <ErrorBoundary name="WhyUltrifire" fallback={<SectionFallback title="Why UltriFire" />}>
            <WhyUltrifire />
          </ErrorBoundary>
          <ErrorBoundary name="Stats" fallback={<SectionFallback title="Estadísticas" />}>
            <Stats />
          </ErrorBoundary>
          <ErrorBoundary name="Services" fallback={<SectionFallback title="Servicios" />}>
            <Services />
          </ErrorBoundary>
          <ErrorBoundary name="HowItWorks" fallback={<SectionFallback title="Cómo funciona" />}>
            <HowItWorks />
          </ErrorBoundary>
          <ErrorBoundary name="Comparison" fallback={<SectionFallback title="Comparación" />}>
            <Comparison />
          </ErrorBoundary>
          <ErrorBoundary name="Contact" fallback={<SectionFallback title="Contacto" />}>
            <Contact />
          </ErrorBoundary>
        </div>
      </section>
      <ErrorBoundary name="Footer" fallback={<SectionFallback title="Footer" />}>
        <Footer />
      </ErrorBoundary>
    </main>
  );
}
