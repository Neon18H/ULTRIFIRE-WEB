import { Check, Minus } from 'lucide-react';
import { Reveal } from './motion-wrapper';
import { SectionHeading } from './section-heading';

const rows = [
  ['Precio en COP', true, false, false, false],
  ['Soporte local en español', true, false, false, false],
  ['Sin licencias anuales en USD', true, false, false, false],
  ['Fabricación nacional', true, false, false, false],
  ['Gestión cloud centralizada', true, true, true, true]
] as const;

export function Comparison() {
  const vendors = ['UltriFire', 'Fortinet', 'Cisco', 'Palo Alto'];
  return (
    <section className="px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Comparativa"
          title="La alternativa local para proteger sin fricción financiera"
          description="UltriFire no busca reemplazar el rigor empresarial: lo hace accesible para empresas colombianas con costos previsibles y soporte cercano."
        />
        <Reveal className="overflow-hidden rounded-[2rem] border border-white/10 bg-panel/70 shadow-2xl backdrop-blur-2xl">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.035]">
                  <th className="px-6 py-5 text-sm font-semibold text-textfire/60">Criterio</th>
                  {vendors.map((vendor) => (
                    <th key={vendor} className={vendor === 'UltriFire' ? 'px-6 py-5 font-display text-sm font-bold text-cyanfire' : 'px-6 py-5 font-display text-sm font-bold text-white'}>{vendor}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map(([label, ...values]) => (
                  <tr key={label} className="border-b border-white/10 transition hover:bg-cyanfire/[0.035] last:border-0">
                    <td className="px-6 py-5 text-sm font-semibold text-textfire/80">{label}</td>
                    {values.map((value, index) => (
                      <td key={`${label}-${vendors[index]}`} className="px-6 py-5">
                        {value ? <Check className="h-5 w-5 text-greenfire" aria-label="Incluido" /> : <Minus className="h-5 w-5 text-mutedfire" aria-label="Limitado" />}
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
