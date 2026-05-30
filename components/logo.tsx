import { ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center gap-3', className)} aria-label="UltriFire">
      <div className="relative grid h-10 w-10 place-items-center rounded-xl border border-cyanfire/25 bg-cyanfire/10 shadow-glow">
        <ShieldCheck className="h-5 w-5 text-cyanfire" aria-hidden="true" />
        <span className="absolute inset-0 rounded-xl bg-cyanfire/20 blur-md" aria-hidden="true" />
      </div>
      <span className="font-display text-lg font-bold tracking-[0.18em] text-white">
        ULTRI<span className="logo-fire">FIRE</span>
      </span>
    </div>
  );
}
