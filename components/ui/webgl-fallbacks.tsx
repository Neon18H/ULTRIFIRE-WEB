import { cn } from '@/lib/utils';

type WebGLFallbackProps = {
  className?: string;
};

export function CyberFallbackBackground() {
  return (
    <div className="hero-static-bg absolute inset-0 h-full w-full overflow-hidden" aria-hidden="true">
      <div className="hero-cyber-grid" />
    </div>
  );
}

export function GlobeLiveFallback({ className }: WebGLFallbackProps) {
  return (
    <div className={cn('relative mx-auto aspect-square w-full max-w-[min(520px,86vw)]', className)}>
      <div className="absolute inset-6 rounded-full bg-[#1A6FFF]/15 blur-3xl" aria-hidden="true" />
      <div className="absolute inset-12 rounded-full border border-[#00B4FF]/15 bg-[#060810]/40 shadow-[0_0_80px_rgba(26,111,255,0.22)]" aria-hidden="true" />
      <div className="relative z-10 grid h-full w-full place-items-center rounded-full border border-[#1A2333] bg-[#0A0E16] text-center shadow-[0_0_80px_rgba(26,111,255,0.18)]">
        <div className="px-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#00B4FF]">Modo seguro</p>
          <p className="mt-3 text-sm leading-6 text-[#8B9CB3]">Visualización WebGL no disponible. Monitoreo global activo.</p>
        </div>
      </div>
      <div className="pointer-events-none absolute left-3 top-5 z-20 rounded-full border border-[#FF5A1F]/30 bg-[#060810]/80 px-3 py-1.5 shadow-[0_0_30px_rgba(255,90,31,0.18)] backdrop-blur-md sm:left-5 sm:top-8 sm:px-4 sm:py-2">
        <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#FF5A1F] sm:text-[10px] sm:tracking-[0.28em]">En vivo</p>
      </div>
      <div className="pointer-events-none absolute bottom-5 right-3 z-20 rounded-full border border-[#00B4FF]/25 bg-[#060810]/80 px-3 py-1.5 text-right shadow-[0_0_30px_rgba(0,180,255,0.14)] backdrop-blur-md sm:bottom-8 sm:right-5 sm:px-4 sm:py-2">
        <p className="text-xs font-semibold text-[#F0F4FA]">48.7K</p>
        <p className="text-[10px] uppercase tracking-[0.24em] text-[#8B9CB3]">ataques</p>
      </div>
    </div>
  );
}
