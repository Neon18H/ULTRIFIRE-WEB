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
    <Reveal className={align === 'center' ? 'mx-auto mb-10 max-w-3xl text-center sm:mb-16' : 'mb-10 max-w-4xl sm:mb-16'}>
      <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#5B9BFF] sm:mb-5 sm:tracking-[0.28em]">{eyebrow}</p>
      <h2 className="text-3xl font-extralight leading-[1.08] tracking-[-0.02em] text-textfire sm:text-5xl lg:text-6xl">{title}</h2>
      <p className="mt-5 max-w-2xl text-base font-light leading-7 text-mutedfire sm:mt-6 sm:text-lg sm:leading-8">{description}</p>
    </Reveal>
  );
}
