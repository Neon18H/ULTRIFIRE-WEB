import { Comparison } from '@/components/comparison';
import { Contact } from '@/components/contact';
import { Footer } from '@/components/footer';
import { Hero } from '@/components/hero';
import { HowItWorks } from '@/components/how-it-works';
import { Navbar } from '@/components/navbar';
import { EtheralShadow } from '@/components/ui/etheral-shadow';
import { Services } from '@/components/services';
import { Stats } from '@/components/stats';
import { WhyUltrifire } from '@/components/why-ultrifire';

export default function Home() {
  return (
    <main className="relative overflow-hidden bg-night">
      <Navbar />
      <Hero />
      <section className="relative overflow-hidden bg-[#060810]" aria-label="Contenido UltriFire">
        <div className="pointer-events-none absolute inset-0 z-0 bg-[#060810]" aria-hidden="true">
          <EtheralShadow
            color="rgba(26,111,255,0.6)"
            animation={{ scale: 60, speed: 40 }}
            noise={{ opacity: 0.3, scale: 1 }}
            sizing="fill"
          />
        </div>
        <div className="pointer-events-none absolute inset-x-0 -top-40 z-[1] h-56 bg-gradient-to-b from-transparent via-[#060810]/82 to-[#060810]" aria-hidden="true" />
        <div className="relative z-10">
          <WhyUltrifire />
          <Stats />
          <Services />
          <HowItWorks />
          <Comparison />
          <Contact />
        </div>
      </section>
      <Footer />
    </main>
  );
}
