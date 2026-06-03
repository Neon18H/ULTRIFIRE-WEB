import { Linkedin, Mail } from 'lucide-react';
import { Logo } from './logo';

const navigation = [
  { href: '#servicios', label: 'Servicios' },
  { href: '#como-funciona', label: 'Cómo funciona' },
  { href: '#comparativa', label: 'Comparativa' },
  { href: '#contacto', label: 'Contacto' }
];

export function Footer() {
  return (
    <footer className="overflow-hidden border-t border-line px-4 py-12 sm:px-8 sm:py-16">
      <div className="mx-auto grid max-w-7xl gap-10 sm:grid-cols-2 md:grid-cols-[1.3fr_0.7fr_0.8fr] md:gap-12">
        <div className="sm:col-span-2 md:col-span-1">
          <Logo imageSize={32} textClassName="text-sm sm:text-base" />
          <p className="mt-5 max-w-md text-sm leading-7 text-mutedfire sm:mt-6 sm:text-base">
            UltriFire desarrolla soluciones de ciberseguridad empresarial con fabricación nacional, soporte local y operación cloud para empresas colombianas.
          </p>
          <p className="mt-6 text-sm font-semibold text-textfire">UltriFire — Ciberseguridad fabricada en Colombia.</p>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-textfire">Navegación</h3>
          <div className="mt-5 grid gap-2 text-sm text-mutedfire sm:mt-6 sm:gap-3">
            {navigation.map((item) => (
              <a key={item.href} href={item.href} className="focus-ring flex min-h-11 items-center rounded-lg transition hover:text-bluefire">{item.label}</a>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-textfire">Contacto</h3>
          <div className="mt-5 grid gap-2 text-sm text-mutedfire sm:mt-6 sm:gap-3">
            <a href="mailto:contacto@ultrifire.co" className="focus-ring flex min-h-11 items-center rounded-lg transition hover:text-bluefire">contacto@ultrifire.co</a>
            <span className="flex min-h-11 items-center">Bogotá, Colombia</span>
            <div className="flex gap-3 pt-2">
              <a href="https://www.linkedin.com" aria-label="LinkedIn UltriFire" className="focus-ring flex min-h-11 min-w-11 items-center justify-center border border-line text-mutedfire transition hover:border-bluefire hover:text-bluefire"><Linkedin className="h-4 w-4" aria-hidden="true" /></a>
              <a href="mailto:contacto@ultrifire.co" aria-label="Email UltriFire" className="focus-ring flex min-h-11 min-w-11 items-center justify-center border border-line text-mutedfire transition hover:border-bluefire hover:text-bluefire"><Mail className="h-4 w-4" aria-hidden="true" /></a>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-7xl border-t border-line pt-6 text-sm text-mutedfire/70 sm:mt-14">
        © {new Date().getFullYear()} UltriFire. Todos los derechos reservados.
      </div>
    </footer>
  );
}
