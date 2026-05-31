'use client';

import { motion } from 'framer-motion';
import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
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

const INTENSITY_CONFIG = {
  subtle: { min: 10, desktop: 18, alpha: 0.42, blur: 14 },
  medium: { min: 16, desktop: 28, alpha: 0.58, blur: 18 },
  strong: { min: 24, desktop: 42, alpha: 0.78, blur: 22 }
} as const;

const BRAND_BACKGROUND = '#060810';

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function getBeamHue(warm: boolean) {
  // Azul UltriFire dominante (#1A6FFF ≈ hue 218) con acento fuego ocasional y discreto.
  return warm ? randomBetween(20, 30) : 205 + Math.random() * 30;
}

function createBeam(width: number, height: number, intensityAlpha: number): Beam {
  const warm = Math.random() < 1 / 6;

  return {
    x: randomBetween(-width * 0.2, width * 1.2),
    y: randomBetween(-height * 0.35, height * 1.15),
    width: randomBetween(1.1, warm ? 2.2 : 3.4),
    length: randomBetween(height * 0.18, height * 0.56),
    angle: randomBetween(-24, -12) * (Math.PI / 180),
    speed: randomBetween(0.18, 0.62),
    alpha: randomBetween(0.08, warm ? 0.16 : 0.28) * intensityAlpha,
    hue: getBeamHue(warm),
    life: randomBetween(0, 1),
    maxLife: randomBetween(220, 520),
    warm
  };
}

function resetBeam(beam: Beam, width: number, height: number, intensityAlpha: number) {
  const warm = Math.random() < 1 / 6;
  beam.x = randomBetween(-width * 0.1, width * 1.15);
  beam.y = randomBetween(-height * 0.4, -height * 0.02);
  beam.width = randomBetween(1.1, warm ? 2.2 : 3.4);
  beam.length = randomBetween(height * 0.18, height * 0.56);
  beam.angle = randomBetween(-24, -12) * (Math.PI / 180);
  beam.speed = randomBetween(0.18, 0.62);
  beam.alpha = randomBetween(0.08, warm ? 0.16 : 0.28) * intensityAlpha;
  beam.hue = getBeamHue(warm);
  beam.life = 0;
  beam.maxLife = randomBetween(220, 520);
  beam.warm = warm;
}

export function BeamsBackground({ intensity = 'subtle', className, children }: BeamsBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const beamsRef = useRef<Beam[]>([]);
  const isVisibleRef = useRef(true);
  const [hasCanvasFallback, setHasCanvasFallback] = useState(false);
  const config = INTENSITY_CONFIG[intensity];

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const context = canvas?.getContext('2d');

    if (!canvas || !container || !context) {
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
      context.shadowBlur = config.blur;
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
    animationRef.current = requestAnimationFrame(draw);
  }, [config.alpha, config.blur]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;

    if (!canvas || !container || hasCanvasFallback) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;
    const beamCount = isMobile ? config.min : config.desktop;

    if (prefersReducedMotion) {
      setHasCanvasFallback(true);
      return;
    }

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.25 : 1.6);
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      beamsRef.current = Array.from({ length: beamCount }, () => createBeam(canvas.width, canvas.height, config.alpha));
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
      isVisibleRef.current = entry.isIntersecting;
      if (entry.isIntersecting && animationRef.current === null && !hasCanvasFallback) {
        animationRef.current = requestAnimationFrame(draw);
      }
      if (!entry.isIntersecting && animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    });
    intersectionObserver.observe(container);

    if (isVisibleRef.current) {
      animationRef.current = requestAnimationFrame(draw);
    }

    return () => {
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
  }, [config.alpha, config.desktop, config.min, draw, hasCanvasFallback]);

  return (
    <div ref={containerRef} className={cn('pointer-events-none absolute inset-0 isolate overflow-hidden bg-[#060810]', className)} aria-hidden={!children}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(26,111,255,0.12),transparent_30rem),radial-gradient(circle_at_88%_18%,rgba(255,90,31,0.055),transparent_24rem),linear-gradient(180deg,#060810_0%,#060810_48%,#060810_100%)]" />
      {hasCanvasFallback ? (
        <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(26,111,255,0.08),transparent_34%,rgba(255,90,31,0.04)_62%,transparent),radial-gradient(circle_at_50%_24%,rgba(26,111,255,0.11),transparent_34rem)]" />
      ) : (
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-80" />
      )}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,transparent_0%,rgba(6,8,16,0.42)_58%,#060810_100%)]" />
      <div className="absolute inset-0 bg-[#060810]/5" />
      <motion.div
        className="absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-[#060810] via-[#060810]/80 to-transparent"
        initial={{ opacity: 0.72 }}
        animate={{ opacity: [0.72, 0.9, 0.72] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      {children ? <div className="relative z-10">{children}</div> : null}
    </div>
  );
}
