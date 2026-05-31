'use client';

import { memo, useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Beam = {
  x: number;
  y: number;
  width: number;
  length: number;
  angle: number;
  speed: number;
  alpha: number;
  hue: number;
  life: number;
  maxLife: number;
  warm: boolean;
};

type BeamsBackgroundProps = {
  intensity?: 'subtle' | 'medium' | 'strong';
  className?: string;
  children?: ReactNode;
};

const TARGET_FPS = 30;
const FRAME_INTERVAL = 1000 / TARGET_FPS;

const INTENSITY_CONFIG = {
  subtle: { desktop: 12, alpha: 0.36, cssBlur: 8, glow: 3 },
  medium: { desktop: 14, alpha: 0.48, cssBlur: 10, glow: 4 },
  strong: { desktop: 18, alpha: 0.62, cssBlur: 12, glow: 5 }
} as const;

const BRAND_BACKGROUND = '#060810';

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function getBeamHue(warm: boolean) {
  // Azul UltriFire dominante (#1A6FFF ≈ hue 218) con acento fuego ocasional y discreto.
  return warm ? randomBetween(20, 30) : 205 + Math.random() * 30;
}

function shouldUseStaticBackground() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobileViewport = window.innerWidth < 768;
  const isLowCoreDevice = typeof navigator.hardwareConcurrency === 'number' && navigator.hardwareConcurrency <= 4;

  return prefersReducedMotion || isMobileViewport || isLowCoreDevice;
}

function createBeam(width: number, height: number, intensityAlpha: number): Beam {
  const warm = Math.random() < 1 / 7;

  return {
    x: randomBetween(-width * 0.2, width * 1.2),
    y: randomBetween(-height * 0.35, height * 1.15),
    width: randomBetween(1, warm ? 1.8 : 2.8),
    length: randomBetween(height * 0.18, height * 0.54),
    angle: randomBetween(-24, -12) * (Math.PI / 180),
    speed: randomBetween(0.14, 0.5),
    alpha: randomBetween(0.07, warm ? 0.13 : 0.22) * intensityAlpha,
    hue: getBeamHue(warm),
    life: randomBetween(0, 1),
    maxLife: randomBetween(240, 560),
    warm
  };
}

function resetBeam(beam: Beam, width: number, height: number, intensityAlpha: number) {
  const warm = Math.random() < 1 / 7;
  beam.x = randomBetween(-width * 0.1, width * 1.15);
  beam.y = randomBetween(-height * 0.4, -height * 0.02);
  beam.width = randomBetween(1, warm ? 1.8 : 2.8);
  beam.length = randomBetween(height * 0.18, height * 0.54);
  beam.angle = randomBetween(-24, -12) * (Math.PI / 180);
  beam.speed = randomBetween(0.14, 0.5);
  beam.alpha = randomBetween(0.07, warm ? 0.13 : 0.22) * intensityAlpha;
  beam.hue = getBeamHue(warm);
  beam.life = 0;
  beam.maxLife = randomBetween(240, 560);
  beam.warm = warm;
}

