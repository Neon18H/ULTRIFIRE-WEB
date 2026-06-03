"use client"

import { useEffect, useRef, useState } from "react"
import type * as ThreeNamespace from "three"

type ShaderAnimationProps = {
  className?: string
}

const vertexShader = /* glsl */ `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`

const fragmentShader = /* glsl */ `
  precision highp float;

  uniform float u_time;
  uniform vec2 u_resolution;
  varying vec2 vUv;

  #define PI 3.14159265359

  float hash(float n) {
    return fract(sin(n) * 43758.5453123);
  }

  void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.x, u_resolution.y);
    uv.x += 0.12;

    float radius = length(uv);
    float angle = atan(uv.y, uv.x);
    float fade = smoothstep(0.95, 0.08, radius);
    float core = smoothstep(0.28, 0.0, radius);
    vec3 color = vec3(0.0);

    // Líneas radiales animadas: se conserva la estructura tech/cyber del shader original,
    // pero la mezcla cromática se inclina a bluefire/cyanfire con acento orangefire mínimo.
    for (float i = 0.0; i < 52.0; i += 1.0) {
      float seed = hash(i * 12.9898);
      float rayAngle = (i / 52.0) * PI * 2.0 + sin(u_time * 0.16 + seed * 6.0) * 0.22;
      float angularDistance = abs(atan(sin(angle - rayAngle), cos(angle - rayAngle)));
      float rayWidth = mix(0.0035, 0.014, seed);
      float ray = smoothstep(rayWidth, 0.0, angularDistance);

      float flow = sin(radius * mix(18.0, 34.0, seed) - u_time * mix(1.2, 2.7, seed) + seed * 10.0);
      float pulse = 0.48 + 0.52 * flow;
      float segment = smoothstep(0.18, 0.95, pulse);
      float intensity = ray * segment * fade * (0.32 + 0.68 * smoothstep(0.02, 0.75, radius));

      vec3 bluefire = vec3(0.102, 0.435, 1.0);   // #1A6FFF
      vec3 cyanfire = vec3(0.0, 0.706, 1.0);     // #00B4FF
      vec3 orangefire = vec3(1.0, 0.353, 0.122); // #FF5A1F

      float cyanMix = 0.62 + 0.38 * sin(u_time * 0.22 + seed * 8.0);
      vec3 brandGlow = mix(bluefire, cyanfire, cyanMix);
      float fireAccent = pow(max(flow, 0.0), 8.0) * step(0.86, seed) * 0.22;

      // Dominante azul/cyan: G y B reciben mayor peso; R se reserva al destello de fuego.
      color += brandGlow * intensity * vec3(0.34, 1.08, 1.32);
      color += orangefire * intensity * fireAccent;
    }

    float ring = smoothstep(0.006, 0.0, abs(radius - (0.34 + 0.025 * sin(u_time * 0.7)))) * 0.22;
    color += vec3(0.02, 0.45, 1.0) * ring * fade;
    color += vec3(0.0, 0.36, 0.82) * core * 0.14;

    float vignette = smoothstep(1.08, 0.2, radius);
    color *= vignette;

    gl_FragColor = vec4(color, 1.0);
  }
`

function StaticShaderFallback() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-night" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_58%_34%,rgba(26,111,255,0.34),transparent_24%),radial-gradient(circle_at_72%_28%,rgba(0,180,255,0.22),transparent_28%),radial-gradient(circle_at_52%_48%,rgba(255,90,31,0.10),transparent_18%),linear-gradient(115deg,rgba(6,8,16,0.98)_0%,rgba(10,14,22,0.9)_45%,rgba(6,8,16,1)_100%)]" />
      <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(0,180,255,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(0,180,255,0.06)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(circle_at_center,black,transparent_76%)]" />
      <div className="absolute left-[62%] top-[33%] h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyanfire/15 blur-[130px]" />
      <div className="absolute left-[60%] top-[35%] h-[18rem] w-[18rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyanfire/15 bg-bluefire/[0.04] shadow-[0_0_120px_rgba(0,180,255,0.12)]" />
    </div>
  )
}

