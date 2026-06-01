'use client';

import dynamic from 'next/dynamic';
import { Activity, ArrowRight, Eye, LockKeyhole, Network, Radar, Server, ShieldCheck, Zap } from 'lucide-react';

const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
  loading: () => <div className="h-full w-full animate-pulse bg-[radial-gradient(circle_at_center,rgba(26,111,255,0.24),transparent_56%)]" />
});

const SPLINE_SCENE_URL = 'https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode';

const securityMetrics = [
  { label: 'Amenazas bloqueadas', value: '98.7%', accent: 'text-cyanfire' },
  { label: 'Tráfico inspeccionado', value: '24.8 TB', accent: 'text-textfire' },
  { label: 'Latencia NGFW', value: '4.2 ms', accent: 'text-orangefire' }
];

const interfaces = [
  { name: 'WAN-01', status: 'UP', traffic: '8.4 Gbps' },
  { name: 'LAN-Core', status: 'UP', traffic: '12.1 Gbps' },
  { name: 'DMZ-SOC', status: 'UP', traffic: '2.6 Gbps' }
];

function HeroSplineBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_22%,rgba(26,111,255,0.24),transparent_34rem),radial-gradient(circle_at_18%_78%,rgba(255,90,31,0.12),transparent_28rem),linear-gradient(180deg,#060810_0%,#07101f_52%,#060810_100%)]" />
      <div className="hero-cyber-grid opacity-40" />
      <div className="absolute right-[-22rem] top-[-8rem] hidden h-[58rem] w-[58rem] opacity-45 blur-[1px] lg:block xl:opacity-60">
        <Spline scene={SPLINE_SCENE_URL} className="h-full w-full scale-110" />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,8,16,0.98)_0%,rgba(6,8,16,0.86)_38%,rgba(6,8,16,0.56)_68%,rgba(6,8,16,0.32)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-night via-night/82 to-transparent" />
    </div>
  );
}

function HeroContent() {
  return (
    <div className="relative z-10 max-w-3xl pt-32 lg:pt-40">
      <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-bluefire/25 bg-bluefire/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-cyanfire shadow-[0_0_40px_rgba(26,111,255,0.14)] backdrop-blur-xl">
        <ShieldCheck className="h-4 w-4" />
        NGFW colombiano para seguridad empresarial
      </div>

      <h1 className="font-display text-5xl font-extralight leading-[0.98] tracking-[-0.045em] text-textfire sm:text-6xl lg:text-7xl xl:text-8xl">
        Firewall de nueva generación con{' '}
        <span className="bg-gradient-to-r from-orangefire via-cyanfire to-bluefire bg-clip-text font-semibold text-transparent">
          visibilidad SOC
        </span>
      </h1>

      <p className="mt-7 max-w-2xl text-base font-light leading-8 text-mutedfire sm:text-lg lg:text-xl">
        UltriFire unifica inspección profunda, IPS Analytics, segmentación y control de tráfico en una plataforma NGFW
        diseñada para proteger operaciones críticas sin depender de licencias impredecibles en dólares.
      </p>

      <div className="mt-9 grid max-w-2xl gap-3 sm:grid-cols-3">
        {securityMetrics.map((metric) => (
          <div key={metric.label} className="rounded-2xl border border-line/90 bg-white/[0.035] p-4 shadow-border backdrop-blur-md">
            <p className={`text-2xl font-semibold ${metric.accent}`}>{metric.value}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.18em] text-mutedfire">{metric.label}</p>
          </div>
        ))}
      </div>

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
          className="focus-ring inline-flex items-center justify-center rounded-xl border border-line bg-night/50 px-7 py-4 text-sm font-semibold text-textfire transition duration-300 hover:border-cyanfire/70 hover:bg-cyanfire/10 hover:text-white motion-reduce:transition-none"
        >
          Ver plataforma
        </a>
      </div>
    </div>
  );
}

