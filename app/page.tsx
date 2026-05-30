import { Comparison } from '@/components/comparison';
import { Contact } from '@/components/contact';
import { Footer } from '@/components/footer';
import { Hero } from '@/components/hero';
import { HowItWorks } from '@/components/how-it-works';
import { Navbar } from '@/components/navbar';
import { Services } from '@/components/services';
import { Stats } from '@/components/stats';
import { WhyUltrifire } from '@/components/why-ultrifire';

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      <Navbar />
      <Hero />
      <Stats />
      <WhyUltrifire />
      <Services />
      <HowItWorks />
      <Comparison />
      <Contact />
      <Footer />
    </main>
  );
}
