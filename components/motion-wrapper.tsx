'use client';

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

/**
 * Reveal a prueba de fallos:
 * - El contenido SIEMPRE es visible por defecto. Si el JS no corre o el observer no
 *   dispara (móvil), el contenido se ve igual. NUNCA queda oculto.
 * - La animación de entrada es una MEJORA progresiva: solo si el JS monta y el
 *   elemento entra en viewport, aplica una transición suave desde abajo.
 * - Respeta prefers-reduced-motion.
 */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [animateIn, setAnimateIn] = useState(false);
  const [enhanced, setEnhanced] = useState(false);

  useEffect(() => {
    // Solo activamos el modo animado si el JS corre y no hay reduce-motion.
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setEnhanced(false);
      return;
    }

    setEnhanced(true);

    const el = ref.current;
    if (!el) return;

    // IntersectionObserver nativo: no dependemos de Framer Motion para visibilidad.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAnimateIn(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.01 },
    );

    observer.observe(el);

    // Respaldo: si por cualquier motivo no dispara, forzamos la visibilidad.
    const timeout = setTimeout(() => {
      setAnimateIn(true);
      observer.disconnect();
    }, 700);

    return () => {
      observer.disconnect();
      clearTimeout(timeout);
    };
  }, []);

  // CLAVE: si NO está enhanced (SSR, sin JS o reduce-motion), no inyectamos estilos
  // de ocultación. El HTML inicial nace visible y la animación es solo progresiva.
  const style: CSSProperties = enhanced
    ? {
        opacity: animateIn ? 1 : 0,
        transform: animateIn ? 'translateY(0)' : 'translateY(18px)',
        transition: `opacity 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
      }
    : {};

  return (
    <div ref={ref} className={cn(className)} style={style}>
      {children}
    </div>
  );
}
