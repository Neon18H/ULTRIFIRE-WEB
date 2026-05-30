import { Reveal } from './motion-wrapper';

export function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <Reveal className="mx-auto mb-12 max-w-3xl text-center">
      <p className="mb-4 text-sm font-bold uppercase tracking-[0.35em] text-cyanfire">{eyebrow}</p>
      <h2 className="font-display text-4xl font-bold tracking-[-0.05em] text-white sm:text-5xl">{title}</h2>
      <p className="mt-5 text-lg leading-8 text-textfire/68">{description}</p>
    </Reveal>
  );
}
