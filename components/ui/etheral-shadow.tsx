'use client';

import type { CSSProperties } from 'react';
import { useId, useMemo } from 'react';
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
  scale: 50,
  speed: 35
};

const DEFAULT_NOISE = {
  opacity: 0.2,
  scale: 1
};

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function mapRange(value: number, fromLow: number, fromHigh: number, toLow: number, toHigh: number) {
  if (fromLow === fromHigh) {
    return toLow;
  }

  const progress = (value - fromLow) / (fromHigh - fromLow);
  return toLow + progress * (toHigh - toLow);
}

// Fondo etéreo local: solo gradientes CSS y filtros SVG inline, sin imágenes externas.
export function EtheralShadow({
  color = 'rgba(26,111,255,0.35)',
  animation = DEFAULT_ANIMATION,
  noise = DEFAULT_NOISE,
  sizing = 'fill',
  className
}: EtheralShadowProps) {
  const reactId = useId();
  const safeId = useMemo(() => reactId.replace(/:/g, ''), [reactId]);

  const scale = clamp(animation.scale ?? DEFAULT_ANIMATION.scale, 0, 100);
  const speed = clamp(animation.speed ?? DEFAULT_ANIMATION.speed, 1, 100);
  const noiseOpacity = clamp(noise.opacity ?? DEFAULT_NOISE.opacity, 0, 1);
  const noiseScale = clamp(noise.scale ?? DEFAULT_NOISE.scale, 0.25, 3);

  const displacementScale = mapRange(scale, 0, 100, 12, 72);
  const blurAmount = mapRange(scale, 0, 100, 44, 74);
  const duration = `${mapRange(speed, 1, 100, 44, 14)}s`;
  const turbulenceLow = mapRange(scale, 0, 100, 0.004, 0.009).toFixed(4);
  const turbulenceHigh = mapRange(scale, 0, 100, 0.009, 0.018).toFixed(4);
  const noiseFrequency = (0.65 * noiseScale).toFixed(2);

  const cssVars = {
    '--etheral-color': color,
    '--etheral-duration': duration,
    '--etheral-breathe-duration': `${mapRange(speed, 1, 100, 64, 22)}s`,
    '--etheral-blur': `${blurAmount}px`
  } as CSSProperties;

  return (
    <div
      className={cn(
        'pointer-events-none absolute inset-0 isolate overflow-hidden bg-[#060810]',
        sizing === 'contain' ? 'min-h-[36rem]' : 'h-full w-full',
        className
      )}
      style={cssVars}
      aria-hidden="true"
    >
      <svg className="absolute h-0 w-0" focusable="false" role="presentation" aria-hidden="true">
        <defs>
          <filter id={`${safeId}-etheral-undulation`} x="-35%" y="-35%" width="170%" height="170%" colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency={`${turbulenceLow} ${turbulenceHigh}`} numOctaves="3" seed="18" result="undulation">
              <animate
                attributeName="baseFrequency"
                dur={duration}
                values={`${turbulenceLow} ${turbulenceHigh}; ${turbulenceHigh} ${turbulenceLow}; ${turbulenceLow} ${turbulenceHigh}`}
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap
              in="SourceGraphic"
              in2="undulation"
              scale={displacementScale}
              xChannelSelector="R"
              yChannelSelector="B"
              result="displaced"
            />
            <feGaussianBlur in="displaced" stdDeviation={blurAmount / 3} result="softened" />
            <feColorMatrix in="softened" type="saturate" values="1.16" />
          </filter>

          <filter id={`${safeId}-etheral-noise`} x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency={noiseFrequency} numOctaves="2" seed="27" stitchTiles="stitch" />
            <feColorMatrix type="matrix" values="0 0 0 0 0.45  0 0 0 0 0.58  0 0 0 0 1  0 0 0 0.26 0" />
          </filter>
        </defs>
      </svg>

      {/* Base oscura con halos muy tenues para integrarse con las secciones post-hero. */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(26,111,255,0.1),transparent_34rem),linear-gradient(180deg,#060810_0%,rgba(6,8,16,0.88)_45%,#060810_100%)]" />

      {/* Blobs suaves: la máscara está hecha con gradientes locales, nunca con imágenes remotas. */}
      <div
        className="absolute -inset-[18%] opacity-80 mix-blend-screen [animation:etheral-drift_var(--etheral-duration)_ease-in-out_infinite_alternate] motion-reduce:animate-none"
        style={{ filter: `url(#${safeId}-etheral-undulation) blur(var(--etheral-blur))` }}
      >
        <div
          className="h-full w-full bg-[radial-gradient(ellipse_at_24%_22%,var(--etheral-color)_0%,rgba(26,111,255,0.18)_24%,transparent_52%),radial-gradient(ellipse_at_76%_34%,rgba(31,133,255,0.26)_0%,rgba(26,111,255,0.12)_27%,transparent_55%),radial-gradient(ellipse_at_50%_76%,rgba(8,56,160,0.3)_0%,rgba(26,111,255,0.1)_30%,transparent_60%)] [mask-image:radial-gradient(ellipse_at_22%_20%,#000_0%,#000_28%,transparent_55%),radial-gradient(ellipse_at_74%_36%,#000_0%,#000_24%,transparent_52%),radial-gradient(ellipse_at_50%_72%,#000_0%,#000_24%,transparent_58%)] [mask-mode:alpha] [mask-repeat:no-repeat]"
          style={{
            WebkitMaskImage:
              'radial-gradient(ellipse at 22% 20%, #000 0%, #000 28%, transparent 55%), radial-gradient(ellipse at 74% 36%, #000 0%, #000 24%, transparent 52%), radial-gradient(ellipse at 50% 72%, #000 0%, #000 24%, transparent 58%)',
            WebkitMaskRepeat: 'no-repeat'
          }}
        />
      </div>

      {/* Segunda capa lenta para evitar apariencia plana o sólida. */}
      <div className="absolute -inset-x-[10%] top-[10%] h-[72%] rounded-[45%] bg-[radial-gradient(ellipse_at_42%_50%,rgba(26,111,255,0.16),transparent_58%)] opacity-70 blur-3xl mix-blend-screen [animation:etheral-breathe_var(--etheral-breathe-duration)_ease-in-out_infinite] motion-reduce:animate-none" />

      {noiseOpacity > 0 && (
        <svg className="absolute inset-0 h-full w-full mix-blend-soft-light" preserveAspectRatio="none" role="presentation" aria-hidden="true">
          <rect width="100%" height="100%" filter={`url(#${safeId}-etheral-noise)`} opacity={noiseOpacity} />
        </svg>
      )}

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,8,16,0.18)_0%,rgba(6,8,16,0.03)_38%,rgba(6,8,16,0.42)_100%)]" />
    </div>
  );
}

export { EtheralShadow as Component };
