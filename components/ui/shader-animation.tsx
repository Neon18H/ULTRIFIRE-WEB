'use client';

import { useEffect, useRef, useState } from 'react';

function canUseWebGL() {
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

function shouldDisableWebGLOnThisDevice() {
  if (typeof window === 'undefined') {
    return true;
  }

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isNarrowViewport = window.matchMedia('(max-width: 767px)').matches;
  const userAgent = navigator.userAgent || '';
  const isMobileUserAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
  const hardwareConcurrency = navigator.hardwareConcurrency ?? 0;
  const isLowConcurrencyDevice = hardwareConcurrency > 0 && hardwareConcurrency <= 4;

  return reducedMotion || isNarrowViewport || isMobileUserAgent || isLowConcurrencyDevice || !canUseWebGL();
}

export function CyberFallbackBackground() {
  return (
    <div className="hero-static-bg absolute inset-0 h-full w-full overflow-hidden" aria-hidden="true">
      <div className="hero-cyber-grid" />
    </div>
  );
}

export function ShaderAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    renderer: { domElement: HTMLCanvasElement; dispose: () => void };
    animationId: number;
    disposeScene: () => void;
  } | null>(null);
  const [useStaticFallback, setUseStaticFallback] = useState(true);

  useEffect(() => {
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mobileQuery = window.matchMedia('(max-width: 767px)');

    const updateMode = () => {
      setUseStaticFallback(shouldDisableWebGLOnThisDevice());
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
    if (!containerRef.current || useStaticFallback) return undefined;

    const container = containerRef.current;
    let cancelled = false;

    const initShader = async () => {
      try {
        if (shouldDisableWebGLOnThisDevice()) {
          setUseStaticFallback(true);
          return;
        }

        const THREE = await import('three');

        if (cancelled || !containerRef.current) {
          return;
        }

        const vertexShader = `
          void main() {
            gl_Position = vec4( position, 1.0 );
          }
        `;

        const fragmentShader = `
          #define TWO_PI 6.2831853072
          #define PI 3.14159265359
          precision highp float;
          uniform vec2 resolution;
          uniform float time;
          void main(void) {
            vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
            float t = time*0.05;
            float lineWidth = 0.002;
            vec3 color = vec3(0.0);
            for(int j = 0; j < 3; j++){
              for(int i=0; i < 5; i++){
                color[j] += lineWidth*float(i*i) / abs(fract(t - 0.01*float(j)+float(i)*0.01)*5.0 - length(uv) + mod(uv.x+uv.y, 0.2));
              }
            }
            gl_FragColor = vec4(color[0],color[1],color[2],1.0);
          }
        `;

        const camera = new THREE.Camera();
        camera.position.z = 1;
        const scene = new THREE.Scene();
        const geometry = new THREE.PlaneGeometry(2, 2);
        const uniforms = {
          time: { value: 1.0 },
          resolution: { value: new THREE.Vector2() }
        };
        const material = new THREE.ShaderMaterial({
          uniforms,
          vertexShader,
          fragmentShader
        });
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        // Comentario en español: la creación del renderer es el punto más frágil en móvil;
        // por eso sucede solo después de validar WebGL y dentro de try/catch.
        const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
        container.appendChild(renderer.domElement);

        const onWindowResize = () => {
          const width = container.clientWidth;
          const height = container.clientHeight;
          renderer.setSize(width, height);
          uniforms.resolution.value.x = renderer.domElement.width;
          uniforms.resolution.value.y = renderer.domElement.height;
        };

        const disposeScene = () => {
          window.removeEventListener('resize', onWindowResize);
          if (sceneRef.current?.animationId) {
            cancelAnimationFrame(sceneRef.current.animationId);
          }
          if (container.contains(renderer.domElement)) {
            container.removeChild(renderer.domElement);
          }
          renderer.dispose();
          geometry.dispose();
          material.dispose();
          sceneRef.current = null;
        };

        onWindowResize();
        window.addEventListener('resize', onWindowResize, false);

        const animate = () => {
          const animationId = requestAnimationFrame(animate);
          uniforms.time.value += 0.05;
          renderer.render(scene, camera);
          if (sceneRef.current) {
            sceneRef.current.animationId = animationId;
          }
        };

        sceneRef.current = { renderer, animationId: 0, disposeScene };
        animate();
      } catch (error) {
        // Comentario en español: ante cualquier fallo de Three/WebGL, mostramos CSS estático
        // sin propagar la excepción para no tumbar las secciones del medio.
        if (process.env.NODE_ENV !== 'production') {
          console.error('[ShaderAnimation] WebGL desactivado por error:', error);
        }
        setUseStaticFallback(true);
      }
    };

    void initShader();

    return () => {
      cancelled = true;
      sceneRef.current?.disposeScene();
    };
  }, [useStaticFallback]);

  if (useStaticFallback) {
    return <CyberFallbackBackground />;
  }

  return <div ref={containerRef} className="absolute inset-0 h-full w-full overflow-hidden" aria-hidden="true" />;
}
