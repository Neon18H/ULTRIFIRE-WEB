"use client"

import React, { useEffect, useRef, useState } from "react"
import { ShaderAnimation } from "@/components/ui/shader-animation"
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Bell,
  CircleDot,
  Gauge,
  Globe2,
  LayoutDashboard,
  Lock,
  Menu,
  RadioTower,
  Router,
  ServerCog,
  ShieldAlert,
  ShieldCheck,
  ShieldX,
  SlidersHorizontal,
  Wifi,
  Zap,
} from "lucide-react"

const metrics = [
  { label: "Firewalls activos", value: "24", helper: "+3 sedes sincronizadas", icon: ShieldCheck },
  { label: "Tráfico actual", value: "2.45 Gbps", helper: "WAN / VPN agregada", icon: Activity },
  { label: "Amenazas bloqueadas", value: "1,248", helper: "IPS + malware", icon: ShieldX },
  { label: "Sesiones activas", value: "18,652", helper: "Usuarios y apps", icon: Gauge },
]

const menuItems = [
  { label: "Dashboard", icon: LayoutDashboard, active: true },
  { label: "Firewalls", icon: ServerCog },
  { label: "Interfaces", icon: RadioTower },
  { label: "IPS / Prevención", icon: ShieldAlert },
  { label: "Tráfico", icon: BarChart3 },
  { label: "Reglas", icon: SlidersHorizontal },
  { label: "Alertas", icon: Bell },
  { label: "Reportes", icon: Globe2 },
]

const alerts = [
  { title: "IPS: Posible SSH Brute Force", severity: "Alta", color: "text-orangefire" },
  { title: "Malware detectado: EICAR-Test-File", severity: "Crítica", color: "text-red-300" },
  { title: "Policy blocked: Torrent category", severity: "Media", color: "text-cyanfire" },
]

const devices = [
  { label: "Online", value: 18, color: "bg-emerald-400", text: "text-emerald-300" },
  { label: "Warning", value: 4, color: "bg-orangefire", text: "text-orangefire" },
  { label: "Offline", value: 2, color: "bg-red-500", text: "text-red-300" },
]

