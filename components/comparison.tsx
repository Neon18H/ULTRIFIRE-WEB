import { Check, Minus } from 'lucide-react';
import { Reveal } from './motion-wrapper';
import { SectionHeading } from './section-heading';

const vendors = ['UltriFire', 'Fortinet', 'Cisco', 'Palo Alto'] as const;
const rows = [
  ['Precio en COP', true, false, false, false],
  ['Soporte local en español', true, false, false, false],
  ['Sin licencias anuales en USD', true, false, false, false],
  ['Fabricación nacional', true, false, false, false],
  ['Gestión cloud centralizada', true, true, true, true]
] as const;

export function Comparison() {
  return (
    <section id="comparativa" className="overflow-hidden px-4 py-16 sm:px-8 sm:py-20 lg:py-36">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Comparativa"
          title={<>Rigor empresarial con una ventaja <span className="font-semibold">local</span> decisiva.</>}
          description="UltriFire mantiene una postura técnica seria y elimina fricciones comerciales que bloquean a empresas colombianas: moneda, soporte y dependencia operativa."
        />

        <Reveal className="grid gap-4 md:hidden">
          {rows.map(([label, ...values]) => (
            <article key={label} className="rounded-2xl border border-line bg-deep/80 p-4 shadow-soft backdrop-blur-xl">
              <h3 className="text-sm font-semibold text-textfire">{label}</h3>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {values.map((value, index) => (
                  <div key={`${label}-${vendors[index]}`} className="flex min-h-11 items-center justify-between rounded-xl border border-line/70 bg-white/[0.025] px-3 py-2 text-sm text-mutedfire">
                    <span className={vendors[index] === 'UltriFire' ? 'font-semibold text-bluefire' : ''}>{vendors[index]}</span>
                    {value ? <Check className="h-5 w-5 text-bluefire" aria-label="Incluido" /> : <Minus className="h-5 w-5 text-mutedfire/45" aria-label="Limitado" />}
                  </div>
                ))}
              </div>
            </article>
          ))}
        </Reveal>

        <Reveal className="hidden overflow-hidden border border-line bg-deep/80 shadow-soft backdrop-blur-xl md:block">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left">
              <thead>
                <tr className="border-b border-line">
                  <th className="px-6 py-6 text-xs font-semibold uppercase tracking-[0.22em] text-mutedfire">Criterio</th>
                  {vendors.map((vendor) => (
                    <th key={vendor} className={vendor === 'UltriFire' ? 'px-6 py-6 text-sm font-semibold text-bluefire' : 'px-6 py-6 text-sm font-medium text-textfire/80'}>
                      {vendor}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map(([label, ...values]) => (
                  <tr key={label} className="border-b border-line/80 last:border-0 hover:bg-white/[0.018]">
                    <td className="px-6 py-6 text-sm font-medium text-textfire">{label}</td>
                    {values.map((value, index) => (
                      <td key={`${label}-${vendors[index]}`} className="px-6 py-6">
                        {value ? <Check className="h-5 w-5 text-bluefire" aria-label="Incluido" /> : <Minus className="h-5 w-5 text-mutedfire/45" aria-label="Limitado" />}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