function hasWebGLSupport() {
  try {
    const canvas = document.createElement("canvas")
    return Boolean(canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
  } catch {
    return false
  }
}

function shouldUseStaticFallback() {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  const lowConcurrency = navigator.hardwareConcurrency ? navigator.hardwareConcurrency <= 4 : false
  const smallScreen = window.innerWidth < 768 || window.innerHeight < 560

  return reducedMotion || lowConcurrency || smallScreen || !hasWebGLSupport()
}

export function ShaderAnimation({ className = "" }: ShaderAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [useFallback, setUseFallback] = useState(false)

  useEffect(() => {
    const container = containerRef.current

    if (!container || shouldUseStaticFallback()) {
      setUseFallback(true)
      return
    }

    let cancelled = false
    let animationFrameId = 0
    let cleanupThree: (() => void) | undefined
    let startAnimation: (() => void) | undefined
    let stopAnimation: (() => void) | undefined
    const isVisible = { current: true }

    const initShader = async () => {
      const THREE: typeof ThreeNamespace = await import("three")

      if (cancelled || !containerRef.current) {
        return
      }

      const currentContainer = containerRef.current
      const scene = new THREE.Scene()
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
      const geometry = new THREE.PlaneGeometry(2, 2)
      const material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          u_time: { value: 0 },
          u_resolution: { value: new THREE.Vector2(1, 1) },
        },
        depthWrite: false,
        depthTest: false,
      })
      const mesh = new THREE.Mesh(geometry, material)
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" })
      const clock = new THREE.Clock()

      scene.add(mesh)
      renderer.setClearColor(0x060810, 1)
      renderer.domElement.className = "absolute inset-0 h-full w-full"
      currentContainer.appendChild(renderer.domElement)

      const resize = () => {
        const { width, height } = currentContainer.getBoundingClientRect()
        const safeWidth = Math.max(1, width)
        const safeHeight = Math.max(1, height)

        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
        renderer.setSize(safeWidth, safeHeight, false)
        material.uniforms.u_resolution.value.set(safeWidth, safeHeight)
      }

      const render = () => {
        animationFrameId = 0

        if (!isVisible.current || document.hidden) {
          return
        }

        material.uniforms.u_time.value = clock.getElapsedTime()
        renderer.render(scene, camera)
        animationFrameId = window.requestAnimationFrame(render)
      }

      startAnimation = () => {
        if (!animationFrameId && isVisible.current && !document.hidden) {
          clock.start()
          animationFrameId = window.requestAnimationFrame(render)
        }
      }

      stopAnimation = () => {
        if (animationFrameId) {
          window.cancelAnimationFrame(animationFrameId)
          animationFrameId = 0
        }
      }

      resize()
      startAnimation()
      window.addEventListener("resize", resize)

      cleanupThree = () => {
        stopAnimation?.()
        window.removeEventListener("resize", resize)
        geometry.dispose()
        material.dispose()
        renderer.dispose()
        renderer.forceContextLoss()

        if (renderer.domElement.parentElement === currentContainer) {
          currentContainer.removeChild(renderer.domElement)
        }
      }
    }

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      isVisible.current = entry.isIntersecting

      if (entry.isIntersecting) {
        startAnimation?.()
      } else {
        stopAnimation?.()
      }
    }, { threshold: 0.05 })

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopAnimation?.()
      } else if (isVisible.current) {
        startAnimation?.()
      }
    }

    intersectionObserver.observe(container)
    document.addEventListener("visibilitychange", handleVisibilityChange)
    initShader().catch(() => setUseFallback(true))

    return () => {
      cancelled = true
      intersectionObserver.disconnect()
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      cleanupThree?.()
    }
  }, [])

  return (
    <div ref={containerRef} className={`absolute inset-0 h-full w-full overflow-hidden bg-night ${className}`} aria-hidden="true">
      {useFallback ? <StaticShaderFallback /> : null}
    </div>
  )
}