function HeroContent({ heroContentRef }: { heroContentRef: React.RefObject<HTMLDivElement> }) {
  return (
    <div ref={heroContentRef} className="pointer-events-auto relative z-20 max-w-5xl pt-32 transition-opacity duration-100 sm:pt-36 lg:pt-44">
      <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.08] px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-cyanfire shadow-[0_0_50px_rgba(0,180,255,0.18)] backdrop-blur-2xl">
        <ShieldCheck className="h-4 w-4" />
        NGFW colombiano para seguridad empresarial
      </div>

      <h1 className="font-display text-5xl font-extralight leading-[0.95] tracking-[-0.055em] text-textfire drop-shadow-[0_10px_55px_rgba(0,0,0,0.55)] sm:text-6xl lg:text-7xl xl:text-8xl">
        Protección avanzada.
        <br />
        Visibilidad total.
        <br />
        <span className="bg-gradient-to-r from-orangefire via-cyanfire to-bluefire bg-clip-text font-semibold text-transparent">
          Control absoluto.
        </span>
      </h1>

      <p className="mt-7 max-w-3xl text-base font-light leading-8 text-mutedfire drop-shadow-[0_6px_26px_rgba(0,0,0,0.65)] sm:text-lg lg:text-xl">
        UltriFire NGFW combina firewall de próxima generación, IPS, control de aplicaciones, VPN, filtrado web y
        visibilidad en tiempo real en una única plataforma SaaS.
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

function TrafficChart() {
  return (
    <div className="relative h-56 overflow-hidden rounded-2xl border border-white/10 bg-black/35 p-4 sm:h-64">
      <div className="absolute inset-4 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:42px_42px]" />
      <svg className="relative h-full w-full" viewBox="0 0 640 260" preserveAspectRatio="none" role="img" aria-label="Gráfico simulado de tráfico NGFW">
        <defs>
          <linearGradient id="trafficLine" x1="0" x2="1" y1="0" y2="0">
            <stop stopColor="#FF5A1F" />
            <stop offset="0.55" stopColor="#00B4FF" />
            <stop offset="1" stopColor="#1A6FFF" />
          </linearGradient>
          <linearGradient id="trafficFill" x1="0" x2="0" y1="0" y2="1">
            <stop stopColor="#00B4FF" stopOpacity="0.28" />
            <stop offset="1" stopColor="#00B4FF" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M0 210 C70 160 88 184 138 126 C190 66 220 152 278 118 C344 78 372 32 438 76 C500 118 520 40 640 62 L640 260 L0 260 Z" fill="url(#trafficFill)" />
        <path d="M0 210 C70 160 88 184 138 126 C190 66 220 152 278 118 C344 78 372 32 438 76 C500 118 520 40 640 62" fill="none" stroke="url(#trafficLine)" strokeLinecap="round" strokeWidth="5" />
        <path d="M0 172 C74 196 112 104 168 132 C232 164 238 74 318 96 C404 120 416 172 480 130 C540 90 582 122 640 102" fill="none" stroke="#FF5A1F" strokeDasharray="10 12" strokeLinecap="round" strokeOpacity="0.78" strokeWidth="3" />
      </svg>
      <div className="absolute left-5 top-5 rounded-full border border-cyanfire/20 bg-cyanfire/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-cyanfire">
        Throughput en tiempo real
      </div>
    </div>
  )
}

function ScreenshotSection({ screenshotRef }: { screenshotRef: React.RefObject<HTMLDivElement> }) {
  return (
    <div className="pointer-events-none relative z-10 mx-auto mt-[18vh] w-full max-w-7xl px-5 pb-24 sm:px-8 lg:mt-[16vh] lg:px-10 xl:px-6">
      <div ref={screenshotRef} className="relative will-change-transform">
        <div className="absolute -inset-8 rounded-[2.5rem] bg-[radial-gradient(circle_at_50%_10%,rgba(0,180,255,0.28),transparent_45%),radial-gradient(circle_at_10%_90%,rgba(255,90,31,0.16),transparent_35%)] blur-2xl" />
        <div className="relative overflow-hidden rounded-[1.75rem] border border-white/12 bg-[#070B14]/95 shadow-[0_44px_150px_rgba(0,0,0,0.65)] backdrop-blur-xl">
          <div className="flex items-center justify-between border-b border-white/10 bg-black/45 px-5 py-4">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-orangefire" />
              <span className="h-3 w-3 rounded-full bg-bluefire" />
              <span className="h-3 w-3 rounded-full bg-cyanfire" />
            </div>
            <div className="rounded-full border border-cyanfire/20 bg-cyanfire/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-cyanfire">
              UltriFire Platform
            </div>
          </div>

          <div className="grid min-h-[720px] bg-[radial-gradient(circle_at_82%_16%,rgba(0,180,255,0.12),transparent_25%),radial-gradient(circle_at_20%_80%,rgba(255,90,31,0.1),transparent_24%),#070B14] lg:grid-cols-[17rem_1fr]">
            <aside className="border-b border-white/10 bg-black/35 p-5 lg:border-b-0 lg:border-r">
              <div className="flex items-center gap-3 rounded-2xl border border-orangefire/25 bg-orangefire/[0.07] p-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orangefire to-bluefire text-white shadow-[0_0_35px_rgba(255,90,31,0.28)]">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white">ULTRIFIRE</p>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyanfire">NGFW</p>
                </div>
              </div>

              <nav className="mt-7 grid gap-1.5">
                {menuItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <div
                      key={item.label}
                      className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition ${
                        item.active
                          ? "border border-cyanfire/25 bg-cyanfire/10 text-white shadow-[0_0_34px_rgba(0,180,255,0.08)]"
                          : "text-mutedfire"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </div>
                  )
                })}
              </nav>

              <div className="mt-7 rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-orangefire">
                  <Lock className="h-4 w-4" />
                  Zero Trust
                </div>
                <p className="mt-3 text-sm leading-6 text-mutedfire">Políticas distribuidas en sedes, nube y usuarios remotos.</p>
              </div>
            </aside>

            <div className="min-w-0 p-4 sm:p-6 lg:p-7">
              <header className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-black/25 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-cyanfire">Command Center</p>
                  <h2 className="mt-1 text-2xl font-light tracking-[-0.03em] text-white sm:text-3xl">Dashboard de seguridad</h2>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-sm text-mutedfire">
                  <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2">Últimas 24 horas</span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]"><Bell className="h-4 w-4" /></span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]"><Menu className="h-4 w-4" /></span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-2 font-semibold text-emerald-300">
                    <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_16px_rgba(110,231,183,0.75)]" />
                    Online
                  </span>
                </div>
              </header>

              <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {metrics.map((metric) => {
                  const Icon = metric.icon
                  return (
                    <div key={metric.label} className="rounded-2xl border border-white/10 bg-white/[0.045] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-sm text-mutedfire">{metric.label}</p>
                        <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-cyanfire/20 bg-cyanfire/10 text-cyanfire">
                          <Icon className="h-4 w-4" />
                        </span>
                      </div>
                      <p className="mt-4 text-3xl font-light tracking-[-0.04em] text-white">{metric.value}</p>
                      <p className="mt-2 text-xs text-mutedfire/80">{metric.helper}</p>
                    </div>
                  )
                })}
              </div>

              <div className="mt-5 grid gap-5 xl:grid-cols-[1.45fr_0.9fr]">
                <TrafficChart />

                <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-white">Alertas recientes</h3>
                    <AlertTriangle className="h-5 w-5 text-orangefire" />
                  </div>
                  <div className="mt-4 grid gap-3">
                    {alerts.map((alert) => (
                      <div key={alert.title} className="rounded-xl border border-white/10 bg-black/25 p-3">
                        <div className="flex items-start justify-between gap-3">
                          <p className="text-sm font-medium text-white">{alert.title}</p>
                          <span className={`text-[10px] font-semibold uppercase tracking-[0.16em] ${alert.color}`}>{alert.severity}</span>
                        </div>
                        <p className="mt-2 text-xs text-mutedfire">Bloqueado por política NGFW · hace 4 min</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-5 grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
                <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
                  <h3 className="text-lg font-medium text-white">Dispositivos</h3>
                  <div className="mt-5 grid gap-4">
                    {devices.map((device) => (
                      <div key={device.label}>
                        <div className="mb-2 flex items-center justify-between text-sm">
                          <span className={`font-semibold ${device.text}`}>{device.label}</span>
                          <span className="text-mutedfire">{device.value}</span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-white/10">
                          <div className={`h-full rounded-full ${device.color}`} style={{ width: `${device.value * 4}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-white">Topología NGFW</h3>
                    <Wifi className="h-5 w-5 text-cyanfire" />
                  </div>
                  <div className="mt-5 grid grid-cols-3 items-center gap-3 text-center text-xs text-mutedfire">
                    {["WAN", "Core", "Cloud"].map((node, index) => (
                      <div key={node} className="relative rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                        <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full border border-cyanfire/20 bg-cyanfire/10 text-cyanfire">
                          {index === 1 ? <Router className="h-5 w-5" /> : <Zap className="h-5 w-5" />}
                        </div>
                        <p className="mt-3 font-semibold uppercase tracking-[0.18em] text-white">{node}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-cyanfire">
                    <CircleDot className="h-4 w-4" />
                    Enrutamiento seguro y políticas activas
                  </div>
                </div>
              </div>
            </div>
          </div>
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
      <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[120vh] overflow-hidden">
        <ShaderAnimation />
        {/* Overlay UltriFire: oscurece la izquierda para lectura y funde el shader hacia la maqueta. */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(6,8,16,0.98)_0%,rgba(6,8,16,0.78)_34%,rgba(6,8,16,0.38)_62%,rgba(6,8,16,0.82)_100%),linear-gradient(to_bottom,rgba(6,8,16,0.10)_0%,rgba(6,8,16,0.16)_42%,rgba(6,8,16,0.88)_86%,#060810_100%)]" aria-hidden="true" />
      </div>
      <div className="relative z-10 mx-auto min-h-screen max-w-7xl px-5 sm:px-8 lg:px-10 xl:px-6">
        <HeroContent heroContentRef={heroContentRef} />
      </div>
      <div className="relative z-10 bg-black" style={{ marginTop: "-10vh" }}>
        <ScreenshotSection screenshotRef={screenshotRef} />
      </div>
      <div className="pointer-events-none absolute bottom-[45vh] left-1/2 z-20 hidden -translate-x-1/2 items-center gap-2 text-xs uppercase tracking-[0.24em] text-mutedfire lg:flex">
        <Activity className="h-4 w-4 text-cyanfire" />
        Monitoreo continuo de perímetro, red y aplicaciones
      </div>
    </section>
  )
}
