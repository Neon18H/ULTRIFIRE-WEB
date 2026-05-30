import Image from 'next/image';
import { cn } from '@/lib/utils';

const ULTRIFIRE_LOGO = '/images/logo.png';

type LogoProps = {
  className?: string;
  imageClassName?: string;
  textClassName?: string;
  imageSize?: number;
  hideText?: boolean;
};

export function Logo({ className, imageClassName, textClassName, imageSize = 32, hideText = false }: LogoProps) {
  return (
    <div className={cn('flex items-center gap-3', className)} aria-label="UltriFire">
      <span className={cn('relative flex shrink-0 items-center justify-center overflow-hidden rounded-md', imageClassName)} style={{ height: imageSize, width: imageSize }}>
        <Image src={ULTRIFIRE_LOGO} alt="Logo UltriFire" width={1024} height={1024} sizes="32px" className="h-full w-full object-contain" priority />
      </span>
      {!hideText ? (
        <span className={cn('text-sm font-semibold uppercase tracking-[0.22em] text-textfire', textClassName)}>
          Ultri<span className="text-orangefire">Fire</span>
        </span>
      ) : null}
    </div>
  );
}
