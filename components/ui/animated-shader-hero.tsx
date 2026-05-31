'use client';

import React, { memo, useCallback, useEffect, useRef, useState } from 'react';

interface HeroProps {
  trustBadge?: {
    text: string;
    icons?: string[];
  };
  microLabel?: string;
  headline: {
    line1: string;
    line2: string;
  };
  subtitle: string;
  buttons?: {
    primary?: {
      text: string;
      onClick?: () => void;
    };
    secondary?: {
      text: string;
      onClick?: () => void;
    };
  };
  className?: string;
}

type ShaderProgram = WebGLProgram & {
  resolution?: WebGLUniformLocation | null;
  time?: WebGLUniformLocation | null;
  move?: WebGLUniformLocation | null;
  touch?: WebGLUniformLocation | null;
  pointerCount?: WebGLUniformLocation | null;
  pointers?: WebGLUniformLocation | null;
};

const TARGET_FPS = 30;
const FRAME_INTERVAL = 1000 / TARGET_FPS;

function shouldUseStaticHeroBackground() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobileViewport = window.innerWidth < 768;
  const isLowCoreDevice = typeof navigator.hardwareConcurrency === 'number' && navigator.hardwareConcurrency <= 4;

  return prefersReducedMotion || isMobileViewport || isLowCoreDevice;
}

class WebGLRenderer {
  private canvas: HTMLCanvasElement;
  private gl: WebGL2RenderingContext;
  private program: ShaderProgram | null = null;
  private vs: WebGLShader | null = null;
  private fs: WebGLShader | null = null;
  private buffer: WebGLBuffer | null = null;
  private shaderSource: string;
  private mouseMove = [0, 0];
  private mouseCoords = [0, 0];
  private pointerCoords = [0, 0];
  private nbrOfPointers = 0;

  private vertexSrc = `#version 300 es
precision highp float;
in vec4 position;
void main(){gl_Position=position;}`;

  private vertices = [-1, 1, -1, -1, 1, 1, 1, -1];

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const gl = canvas.getContext('webgl2', {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: 'high-performance'
    });
    if (!gl) {
      throw new Error('WebGL2 no está disponible en este dispositivo.');
    }
    this.gl = gl;
    this.shaderSource = defaultShaderSource;
  }

  updateShader(source: string) {
    this.reset();
    this.shaderSource = source;
    this.setup();
    this.init();
  }

  updateMove(deltas: number[]) {
    this.mouseMove = deltas;
  }

  updateMouse(coords: number[]) {
    this.mouseCoords = coords;
  }

  updatePointerCoords(coords: number[]) {
    this.pointerCoords = coords;
  }

  updatePointerCount(nbr: number) {
    this.nbrOfPointers = nbr;
  }

  updateViewport() {
    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
  }

  compile(shader: WebGLShader, source: string) {
    const gl = this.gl;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      const error = gl.getShaderInfoLog(shader);
      console.error('Shader compilation error:', error);
    }
  }

  test(source: string) {
    let result = null;
    const gl = this.gl;
    const shader = gl.createShader(gl.FRAGMENT_SHADER)!;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      result = gl.getShaderInfoLog(shader);
    }
    gl.deleteShader(shader);
    return result;
  }

  reset() {
    const gl = this.gl;
    if (this.buffer) {
      gl.deleteBuffer(this.buffer);
      this.buffer = null;
    }
    if (this.program && !gl.getProgramParameter(this.program, gl.DELETE_STATUS)) {
      if (this.vs) {
        gl.detachShader(this.program, this.vs);
        gl.deleteShader(this.vs);
        this.vs = null;
      }
      if (this.fs) {
        gl.detachShader(this.program, this.fs);
        gl.deleteShader(this.fs);
        this.fs = null;
      }
      gl.deleteProgram(this.program);
      this.program = null;
    }
  }

  setup() {
    const gl = this.gl;
    this.vs = gl.createShader(gl.VERTEX_SHADER)!;
    this.fs = gl.createShader(gl.FRAGMENT_SHADER)!;
    this.compile(this.vs, this.vertexSrc);
    this.compile(this.fs, this.shaderSource);
    this.program = gl.createProgram()! as ShaderProgram;
    gl.attachShader(this.program, this.vs);
    gl.attachShader(this.program, this.fs);
    gl.linkProgram(this.program);

    if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(this.program));
    }
  }

  init() {
    const gl = this.gl;
    const program = this.program!;

    this.buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);

    const position = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    program.resolution = gl.getUniformLocation(program, 'resolution');
    program.time = gl.getUniformLocation(program, 'time');
    program.move = gl.getUniformLocation(program, 'move');
    program.touch = gl.getUniformLocation(program, 'touch');
    program.pointerCount = gl.getUniformLocation(program, 'pointerCount');
    program.pointers = gl.getUniformLocation(program, 'pointers');
  }

  render(now = 0) {
    const gl = this.gl;
    const program = this.program;

    if (!program || gl.getProgramParameter(program, gl.DELETE_STATUS)) return;

    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(program);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);

    gl.uniform2f(program.resolution ?? null, this.canvas.width, this.canvas.height);
    gl.uniform1f(program.time ?? null, now * 1e-3);
    gl.uniform2f(program.move ?? null, this.mouseMove[0], this.mouseMove[1]);
    gl.uniform2f(program.touch ?? null, this.mouseCoords[0], this.mouseCoords[1]);
    gl.uniform1i(program.pointerCount ?? null, this.nbrOfPointers);
    gl.uniform2fv(program.pointers ?? null, this.pointerCoords);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }
}

