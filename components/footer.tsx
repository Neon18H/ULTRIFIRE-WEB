import { Linkedin, Mail, Twitter } from 'lucide-react';
import { Logo } from './logo';

export function Footer() {
  return (
    <footer className="border-t border-white/10 px-4 py-12 sm:px-6">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div>
          <Logo />
          <p className="mt-5 max-w-md leading-7 text-textfire/60">
            UltriFire desarrolla soluciones de ciberseguridad empresarial con fabricación nacional, soporte local y operación cloud para proteger a la PYME colombiana.
          </p>
          <p className="mt-5 text-sm font-semibold text-cyanfire">UltriFire — Ciberseguridad fabricada en Colombia</p>
        </div>
        <div>
          <h3 className="font-display font-bold text-white">Navegación</h3>
          <div className="mt-5 grid gap-3 text-sm text-textfire/60">
            <a href="#servicios" className="transition hover:text-cyanfire">Servicios</a>
            <a href="#por-que" className="transition hover:text-cyanfire">Por qué UltriFire</a>
            <a href="#productos" className="transition hover:text-cyanfire">Productos</a>
            <a href="#contacto" className="transition hover:text-cyanfire">Contacto</a>
          </div>
        </div>
        <div>
          <h3 className="font-display font-bold text-white">Contacto</h3>
          <div className="mt-5 grid gap-3 text-sm text-textfire/60">
            <a href="mailto:contacto@ultrifire.co" className="transition hover:text-cyanfire">contacto@ultrifire.co</a>
            <span>Bogotá, Colombia</span>
            <div className="flex gap-3 pt-2">
              {[Linkedin, Twitter, Mail].map((Icon, index) => (
                <a key={index} href="mailto:contacto@ultrifire.co" aria-label="Red social UltriFire" className="rounded-xl border border-white/10 p-2 text-textfire/70 transition hover:border-cyanfire/30 hover:text-cyanfire">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-7xl border-t border-white/10 pt-6 text-sm text-textfire/45">
        © {new Date().getFullYear()} UltriFire. Todos los derechos reservados.
      </div>
    </footer>
  );
}
