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
    <section id="comparativa" className="px-5 py-32 sm:px-8 lg:py-40">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Comparativa"
          title="Rigor empresarial con una ventaja local decisiva."
          description="UltriFire mantiene una postura técnica seria y elimina fricciones comerciales que suelen bloquear a empresas colombianas: moneda, soporte y dependencia operativa."
        />
        <Reveal className="overflow-hidden border border-line bg-deep/45">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left">
              <thead>
                <tr className="border-b border-line">
                  <th className="px-6 py-6 text-sm font-semibold text-mutedfire">Criterio</th>
                  {vendors.map((vendor) => (
                    <th key={vendor} className={vendor === 'UltriFire' ? 'px-6 py-6 text-sm font-semibold text-bluefire' : 'px-6 py-6 text-sm font-semibold text-textfire'}>
                      {vendor}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map(([label, ...values]) => (
                  <tr key={label} className="border-b border-line/80 last:border-0">
                    <td className="px-6 py-6 text-sm font-medium text-textfire">{label}</td>
                    {values.map((value, index) => (
                      <td key={`${label}-${vendors[index]}`} className="px-6 py-6">
                        {value ? <Check className="h-5 w-5 text-bluefire" aria-label="Incluido" /> : <Minus className="h-5 w-5 text-mutedfire/55" aria-label="Limitado" />}
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