function BeamsBackgroundComponent({ intensity = 'subtle', className, children }: BeamsBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const beamsRef = useRef<Beam[]>([]);
  const isVisibleRef = useRef(false);
  const isTabActiveRef = useRef(true);
  const lastFrameTimeRef = useRef(0);
  const [hasCanvasFallback, setHasCanvasFallback] = useState(false);
  const config = INTENSITY_CONFIG[intensity];

  const stopAnimation = useCallback(() => {
    if (animationRef.current !== null) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
  }, []);

  const drawFrame = useCallback(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');

    if (!canvas || !context) {
      setHasCanvasFallback(true);
      return;
    }

    const { width, height } = canvas;
    context.clearRect(0, 0, width, height);
    context.fillStyle = BRAND_BACKGROUND;
    context.fillRect(0, 0, width, height);
    context.globalCompositeOperation = 'lighter';

    for (const beam of beamsRef.current) {
      const fadeIn = Math.min(beam.life / 90, 1);
      const fadeOut = Math.max(1 - beam.life / beam.maxLife, 0);
      const alpha = beam.alpha * fadeIn * fadeOut;
      context.save();
      context.translate(beam.x, beam.y);
      context.rotate(beam.angle);

      const gradient = context.createLinearGradient(0, 0, 0, beam.length);
      gradient.addColorStop(0, `hsla(${beam.hue}, 96%, ${beam.warm ? 58 : 62}%, 0)`);
      gradient.addColorStop(0.35, `hsla(${beam.hue}, 96%, ${beam.warm ? 58 : 62}%, ${alpha})`);
      gradient.addColorStop(1, `hsla(${beam.hue}, 96%, ${beam.warm ? 58 : 62}%, 0)`);
      context.shadowColor = `hsla(${beam.hue}, 96%, ${beam.warm ? 56 : 58}%, ${alpha})`;
      context.shadowBlur = config.glow;
      context.fillStyle = gradient;
      context.fillRect(-beam.width / 2, 0, beam.width, beam.length);
      context.restore();

      beam.x += Math.sin(beam.angle) * beam.speed * 1.5;
      beam.y += Math.cos(beam.angle) * beam.speed;
      beam.life += 1;

      if (beam.y - beam.length > height * 1.08 || beam.life > beam.maxLife) {
        resetBeam(beam, width, height, config.alpha);
      }
    }

    context.globalCompositeOperation = 'source-over';
  }, [config.alpha, config.glow]);

  const tick = useCallback((now: number) => {
    if (!isVisibleRef.current || !isTabActiveRef.current || hasCanvasFallback) {
      stopAnimation();
      return;
    }

    if (now - lastFrameTimeRef.current >= FRAME_INTERVAL) {
      lastFrameTimeRef.current = now - ((now - lastFrameTimeRef.current) % FRAME_INTERVAL);
      drawFrame();
    }

    animationRef.current = requestAnimationFrame(tick);
  }, [drawFrame, hasCanvasFallback, stopAnimation]);

  const startAnimation = useCallback(() => {
    if (animationRef.current === null && isVisibleRef.current && isTabActiveRef.current && !hasCanvasFallback) {
      lastFrameTimeRef.current = performance.now();
      animationRef.current = requestAnimationFrame(tick);
    }
  }, [hasCanvasFallback, tick]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;

    if (!canvas || !container || hasCanvasFallback) return;

    if (shouldUseStaticBackground()) {
      setHasCanvasFallback(true);
      return;
    }

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.35);
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      // Ajusta config.desktop/cssBlur para subir o bajar calidad: menos beams = menos GPU/CPU.
      beamsRef.current = Array.from({ length: config.desktop }, () => createBeam(canvas.width, canvas.height, config.alpha));
      drawFrame();
    };

    try {
      resize();
    } catch (error) {
      console.error('No se pudo inicializar BeamsBackground:', error);
      setHasCanvasFallback(true);
      return;
    }

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      // Los beams se pausan fuera de vista para no competir con el shader del hero.
      isVisibleRef.current = entry.isIntersecting;
      if (entry.isIntersecting) {
        startAnimation();
      } else {
        stopAnimation();
      }
    }, { rootMargin: '120px 0px', threshold: 0.01 });
    intersectionObserver.observe(container);

    const onVisibilityChange = () => {
      isTabActiveRef.current = !document.hidden;
      if (document.hidden) {
        stopAnimation();
      } else {
        startAnimation();
      }
    };

    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener('visibilitychange', onVisibilityChange);
      stopAnimation();
    };
  }, [config.alpha, config.desktop, drawFrame, hasCanvasFallback, startAnimation, stopAnimation]);

  return (
    <div ref={containerRef} className={cn('pointer-events-none absolute inset-0 isolate overflow-hidden bg-[#060810]', className)} aria-hidden={!children}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(26,111,255,0.12),transparent_30rem),radial-gradient(circle_at_88%_18%,rgba(255,90,31,0.055),transparent_24rem),linear-gradient(180deg,#060810_0%,#060810_48%,#060810_100%)]" />
      {hasCanvasFallback ? (
        <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(26,111,255,0.08),transparent_34%,rgba(255,90,31,0.04)_62%,transparent),radial-gradient(circle_at_50%_24%,rgba(26,111,255,0.11),transparent_34rem)]" />
      ) : (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full opacity-75"
          style={{ filter: `blur(${config.cssBlur}px)` }}
        />
      )}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,transparent_0%,rgba(6,8,16,0.42)_58%,#060810_100%)]" />
      <div className="absolute inset-0 bg-[#060810]/5" />
      <div className="absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-[#060810] via-[#060810]/85 to-transparent" />
      {children ? <div className="relative z-10">{children}</div> : null}
    </div>
  );
}

export const BeamsBackground = memo(BeamsBackgroundComponent);
