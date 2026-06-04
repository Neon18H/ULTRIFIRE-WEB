'use client';

import { useEffect, useState } from 'react';

const MOBILE_QUERY = '(max-width: 767px)';

/**
 * Detecta móvil sin provocar errores de hidratación.
 *
 * Importante: el primer render devuelve siempre `false` tanto en SSR como durante
 * la hidratación inicial. Después de montar en el cliente, se lee matchMedia y se
 * actualiza con listeners de `change` y `resize`. Así React recibe el mismo HTML
 * base en servidor/cliente y los extras pesados se montan solo después.
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(MOBILE_QUERY);

    const updateMobileState = () => {
      setIsMobile(mediaQuery.matches);
    };

    updateMobileState();
    mediaQuery.addEventListener('change', updateMobileState);
    window.addEventListener('resize', updateMobileState, { passive: true });

    return () => {
      mediaQuery.removeEventListener('change', updateMobileState);
      window.removeEventListener('resize', updateMobileState);
    };
  }, []);

  return isMobile;
}
