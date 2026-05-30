import type { ReactNode } from 'react';
import { Reveal } from './motion-wrapper';

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  description: string;
  align?: 'left' | 'center';
};

export function SectionHeading({ eyebrow, title, description, align = 'left' }: SectionHeadingProps) {
  return (
    <Reveal className={align === 'center' ? 'mx-auto mb-16 max-w-3xl text-center' : 'mb-16 max-w-4xl'}>
      <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#5B9BFF]">{eyebrow}</p>
      <h2 className="text-4xl font-extralight leading-[1.04] tracking-[-0.02em] text-textfire sm:text-5xl lg:text-6xl">{title}</h2>
      <p className="mt-6 max-w-2xl text-base font-light leading-8 text-mutedfire sm:text-lg">{description}</p>
    </Reveal>
  );
}