function ScreenshotSection() {
  return (
    <div className="relative z-10 mt-16 pb-20 lg:mt-0 lg:flex lg:min-h-[42rem] lg:items-end lg:pb-24">
      <div className="enterprise-panel w-full overflow-hidden rounded-[1.75rem] shadow-[0_34px_120px_rgba(0,0,0,0.45)] lg:translate-x-4 xl:translate-x-10">
        <div className="flex items-center justify-between border-b border-line/80 bg-[#0A0E16]/88 px-5 py-4">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-orangefire" />
            <span className="h-3 w-3 rounded-full bg-bluefire" />
            <span className="h-3 w-3 rounded-full bg-cyanfire" />
          </div>
          <div className="rounded-full border border-cyanfire/20 bg-cyanfire/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-cyanfire">
            UltriFire SOC View
          </div>
        </div>

        <div className="grid gap-4 p-4 sm:p-5 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-line bg-[#070B14]/88 p-5">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-mutedfire">Firewall Intelligence</p>
                <h2 className="mt-1 text-2xl font-semibold text-textfire">Tráfico, riesgo e IPS en tiempo real</h2>
              </div>
              <div className="hidden rounded-2xl border border-orangefire/20 bg-orangefire/10 p-3 text-orangefire sm:block">
                <Radar className="h-6 w-6" />
              </div>
            </div>

            <div className="relative h-56 overflow-hidden rounded-2xl border border-line bg-[linear-gradient(180deg,rgba(13,20,32,0.96),rgba(6,8,16,0.96))] p-4">
              <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(26,111,255,0.24)_1px,transparent_1px),linear-gradient(90deg,rgba(26,111,255,0.24)_1px,transparent_1px)] [background-size:28px_28px]" />
              <div className="relative flex h-full items-end gap-2">
                {[34, 48, 42, 68, 58, 82, 62, 74, 92, 70, 86, 64].map((height, index) => (
                  <div key={`${height}-${index}`} className="flex flex-1 flex-col justify-end gap-2">
                    <div
                      className="rounded-t-md bg-gradient-to-t from-bluefire via-cyanfire to-textfire shadow-[0_0_24px_rgba(0,180,255,0.24)]"
                      style={{ height: `${height}%` }}
                    />
                    <div className="h-1 rounded-full bg-line" />
                  </div>
                ))}
              </div>
              <div className="absolute right-4 top-4 rounded-2xl border border-cyanfire/20 bg-night/80 px-4 py-3 backdrop-blur">
                <p className="text-[10px] uppercase tracking-[0.22em] text-mutedfire">IPS Analytics</p>
                <p className="mt-1 text-xl font-semibold text-cyanfire">1,284</p>
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-3xl border border-line bg-[#070B14]/88 p-5">
                <LockKeyhole className="h-6 w-6 text-orangefire" />
                <p className="mt-4 text-3xl font-semibold text-textfire">0</p>
                <p className="mt-1 text-xs uppercase tracking-[0.18em] text-mutedfire">Críticos abiertos</p>
              </div>
              <div className="rounded-3xl border border-line bg-[#070B14]/88 p-5">
                <Eye className="h-6 w-6 text-cyanfire" />
                <p className="mt-4 text-3xl font-semibold text-textfire">360°</p>
                <p className="mt-1 text-xs uppercase tracking-[0.18em] text-mutedfire">Visibilidad SOC</p>
              </div>
            </div>

            <div className="rounded-3xl border border-line bg-[#070B14]/88 p-5">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-semibold text-textfire">
                  <Network className="h-4 w-4 text-cyanfire" />
                  Interfaces críticas
                </div>
                <span className="rounded-full bg-cyanfire/10 px-3 py-1 text-[10px] font-semibold text-cyanfire">ONLINE</span>
              </div>
              <div className="space-y-3">
                {interfaces.map((item) => (
                  <div key={item.name} className="flex items-center justify-between rounded-2xl border border-line/70 bg-white/[0.025] px-4 py-3">
                    <div>
                      <p className="text-sm font-semibold text-textfire">{item.name}</p>
                      <p className="text-xs text-mutedfire">{item.traffic}</p>
                    </div>
                    <span className="rounded-full border border-cyanfire/30 bg-cyanfire/10 px-2.5 py-1 text-[10px] font-bold text-cyanfire">{item.status}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-line bg-[linear-gradient(135deg,rgba(255,90,31,0.13),rgba(26,111,255,0.14))] p-5">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-night/70 p-3 text-orangefire">
                  <Server className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-textfire">Políticas NGFW sincronizadas</p>
                  <p className="text-xs text-mutedfire">Control granular de apps, usuarios y segmentos.</p>
                </div>
                <Zap className="ml-auto h-5 w-5 text-cyanfire" />
              </div>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-night/70">
                <div className="h-full w-[87%] rounded-full bg-gradient-to-r from-orangefire via-bluefire to-cyanfire" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section id="inicio" className="relative min-h-screen overflow-hidden bg-night text-white">
      <HeroSplineBackground />
      <div className="relative mx-auto grid min-h-screen max-w-7xl gap-8 px-5 sm:px-8 lg:grid-cols-[0.92fr_1.08fr] lg:px-10 xl:px-6">
        <HeroContent />
        <ScreenshotSection />
      </div>
      <div className="pointer-events-none absolute bottom-10 left-1/2 z-10 hidden -translate-x-1/2 items-center gap-2 text-xs uppercase tracking-[0.24em] text-mutedfire lg:flex">
        <Activity className="h-4 w-4 text-cyanfire" />
        Monitoreo continuo de perímetro, red y aplicaciones
      </div>
    </section>
  );
}
