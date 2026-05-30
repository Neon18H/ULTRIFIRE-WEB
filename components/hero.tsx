'use client';

import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

const HERO_HARDWARE_IMAGE = '/images/hero-hardware.jpg';

export function Hero() {
  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, 720], [-12, 28]);

  return (
    <section id="inicio" className="relative flex min-h-screen items-center overflow-hidden bg-night px-5 pb-28 pt-36 sm:px-8 lg:pt-40">
      <motion.div style={{ y: imageY }} className="absolute inset-y-0 right-0 z-0 w-full lg:w-[68%]" aria-hidden="true">
        <Image src={HERO_HARDWARE_IMAGE} alt="" fill priority sizes="(max-width: 1024px) 100vw, 68vw" className="object-cover object-center opacity-42 lg:object-[62%_center] lg:opacity-50" />
      </motion.div>

      <div className="absolute inset-0 z-10 bg-night/82" aria-hidden="true" />
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-night via-night/92 to-night/35" aria-hidden="true" />
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-night/70 via-transparent to-night" aria-hidden="true" />
      <div className="subtle-grid absolute inset-0 z-10 opacity-50" aria-hidden="true" />
      <div className="absolute right-0 top-16 z-10 h-[34rem] w-[34rem] rounded-full bg-bluefire/10 blur-[130px] animate-breathe" aria-hidden="true" />

      <div className="relative z-20 mx-auto w-full max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.78, ease: [0.22, 1, 0.36, 1] }} className="max-w-4xl">
          <p className="mb-8 text-xs font-semibold uppercase tracking-[0.38em] text-bluefire">Ciberseguridad empresarial · Colombia</p>
          <h1 className="max-w-5xl text-5xl font-semibold leading-[0.98] tracking-[-0.06em] text-textfire sm:text-6xl lg:text-7xl xl:text-[5rem]">
            Ciberseguridad de nivel empresarial, fabricada en Colombia.
          </h1>
          <p className="mt-8 max-w-2xl text-lg font-normal leading-8 text-mutedfire sm:text-xl">
            Firewalls Next-Generation físicos y virtuales, gestionados desde una sola plataforma. Sin licencias en dólares.
          </p>
          <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center">
            <a href="#contacto" className="focus-ring inline-flex items-center justify-center rounded-full bg-bluefire px-7 py-4 text-sm font-semibold text-white transition duration-300 hover:bg-[#2C7BFF]">
              Solicitar demo
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </a>
            <a href="#como-funciona" className="focus-ring group inline-flex items-center rounded-full px-1 py-3 text-sm font-semibold text-textfire transition hover:text-bluefire">
              Ver cómo funciona <span className="ml-2 transition group-hover:translate-x-1">→</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
