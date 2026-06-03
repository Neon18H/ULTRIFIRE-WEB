import { BelowFoldSections } from '@/components/below-fold-sections';
import { Footer } from '@/components/footer';
import { Hero } from '@/components/hero';
import { Navbar } from '@/components/navbar';

export default function Home() {
  return (
    <main className="relative overflow-x-hidden bg-night">
      <Navbar />
      <Hero />
      <section className="premium-section-bg relative overflow-hidden bg-[#060810]" aria-label="Contenido UltriFire">
        {/* Fondo continuo y liviano para las secciones: gradientes + grid CSS. */}
        <div className="section-cyber-grid" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-x-0 -top-44 z-[1] h-72 bg-gradient-to-b from-night via-[#060810]/94 to-[#060810]" aria-hidden="true" />
        <div className="relative z-10">
          {/* Las secciones del medio se renderizan de forma directa e independiente de WebGL. */}
          <BelowFoldSections />
        </div>
      </section>
      <Footer />
    </main>
  );
}
