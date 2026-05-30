import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center gap-3', className)} aria-label="UltriFire">
      <svg className="h-11 w-11 drop-shadow-[0_0_22px_rgba(0,180,255,0.45)]" viewBox="0 0 64 64" role="img" aria-label="Logo UltriFire">
        <defs>
          <linearGradient id="uf-tech" x1="9" x2="32" y1="8" y2="56" gradientUnits="userSpaceOnUse">
            <stop stopColor="#1A6FFF" />
            <stop offset="1" stopColor="#00B4FF" />
          </linearGradient>
          <linearGradient id="uf-fire" x1="32" x2="55" y1="8" y2="56" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FF6B00" />
            <stop offset="1" stopColor="#FF3B1D" />
          </linearGradient>
          <linearGradient id="uf-metal" x1="21" x2="43" y1="18" y2="48" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F8FBFF" />
            <stop offset="0.46" stopColor="#7D8AA8" />
            <stop offset="1" stopColor="#DCE8FF" />
          </linearGradient>
        </defs>
        <rect width="64" height="64" rx="17" fill="#02040A" />
        <path d="M14 10h13v29c0 4 2 7 5 7V58C21 56 14 48 14 38V10Z" fill="url(#uf-tech)" />
        <path d="M37 10h13v28c0 10-7 18-18 20V46c3 0 5-3 5-7V10Z" fill="url(#uf-fire)" />
        <path d="M20 14h7M18 24h9M18 34h9" stroke="#9EEBFF" strokeLinecap="round" strokeOpacity="0.75" strokeWidth="1.6" />
        <circle cx="19" cy="14" r="1.8" fill="#B6F4FF" />
        <circle cx="24" cy="24" r="1.8" fill="#B6F4FF" />
        <circle cx="21" cy="34" r="1.8" fill="#B6F4FF" />
        <path d="M45 16c4 6 5 10 1 15M42 31c5 5 4 12-3 15" stroke="#FFB000" strokeLinecap="round" strokeOpacity="0.7" strokeWidth="1.8" />
        <path d="M32 18l12 5v10c0 8-5 15-12 18-7-3-12-10-12-18V23l12-5Z" fill="#07101E" stroke="url(#uf-metal)" strokeWidth="2.6" />
        <path d="M32 26c3 4 6 7 6 12 0 4-3 7-6 7s-6-3-6-7c0-4 3-7 6-12Z" fill="url(#uf-fire)" />
        <path d="M31 32c1 2 3 4 3 7 0 2-1 4-3 4-2-1-3-2-3-4 0-3 2-5 3-7Z" fill="#FFD38A" fillOpacity="0.86" />
      </svg>
      <span className="font-display text-lg font-bold tracking-[0.18em] text-white">
        ULTRI<span className="logo-fire">FIRE</span>
      </span>
    </div>
  );
}
