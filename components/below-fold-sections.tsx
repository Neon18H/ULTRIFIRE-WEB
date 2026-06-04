import { Comparison } from '@/components/comparison';
import { Contact } from '@/components/contact';
import { HowItWorks } from '@/components/how-it-works';
import { Services } from '@/components/services';
import { Stats } from '@/components/stats';
import { WhyUltrifire } from '@/components/why-ultrifire';
import { ErrorBoundary } from '@/components/ui/error-boundary';

function SectionFallback({ title }: { title: string }) {
  return (
    <section className="px-4 py-12 sm:px-8" aria-label={`Respaldo ${title}`}>
      <div className="mx-auto max-w-7xl rounded-2xl border border-line/75 bg-deep/85 p-6 text-mutedfire shadow-soft">
        {/* Comentario en español: si una sección falla en cliente, las demás siguen montadas. */}
        <p className="text-sm">La sección {title} no pudo cargarse, pero el resto de UltriFire continúa disponible.</p>
      </div>
    </section>
  );
}

export function BelowFoldSections() {
  return (
    <>
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
    </>
  );
}
