'use client';

import { animate, useMotionValue, type AnimationPlaybackControls } from 'framer-motion';
import { useEffect, useId, useMemo, useState } from 'react';
import { cn } from '@/lib/utils';

type EtheralShadowProps = {
  color?: string;
  animation?: {
    scale?: number;
    speed?: number;
  };
  noise?: {
    opacity?: number;
    scale?: number;
  };
  sizing?: 'fill' | 'contain';
  className?: string;
};

const DEFAULT_ANIMATION = {
  scale: 60,
  speed: 40
};

const DEFAULT_NOISE = {
  opacity: 0.3,
  scale: 1
};

// Fondo animado con filtros SVG: una sola capa decorativa, sin texto ni interacción.
export function EtheralShadow({
  color = 'rgba(128,128,128,1)',
  animation = DEFAULT_ANIMATION,
  noise = DEFAULT_NOISE,
  sizing = 'fill',
  className
}: EtheralShadowProps) {
  const reactId = useId();
  const safeId = useMemo(() => reactId.replace(/:/g, ''), [reactId]);
  const turbulence = useMotionValue(0.008);
  const [baseFrequency, setBaseFrequency] = useState('0.008 0.014');
  const [isMobile, setIsMobile] = useState(false);

  const scale = animation.scale ?? DEFAULT_ANIMATION.scale;
  const speed = animation.speed ?? DEFAULT_ANIMATION.speed;
  const noiseOpacity = noise.opacity ?? DEFAULT_NOISE.opacity;
  const noiseScale = noise.scale ?? DEFAULT_NOISE.scale;
  const responsiveScale = isMobile ? Math.max(scale * 0.68, 28) : scale;
  const responsiveSpeed = isMobile ? speed * 1.35 : speed;

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    const syncViewport = () => setIsMobile(mediaQuery.matches);

    syncViewport();
    mediaQuery.addEventListener('change', syncViewport);

    return () => mediaQuery.removeEventListener('change', syncViewport);
  }, []);

  useEffect(() => {
    const unsubscribe = turbulence.on('change', (latest) => {
      setBaseFrequency(`${latest.toFixed(4)} ${(latest * 1.7).toFixed(4)}`);
    });

    const controls: AnimationPlaybackControls = animate(turbulence, [0.006, 0.016, 0.009], {
      duration: responsiveSpeed,
      ease: 'easeInOut',
      repeat: Infinity,
      repeatType: 'mirror'
    });

    return () => {
      unsubscribe();
      controls.stop();
    };
  }, [responsiveSpeed, turbulence]);

  return (
    <div
      className={cn(
        'pointer-events-none absolute inset-0 overflow-hidden bg-[#060810]',
        sizing === 'contain' ? 'min-h-[36rem]' : 'h-full w-full',
        className
      )}
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_12%,rgba(26,111,255,0.14),transparent_26rem),radial-gradient(circle_at_78%_34%,rgba(20,60,140,0.18),transparent_31rem),linear-gradient(180deg,#060810_0%,rgba(6,8,16,0.92)_46%,#060810_100%)]" />
      <svg className="absolute inset-0 h-full w-full opacity-75 mix-blend-screen" preserveAspectRatio="none" role="presentation">
        <defs>
          <filter id={`${safeId}-etheral-displace`} x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency={baseFrequency} numOctaves="3" seed="12" result="turbulence" />
            <feDisplacementMap in="SourceGraphic" in2="turbulence" scale={responsiveScale} xChannelSelector="R" yChannelSelector="B" result="displaced" />
            <feGaussianBlur in="displaced" stdDeviation="34" result="blurred" />
            <feColorMatrix in="blurred" type="saturate" values="1.18" />
          </filter>
          <filter id={`${safeId}-etheral-noise`} x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency={0.72 * noiseScale} numOctaves="2" stitchTiles="stitch" seed="24" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <radialGradient id={`${safeId}-etheral-glow-a`} cx="30%" cy="18%" r="62%">
            <stop offset="0%" stopColor={color} stopOpacity="0.82" />
            <stop offset="44%" stopColor={color} stopOpacity="0.3" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </radialGradient>
          <radialGradient id={`${safeId}-etheral-glow-b`} cx="78%" cy="58%" r="58%">
            <stop offset="0%" stopColor="rgba(20,60,140,0.62)" />
            <stop offset="52%" stopColor="rgba(26,111,255,0.22)" />
            <stop offset="100%" stopColor="rgba(26,111,255,0)" />
          </radialGradient>
        </defs>

        <g filter={`url(#${safeId}-etheral-displace)`}>
          <rect width="100%" height="100%" fill={`url(#${safeId}-etheral-glow-a)`} opacity="0.42" />
          <rect width="100%" height="100%" fill={`url(#${safeId}-etheral-glow-b)`} opacity="0.5" />
        </g>
        <rect width="100%" height="100%" filter={`url(#${safeId}-etheral-noise)`} opacity={noiseOpacity} className="mix-blend-soft-light" />
      </svg>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,8,16,0.22)_0%,rgba(6,8,16,0.05)_24%,rgba(6,8,16,0.34)_100%)]" />
    </div>
  );
}
