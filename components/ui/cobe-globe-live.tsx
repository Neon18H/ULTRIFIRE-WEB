'use client';

import type { COBEOptions, Globe } from 'cobe';
import { useEffect, useMemo, useRef, useState, type PointerEvent } from 'react';

import { cn } from '@/lib/utils';

type Location = [number, number];

type GlobeLiveProps = {
  className?: string;
};

const COLOMBIA: Location = [4.71, -74.07];

const ATTACK_MARKERS: NonNullable<COBEOptions['markers']> = [
  // Destinos LATAM destacados.
  { location: COLOMBIA, size: 0.09, id: 'bogota' },
  { location: [19.43, -99.13], size: 0.06, id: 'mexico' },
  { location: [-23.55, -46.63], size: 0.06, id: 'brasil' },
  { location: [-12.05, -77.04], size: 0.045, id: 'peru' },
  { location: [-34.6, -58.38], size: 0.045, id: 'argentina' },
  { location: [-33.45, -70.66], size: 0.04, id: 'chile' },
  // Orígenes globales de ataques simulados.
  { location: [37.77, -122.42], size: 0.035, id: 'san-francisco' },
  { location: [40.71, -74.01], size: 0.035, id: 'new-york' },
  { location: [51.51, -0.13], size: 0.035, id: 'london' },
  { location: [52.52, 13.4], size: 0.03, id: 'berlin' },
  { location: [55.75, 37.62], size: 0.035, id: 'moscow' },
  { location: [25.2, 55.27], size: 0.03, id: 'dubai' },
  { location: [28.61, 77.2], size: 0.035, id: 'delhi' },
  { location: [35.68, 139.69], size: 0.035, id: 'tokyo' },
  { location: [1.35, 103.82], size: 0.03, id: 'singapore' }
];

const ATTACK_ARCS: NonNullable<COBEOptions['arcs']> = [
  { from: [37.77, -122.42], to: COLOMBIA, id: 'sf-bogota' },
  { from: [40.71, -74.01], to: COLOMBIA, id: 'ny-bogota' },
  { from: [51.51, -0.13], to: COLOMBIA, id: 'london-bogota' },
  { from: [52.52, 13.4], to: COLOMBIA, id: 'berlin-bogota' },
  { from: [55.75, 37.62], to: COLOMBIA, id: 'moscow-bogota' },
  { from: [28.61, 77.2], to: COLOMBIA, id: 'delhi-bogota' },
  { from: [35.68, 139.69], to: COLOMBIA, id: 'tokyo-bogota' },
  { from: [1.35, 103.82], to: COLOMBIA, id: 'singapore-bogota' },
  { from: [25.2, 55.27], to: [19.43, -99.13], id: 'dubai-mexico' },
  { from: [52.52, 13.4], to: [-23.55, -46.63], id: 'berlin-brasil' }
];

function supportsWebGL() {
  if (typeof document === 'undefined') {
    return false;
  }

  try {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('webgl2') || canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    return Boolean(context);
  } catch {
    return false;
  }
}

function shouldUseStaticGlobe() {
  if (typeof window === 'undefined') {
    return true;
  }

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isNarrowViewport = window.matchMedia('(max-width: 767px)').matches;
  const userAgent = navigator.userAgent || '';
  const isMobileUserAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
  const hardwareConcurrency = navigator.hardwareConcurrency ?? 0;
  const isLowConcurrencyDevice = hardwareConcurrency > 0 && hardwareConcurrency <= 4;
  const deviceMemory = Number((navigator as Navigator & { deviceMemory?: number }).deviceMemory);
  const isLowMemoryDevice = Number.isFinite(deviceMemory) && deviceMemory <= 2;

  return reducedMotion || isNarrowViewport || isMobileUserAgent || isLowConcurrencyDevice || isLowMemoryDevice || !supportsWebGL();
}

