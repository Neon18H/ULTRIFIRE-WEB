'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

type RevealProps = HTMLMotionProps<'div'> & {
  delay?: number;
};

export function Reveal({ children, className, delay = 0, ...props }: RevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });
  const [forceVisible, setForceVisible] = useState(false);

  // Respaldo de seguridad: si por cualquier razón el observer no dispara
  // (layouts móviles, alturas grandes), forzamos visibilidad tras montar.
  useEffect(() => {
    const timeout = setTimeout(() => setForceVisible(true), 600);
    return () => clearTimeout(timeout);
  }, []);

  const visible = isInView || forceVisible;

  if (shouldReduceMotion) {
    return (
      <div ref={ref} className={cn(className)}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
      transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1], delay }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
