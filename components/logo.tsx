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

export function Logo({ className, imageClassName, textClassName, imageSize = 44, hideText = false }: LogoProps) {
  return (
    <div className={cn('flex items-center gap-3', className)} aria-label="UltriFire">
      <span
        className={cn(
          'relative flex shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-[#02040A]/70 shadow-[0_0_24px_rgba(0,180,255,0.22)] ring-1 ring-cyanfire/10 backdrop-blur-md',
          imageClassName
        )}
        style={{ height: imageSize, width: imageSize }}
      >
        <Image
          src={ULTRIFIRE_LOGO}
          alt="Logo UltriFire"
          width={1024}
          height={1024}
          sizes="(max-width: 640px) 36px, 44px"
          className="h-full w-full object-contain mix-blend-screen drop-shadow-[0_0_18px_rgba(0,180,255,0.36)]"
        />
      </span>
      {!hideText ? (
        <span className={cn('font-display text-lg font-bold tracking-[0.18em] text-white', textClassName)}>
          ULTRI<span className="logo-fire">FIRE</span>
        </span>
      ) : null}
    </div>
  );
}