export function GlobeLive({ className }: GlobeLiveProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerRef = useRef<number | null>(null);
  const phiRef = useRef(-0.85);
  const pointerVelocityRef = useRef(0);
  const visibleRef = useRef(false);
  const reducedMotionRef = useRef(true);
  const [size, setSize] = useState(320);
  const [canRenderGlobe, setCanRenderGlobe] = useState<boolean | null>(null);

  const liveAttackCount = useMemo(() => '48.7K', []);

  useEffect(() => {
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mobileQuery = window.matchMedia('(max-width: 767px)');

    const updateMode = () => {
      reducedMotionRef.current = shouldUseStaticGlobe();
      setCanRenderGlobe(supportsWebGL() && !reducedMotionRef.current);
    };

    updateMode();
    window.addEventListener('resize', updateMode, { passive: true });
    reducedMotionQuery.addEventListener('change', updateMode);
    mobileQuery.addEventListener('change', updateMode);

    return () => {
      window.removeEventListener('resize', updateMode);
      reducedMotionQuery.removeEventListener('change', updateMode);
      mobileQuery.removeEventListener('change', updateMode);
    };
  }, []);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) {
      return undefined;
    }

    if (!('ResizeObserver' in window)) {
      setSize(Math.max(220, Math.min(wrapper.clientWidth, 520)));
      return undefined;
    }

    const resizeObserver = new ResizeObserver(([entry]) => {
      const nextSize = Math.max(220, Math.min(entry.contentRect.width, 520));
      setSize(Math.round(nextSize));
    });

    resizeObserver.observe(wrapper);

    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) {
      return undefined;
    }

    if (!('IntersectionObserver' in window)) {
      visibleRef.current = true;
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.22 }
    );

    observer.observe(wrapper);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || canRenderGlobe !== true) {
      return undefined;
    }

    let disposed = false;
    let animationFrame = 0;
    let globe: Globe | null = null;
    let currentPhi = phiRef.current;

    const initGlobe = async () => {
      try {
        if (shouldUseStaticGlobe()) {
          setCanRenderGlobe(false);
          return;
        }

        const { default: createGlobe } = await import('cobe');

        if (disposed) {
          return;
        }

        const devicePixelRatio = Math.min(window.devicePixelRatio || 1, 2);
        const pixelSize = size * devicePixelRatio;

        // Comentario en español: cobe/WebGL solo se inicializa en desktop con WebGL real.
        // En móvil se mantiene el placeholder para evitar crashes y ahorrar batería.
        globe = createGlobe(canvas, {
          devicePixelRatio,
          width: pixelSize,
          height: pixelSize,
          phi: currentPhi,
          theta: 0.25,
          dark: 1,
          diffuse: 1.45,
          scale: 1,
          mapSamples: 18000,
          mapBrightness: 6,
          mapBaseBrightness: 0.02,
          baseColor: [0.1, 0.15, 0.25],
          markerColor: [1, 0.35, 0.12],
          glowColor: [0.1, 0.25, 0.45],
          opacity: 0.96,
          offset: [0, 0],
          markerElevation: 0.02,
          markers: ATTACK_MARKERS,
          arcs: ATTACK_ARCS,
          arcColor: [1, 0.22, 0.08],
          arcWidth: 0.7,
          arcHeight: 0.32
        });

        const render = () => {
          if (!globe || disposed) {
            return;
          }

          const isAutoRotating = visibleRef.current && !reducedMotionRef.current && pointerRef.current === null;

          if (isAutoRotating) {
            currentPhi += 0.0032;
          }

          currentPhi += pointerVelocityRef.current;
          pointerVelocityRef.current *= 0.92;
          phiRef.current = currentPhi;
          globe.update({ phi: currentPhi, width: pixelSize, height: pixelSize });
          animationFrame = window.requestAnimationFrame(render);
        };

        render();
      } catch (error) {
        // Comentario en español: si cobe lanza cualquier excepción, no propagamos el error.
        // El fallback conserva la sección Stats visible y protege el resto de la landing.
        if (process.env.NODE_ENV !== 'production') {
          console.error('[GlobeLive] WebGL desactivado por error:', error);
        }
        setCanRenderGlobe(false);
      }
    };

    void initGlobe();

    return () => {
      disposed = true;
      window.cancelAnimationFrame(animationFrame);
      globe?.destroy();
      globe = null;
    };
  }, [canRenderGlobe, size]);

  function handlePointerDown(event: PointerEvent<HTMLCanvasElement>) {
    pointerRef.current = event.clientX;
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event: PointerEvent<HTMLCanvasElement>) {
    if (pointerRef.current === null) {
      return;
    }

    const delta = event.clientX - pointerRef.current;
    pointerVelocityRef.current = delta / 220;
    pointerRef.current = event.clientX;
  }

  function handlePointerUp(event: PointerEvent<HTMLCanvasElement>) {
    pointerRef.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }

  return (
    <div ref={wrapperRef} className={cn('relative mx-auto aspect-square w-full max-w-[min(520px,86vw)]', className)}>
      <div className="absolute inset-6 rounded-full bg-[#1A6FFF]/15 blur-3xl" aria-hidden="true" />
      <div className="absolute inset-12 rounded-full border border-[#00B4FF]/15 bg-[#060810]/40 shadow-[0_0_80px_rgba(26,111,255,0.22)]" aria-hidden="true" />

      {canRenderGlobe === true ? (
        <canvas
          ref={canvasRef}
          aria-label="Globo interactivo de ataques globales hacia Colombia y LATAM"
          className="relative z-10 h-full w-full cursor-grab select-none touch-none active:cursor-grabbing"
          style={{ width: size, height: size, maxWidth: '100%' }}
          width={size * 2}
          height={size * 2}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        />
      ) : (
        <div className="relative z-10 grid h-full w-full place-items-center rounded-full border border-[#1A2333] bg-[#0A0E16] text-center shadow-[0_0_80px_rgba(26,111,255,0.18)]">
          <div className="px-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#00B4FF]">Modo seguro</p>
            <p className="mt-3 text-sm leading-6 text-[#8B9CB3]">Visualización WebGL no disponible. Monitoreo global activo.</p>
          </div>
        </div>
      )}

      <div className="pointer-events-none absolute left-3 top-5 z-20 rounded-full border border-[#FF5A1F]/30 bg-[#060810]/80 px-3 py-1.5 shadow-[0_0_30px_rgba(255,90,31,0.18)] backdrop-blur-md sm:left-5 sm:top-8 sm:px-4 sm:py-2">
        <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#FF5A1F] sm:text-[10px] sm:tracking-[0.28em]">En vivo</p>
      </div>
      <div className="pointer-events-none absolute bottom-5 right-3 z-20 rounded-full border border-[#00B4FF]/25 bg-[#060810]/80 px-3 py-1.5 text-right shadow-[0_0_30px_rgba(0,180,255,0.14)] backdrop-blur-md sm:bottom-8 sm:right-5 sm:px-4 sm:py-2">
        <p className="text-xs font-semibold text-[#F0F4FA]">{liveAttackCount}</p>
        <p className="text-[10px] uppercase tracking-[0.24em] text-[#8B9CB3]">ataques</p>
      </div>
    </div>
  );
}