class PointerHandler {
  private scale: number;
  private active = false;
  private pointers = new Map<number, number[]>();
  private lastCoords = [0, 0];
  private moves = [0, 0];
  private element: HTMLCanvasElement;

  constructor(element: HTMLCanvasElement, scale: number) {
    this.element = element;
    this.scale = scale;
    element.addEventListener('pointerdown', this.onPointerDown, { passive: true });
    element.addEventListener('pointerup', this.onPointerEnd, { passive: true });
    element.addEventListener('pointerleave', this.onPointerEnd, { passive: true });
    element.addEventListener('pointermove', this.onPointerMove, { passive: true });
  }

  private map = (x: number, y: number) => [x * this.scale, this.element.height - y * this.scale];

  private onPointerDown = (e: PointerEvent) => {
    this.active = true;
    this.pointers.set(e.pointerId, this.map(e.clientX, e.clientY));
  };

  private onPointerEnd = (e: PointerEvent) => {
    if (this.count === 1) {
      this.lastCoords = this.first;
    }
    this.pointers.delete(e.pointerId);
    this.active = this.pointers.size > 0;
  };

  private onPointerMove = (e: PointerEvent) => {
    if (!this.active) return;
    this.lastCoords = [e.clientX, e.clientY];
    this.pointers.set(e.pointerId, this.map(e.clientX, e.clientY));
    this.moves = [this.moves[0] + e.movementX, this.moves[1] + e.movementY];
  };

  updateScale(scale: number) {
    this.scale = scale;
  }

  destroy() {
    this.element.removeEventListener('pointerdown', this.onPointerDown);
    this.element.removeEventListener('pointerup', this.onPointerEnd);
    this.element.removeEventListener('pointerleave', this.onPointerEnd);
    this.element.removeEventListener('pointermove', this.onPointerMove);
  }

  get count() {
    return this.pointers.size;
  }

  get move() {
    return this.moves;
  }

  get coords() {
    return this.pointers.size > 0 ? Array.from(this.pointers.values()).flat() : [0, 0];
  }

  get first() {
    return this.pointers.values().next().value || this.lastCoords;
  }
}

const useShaderBackground = (enabled = true, onFallback?: () => void) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const rendererRef = useRef<WebGLRenderer | null>(null);
  const pointersRef = useRef<PointerHandler | null>(null);
  const isVisibleRef = useRef(false);
  const isTabActiveRef = useRef(true);
  const lastFrameTimeRef = useRef(0);

  const stopAnimation = useCallback(() => {
    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  }, []);

  const loop = useCallback((now: number) => {
    if (!rendererRef.current || !pointersRef.current || !isVisibleRef.current || !isTabActiveRef.current) {
      stopAnimation();
      return;
    }

    if (now - lastFrameTimeRef.current >= FRAME_INTERVAL) {
      lastFrameTimeRef.current = now - ((now - lastFrameTimeRef.current) % FRAME_INTERVAL);
      rendererRef.current.updateMouse(pointersRef.current.first);
      rendererRef.current.updatePointerCount(pointersRef.current.count);
      rendererRef.current.updatePointerCoords(pointersRef.current.coords);
      rendererRef.current.updateMove(pointersRef.current.move);
      rendererRef.current.render(now);
    }

    animationFrameRef.current = requestAnimationFrame(loop);
  }, [stopAnimation]);

  const startAnimation = useCallback(() => {
    if (animationFrameRef.current === null && rendererRef.current && isVisibleRef.current && isTabActiveRef.current) {
      lastFrameTimeRef.current = performance.now();
      animationFrameRef.current = requestAnimationFrame(loop);
    }
  }, [loop]);

  useEffect(() => {
    if (!canvasRef.current || !enabled) return;

    const canvas = canvasRef.current;

    // Calidad ajustable: en móvil, CPU baja o reduced-motion usamos gradiente estático premium.
    if (shouldUseStaticHeroBackground()) {
      onFallback?.();
      return;
    }

    const dpr = Math.min(Math.max(1, 0.5 * window.devicePixelRatio), 1.25);

    const resize = () => {
      canvas.width = Math.max(1, Math.floor(window.innerWidth * dpr));
      canvas.height = Math.max(1, Math.floor(window.innerHeight * dpr));
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      pointersRef.current?.updateScale(dpr);
      rendererRef.current?.updateViewport();
    };

    try {
      rendererRef.current = new WebGLRenderer(canvas);
      pointersRef.current = new PointerHandler(canvas, dpr);
      rendererRef.current.setup();
      rendererRef.current.init();
      resize();

      if (rendererRef.current.test(defaultShaderSource) === null) {
        rendererRef.current.updateShader(defaultShaderSource);
      }
      rendererRef.current.render(0);
    } catch (error) {
      console.error(error);
      onFallback?.();
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      // Ajuste de performance: el shader solo consume GPU mientras el hero cruza el viewport.
      isVisibleRef.current = entry.isIntersecting;
      if (entry.isIntersecting) {
        startAnimation();
      } else {
        stopAnimation();
      }
    }, { threshold: 0.08 });
    observer.observe(canvas);

    const onVisibilityChange = () => {
      isTabActiveRef.current = !document.hidden;
      if (document.hidden) {
        stopAnimation();
      } else {
        startAnimation();
      }
    };

    window.addEventListener('resize', resize, { passive: true });
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      stopAnimation();
      pointersRef.current?.destroy();
      pointersRef.current = null;
      rendererRef.current?.reset();
      rendererRef.current = null;
    };
  }, [enabled, onFallback, startAnimation, stopAnimation]);

  return canvasRef;
};

