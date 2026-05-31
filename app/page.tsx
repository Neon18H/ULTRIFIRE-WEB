import dynamic from 'next/dynamic';
import { Footer } from '@/components/footer';
import { Hero } from '@/components/hero';
import { Navbar } from '@/components/navbar';

const BeamsBackground = dynamic(() => import('@/components/ui/beams-background').then((mod) => mod.BeamsBackground), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_24%,rgba(26,111,255,0.11),transparent_34rem),linear-gradient(180deg,#060810_0%,#060810_100%)]" />
});

const BelowFoldSections = dynamic(() => import('@/components/below-fold-sections').then((mod) => mod.BelowFoldSections), {
  loading: () => <div className="min-h-[40vh] bg-[#060810]" />
});

export default function Home() {
  return (
    <main className="relative overflow-hidden bg-night">
      <Navbar />
      <Hero />
      <section className="relative overflow-hidden bg-[#060810]" aria-label="Contenido UltriFire">
        <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
          <BeamsBackground intensity="subtle" />
        </div>
        <div className="pointer-events-none absolute inset-x-0 -top-44 z-[1] h-72 bg-gradient-to-b from-night via-[#060810]/94 to-[#060810]" aria-hidden="true" />
        <div className="relative z-10">
          <BelowFoldSections />
        </div>
      </section>
      <Footer />
    </main>
  );
}
