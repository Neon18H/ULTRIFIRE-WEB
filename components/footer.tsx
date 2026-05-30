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
    <footer className="border-t border-line px-5 py-16 sm:px-8">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[1.3fr_0.7fr_0.8fr]">
        <div>
          <Logo imageSize={36} textClassName="text-base" />
          <p className="mt-6 max-w-md text-base leading-7 text-mutedfire">
            UltriFire desarrolla soluciones de ciberseguridad empresarial con fabricación nacional, soporte local y operación cloud para empresas colombianas.
          </p>
          <p className="mt-6 text-sm font-semibold text-textfire">UltriFire — Ciberseguridad fabricada en Colombia.</p>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-textfire">Navegación</h3>
          <div className="mt-6 grid gap-3 text-sm text-mutedfire">
            {navigation.map((item) => (
              <a key={item.href} href={item.href} className="transition hover:text-bluefire">{item.label}</a>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-textfire">Contacto</h3>
          <div className="mt-6 grid gap-3 text-sm text-mutedfire">
            <a href="mailto:contacto@ultrifire.co" className="transition hover:text-bluefire">contacto@ultrifire.co</a>
            <span>Bogotá, Colombia</span>
            <div className="flex gap-3 pt-2">
              <a href="https://www.linkedin.com" aria-label="LinkedIn UltriFire" className="border border-line p-2 text-mutedfire transition hover:border-bluefire hover:text-bluefire"><Linkedin className="h-4 w-4" aria-hidden="true" /></a>
              <a href="mailto:contacto@ultrifire.co" aria-label="Email UltriFire" className="border border-line p-2 text-mutedfire transition hover:border-bluefire hover:text-bluefire"><Mail className="h-4 w-4" aria-hidden="true" /></a>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-14 max-w-7xl border-t border-line pt-6 text-sm text-mutedfire/70">
        © {new Date().getFullYear()} UltriFire. Todos los derechos reservados.
      </div>
    </footer>
  );
}