const Hero: React.FC<HeroProps> = ({
  trustBadge,
  microLabel = 'PROTECCIÓN DE NUEVA GENERACIÓN',
  headline,
  subtitle,
  buttons,
  className = ''
}) => {
  const [showFallback, setShowFallback] = useState(false);
  const enableFallback = useCallback(() => setShowFallback(true), []);
  const canvasRef = useShaderBackground(!showFallback, enableFallback);
  const accentedLine = headline.line2.replace(/^para\s+/i, '');

  return (
    <div id="inicio" className={`relative min-h-screen w-full overflow-hidden bg-black ${className}`}>
      <style jsx>{`
        @keyframes fade-in-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-down {
          animation: fade-in-down 0.8s ease-out forwards;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
        }

        .animation-delay-600 {
          animation-delay: 0.6s;
        }

        .animation-delay-800 {
          animation-delay: 0.8s;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-fade-in-down,
          .animate-fade-in-up {
            animation: none;
            opacity: 1;
            transform: none;
          }
        }
      `}</style>

      {showFallback ? (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_22%,rgba(0,180,255,0.22),transparent_34rem),radial-gradient(circle_at_88%_72%,rgba(255,90,31,0.1),transparent_24rem),linear-gradient(135deg,#060810_0%,#07162b_48%,#020409_100%)]" aria-hidden="true" />
      ) : (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full touch-none object-cover"
          style={{ background: 'black' }}
        />
      )}

      <div className="absolute inset-0 z-[1] bg-[#060810]/35" aria-hidden="true" />
      <div className="absolute inset-0 z-[2] bg-[linear-gradient(90deg,rgba(6,8,16,0.92)_0%,rgba(6,8,16,0.72)_34%,rgba(6,8,16,0.34)_64%,rgba(6,8,16,0.16)_100%)]" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 z-[3] h-40 bg-gradient-to-t from-night to-transparent" aria-hidden="true" />

      <div className="relative z-10 flex min-h-screen flex-col items-start justify-center px-5 pb-24 pt-36 text-left text-white sm:px-8 lg:px-16 lg:pt-40 xl:px-24">
        <div className="max-w-4xl">
          {trustBadge && (
            <div className="mb-8 animate-fade-in-down">
              <div className="inline-flex items-center gap-2 rounded-lg border border-blue-300/20 bg-blue-500/10 px-4 py-2 text-sm backdrop-blur-md">
                {trustBadge.icons && (
                  <div className="flex">
                    {trustBadge.icons.map((icon, index) => (
                      <span key={index} className="text-[#5B9BFF]">
                        {icon}
                      </span>
                    ))}
                  </div>
                )}
                <span className="text-[#DCE8FF]">{trustBadge.text}</span>
              </div>
            </div>
          )}

          <p className="mb-7 animate-fade-in-up text-[11px] font-semibold uppercase tracking-[0.25em] text-[#5B9BFF] animation-delay-200">
            {microLabel}
          </p>

          <div className="space-y-3">
            <h1 className="animate-fade-in-up text-5xl font-extralight leading-[1.02] tracking-[-0.02em] text-[#F0F4FA] animation-delay-400 sm:text-6xl lg:text-7xl">
              {headline.line1}
            </h1>
            <h2 className="animate-fade-in-up text-5xl font-extralight leading-[1.02] tracking-[-0.02em] text-[#F0F4FA] animation-delay-600 sm:text-6xl lg:text-7xl">
              para{' '}
              <span className="bg-gradient-to-r from-[#1A6FFF] via-[#00B4FF] to-[#5B9BFF] bg-clip-text font-semibold text-transparent">
                {accentedLine}
              </span>
            </h2>
          </div>

          <div className="animate-fade-in-up animation-delay-800">
            <p className="mt-8 max-w-2xl text-base font-light leading-8 text-[#B7C4D8] sm:text-lg lg:text-xl">
              {subtitle}
            </p>
          </div>

          {buttons && (
            <div className="mt-10 flex animate-fade-in-up flex-col gap-5 animation-delay-800 sm:flex-row sm:items-center">
              {buttons.primary && (
                <button
                  onClick={buttons.primary.onClick}
                  className="inline-flex items-center justify-center rounded-lg bg-[linear-gradient(135deg,#1A6FFF_0%,#1A6FFF_64%,#FF5A1F_140%)] px-7 py-4 text-sm font-semibold text-white shadow-[0_18px_60px_rgba(26,111,255,0.24)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_70px_rgba(26,111,255,0.32)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B9BFF] focus-visible:ring-offset-2 focus-visible:ring-offset-night"
                >
                  {buttons.primary.text}
                </button>
              )}
              {buttons.secondary && (
                <button
                  onClick={buttons.secondary.onClick}
                  className="inline-flex items-center justify-center rounded-lg px-1 py-4 text-sm font-semibold text-[#DCE8FF] transition duration-300 hover:translate-x-1 hover:text-[#00B4FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B9BFF] focus-visible:ring-offset-2 focus-visible:ring-offset-night"
                >
                  {buttons.secondary.text}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const MemoizedHero = memo(Hero);
const defaultShaderSource = `#version 300 es
/*********
* made by Matthias Hurrle (@atzedent)
*
* To explore strange new worlds, to seek out new life
* and new civilizations, to boldly go where no man has
* gone before.
*/
precision highp float;
out vec4 O;
uniform vec2 resolution;
uniform float time;
#define FC gl_FragCoord.xy
#define T time
#define R resolution
#define MN min(R.x,R.y)
// Returns a pseudo random number for a given point (white noise)
float rnd(vec2 p) {
  p=fract(p*vec2(12.9898,78.233));
  p+=dot(p,p+34.56);
  return fract(p.x*p.y);
}
// Returns a pseudo random number for a given point (value noise)
float noise(in vec2 p) {
  vec2 i=floor(p), f=fract(p), u=f*f*(3.-2.*f);
  float
  a=rnd(i),
  b=rnd(i+vec2(1,0)),
  c=rnd(i+vec2(0,1)),
  d=rnd(i+1.);
  return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);
}
// Returns a pseudo random number for a given point (fractal noise)
float fbm(vec2 p) {
  float t=.0, a=1.; mat2 m=mat2(1.,-.5,.2,1.2);
  for (int i=0; i<5; i++) {
    t+=a*noise(p);
    p*=2.*m;
    a*=.5;
  }
  return t;
}
float clouds(vec2 p) {
  float d=1., t=.0;
  for (float i=.0; i<3.; i++) {
    float a=d*fbm(i*10.+p.x*.2+.2*(1.+i)*p.y+d+i*i+p);
    t=mix(t,d,a);
    d=a;
    p*=2./(i+1.);
  }
  return t;
}
void main(void) {
  vec2 uv=(FC-.5*R)/MN,st=uv*vec2(2,1);
  vec3 col=vec3(0);
  float bg=clouds(vec2(st.x+T*.5,-st.y));
  uv*=1.-.3*(sin(T*.2)*.5+.5);
  for (float i=1.; i<12.; i++) {
    uv+=.1*cos(i*vec2(.1+.01*i, .8)+i*i+T*.5+.1*uv.x);
    vec2 p=uv;
    float d=length(p);
    vec3 cyberGlow=vec3(.18,.58,1.15)+.08*cos(sin(i)*vec3(1.8,2.6,3.4));
    col+=.00155/d*cyberGlow;
    float b=noise(i+p+bg*1.731);
    vec3 fireSpark=vec3(1.0,.26,.08)*.00022*b;
    col+=.00235*b*vec3(.10,.55,1.0)/length(max(p,vec2(b*p.x*.02,p.y)))+fireSpark;
    col=mix(col,vec3(bg*.05,bg*.12,bg*.28),d);
  }
  O=vec4(col,1);
}`;

export default MemoizedHero;
