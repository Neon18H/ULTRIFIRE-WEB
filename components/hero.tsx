"use client"

import React, { useEffect, useRef, useState, Suspense, lazy } from "react"
import { Activity, ArrowRight, ShieldCheck } from "lucide-react"

const Spline = lazy(() => import("@splinetool/react-spline"))

const SCREENSHOT_URL =
  "https://cdn.sanity.io/images/s6lu43cv/production-v4/13b6177b537aee0fc311a867ea938f16416e8670-3840x2160.jpg?w=3840&h=2160&q=10&auto=format&fm=jpg"

function HeroSplineBackground() {
  return (
    <div className="absolute inset-0 h-screen w-full overflow-hidden bg-black">
      <Suspense fallback={<div className="h-screen w-full bg-black" />}>
        <Spline
          style={{
            width: "100%",
            height: "100vh",
            pointerEvents: "auto",
          }}
          scene="https://prod.spline.design/us3ALejTXl6usHZ7/scene.splinecode"
        />
      </Suspense>

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.92),rgba(0,0,0,0.2)_42%,rgba(0,0,0,0.03)_70%,rgba(0,0,0,0.7)),linear-gradient(to_bottom,rgba(0,0,0,0.16)_0%,transparent_38%,rgba(0,0,0,0.92)_100%)]" />
    </div>
  )
}

function HeroContent({ heroContentRef }: { heroContentRef: React.RefObject<HTMLDivElement> }) {
  return (
    <div ref={heroContentRef} className="pointer-events-auto relative z-20 max-w-4xl pt-32 transition-opacity duration-100 sm:pt-36 lg:pt-44">
      <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.08] px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-cyanfire shadow-[0_0_50px_rgba(0,180,255,0.18)] backdrop-blur-2xl">
        <ShieldCheck className="h-4 w-4" />
        NGFW colombiano para seguridad empresarial
      </div>

      <h1 className="font-display text-5xl font-extralight leading-[0.95] tracking-[-0.055em] text-textfire drop-shadow-[0_10px_55px_rgba(0,0,0,0.55)] sm:text-6xl lg:text-7xl xl:text-8xl">
        Firewall de nueva generación con{" "}
        <span className="bg-gradient-to-r from-orangefire via-cyanfire to-bluefire bg-clip-text font-semibold text-transparent">
          visibilidad SOC
        </span>
      </h1>

      <p className="mt-7 max-w-2xl text-base font-light leading-8 text-mutedfire drop-shadow-[0_6px_26px_rgba(0,0,0,0.65)] sm:text-lg lg:text-xl">
        UltriFire unifica inspección profunda, IPS Analytics, segmentación y control de tráfico en una plataforma NGFW
        diseñada para proteger operaciones críticas sin depender de licencias impredecibles en dólares.
      </p>

      <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
        <a
          href="#contacto"
          className="focus-ring group inline-flex items-center justify-center rounded-xl bg-[linear-gradient(135deg,#FF5A1F_0%,#1A6FFF_68%,#00B4FF_125%)] px-7 py-4 text-sm font-semibold text-white shadow-[0_22px_70px_rgba(26,111,255,0.28)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_26px_80px_rgba(255,90,31,0.22)] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
        >
          Solicitar demo
          <ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0" />
        </a>
        <a
          href="#como-funciona"
          className="focus-ring inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/[0.06] px-7 py-4 text-sm font-semibold text-textfire shadow-[0_18px_55px_rgba(0,0,0,0.18)] backdrop-blur-xl transition duration-300 hover:border-cyanfire/70 hover:bg-cyanfire/10 hover:text-white motion-reduce:transition-none"
        >
          Ver plataforma
        </a>
      </div>
    </div>
  )
}

function ScreenshotSection({ screenshotRef }: { screenshotRef: React.RefObject<HTMLDivElement> }) {
  return (
    <div className="pointer-events-none relative z-10 mx-auto mt-[18vh] w-full max-w-7xl px-5 pb-24 sm:px-8 lg:mt-[16vh] lg:px-10 xl:px-6">
      <div ref={screenshotRef} className="relative will-change-transform">
        <div className="absolute -inset-8 rounded-[2.5rem] bg-[radial-gradient(circle_at_50%_10%,rgba(0,180,255,0.28),transparent_45%),radial-gradient(circle_at_10%_90%,rgba(255,90,31,0.16),transparent_35%)] blur-2xl" />
        <div className="relative overflow-hidden rounded-[1.75rem] border border-white/12 bg-[#070B14]/80 shadow-[0_44px_150px_rgba(0,0,0,0.65)] backdrop-blur-xl">
          <div className="flex items-center justify-between border-b border-white/10 bg-black/35 px-5 py-4">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-orangefire" />
              <span className="h-3 w-3 rounded-full bg-bluefire" />
              <span className="h-3 w-3 rounded-full bg-cyanfire" />
            </div>
            <div className="rounded-full border border-cyanfire/20 bg-cyanfire/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-cyanfire">
              UltriFire Platform
            </div>
          </div>
          <img
            src={SCREENSHOT_URL}
            alt="Vista de la plataforma UltriFire"
            className="block aspect-[16/9] w-full object-cover"
            loading="eager"
          />
        </div>
      </div>
    </div>
  )
}

export function Hero() {
  const heroContentRef = useRef<HTMLDivElement>(null)
  const screenshotRef = useRef<HTMLDivElement>(null)
  const [scrollPosition, setScrollPosition] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setScrollPosition(scrollPosition)

      if (screenshotRef.current) {
        screenshotRef.current.style.transform = `translateY(-${scrollPosition * 0.5}px)`
      }

      if (heroContentRef.current) {
        const maxScroll = 400
        const opacity = 1 - Math.min(scrollPosition / maxScroll, 1)
        heroContentRef.current.style.opacity = opacity.toString()
      }
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section id="inicio" data-scroll-position={scrollPosition} className="relative min-h-[155vh] overflow-hidden bg-black text-white">
      <HeroSplineBackground />
      <div className="relative z-10 mx-auto min-h-screen max-w-7xl px-5 sm:px-8 lg:px-10 xl:px-6">
        <HeroContent heroContentRef={heroContentRef} />
      </div>
      <ScreenshotSection screenshotRef={screenshotRef} />
      <div className="pointer-events-none absolute bottom-[45vh] left-1/2 z-20 hidden -translate-x-1/2 items-center gap-2 text-xs uppercase tracking-[0.24em] text-mutedfire lg:flex">
        <Activity className="h-4 w-4 text-cyanfire" />
        Monitoreo continuo de perímetro, red y aplicaciones
      </div>
    </section>
  )
}
