import { Comparison } from '@/components/comparison';
import { Contact } from '@/components/contact';
import { HowItWorks } from '@/components/how-it-works';
import { Services } from '@/components/services';
import { Stats } from '@/components/stats';
import { WhyUltrifire } from '@/components/why-ultrifire';

export function BelowFoldSections() {
  return (
    <>
      <WhyUltrifire />
      <Stats />
      <Services />
      <HowItWorks />
      <Comparison />
      <Contact />
    </>
  );
}
