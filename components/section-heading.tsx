import { Reveal } from './motion-wrapper';

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
  align?: 'left' | 'center';
};

export function SectionHeading({ eyebrow, title, description, align = 'left' }: SectionHeadingProps) {
  return (
    <Reveal className={align === 'center' ? 'mx-auto mb-16 max-w-3xl text-center' : 'mb-16 max-w-4xl'}>
      <p className="mb-5 text-xs font-semibold uppercase tracking-[0.34em] text-bluefire">{eyebrow}</p>
      <h2 className="text-4xl font-semibold leading-[1.02] tracking-[-0.055em] text-textfire sm:text-5xl lg:text-6xl">{title}</h2>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-mutedfire">{description}</p>
    </Reveal>
  );
}
