import { lusitana } from '@/app/ui/fonts';
import { fetchGastosPorTipoMesActual } from '@/app/lib/gastos/data';
import { formatCurrency } from '@/app/lib/utils';

export default async function ResumenGastos({ mes }: { mes?: string }) {
  const datos = await fetchGastosPorTipoMesActual(mes);

  const displayDate = mes ? new Date(`${mes}-01`) : new Date();
  const mesLabel = displayDate.toLocaleString('es-ES', { month: 'long', year: 'numeric' });
  const titulo = `Resumen de gastos ${mesLabel.charAt(0).toUpperCase()}${mesLabel.slice(1)}`;

  if (!datos || datos.length === 0) {
    return (
      <div className="flex w-full flex-col md:col-span-4">
        <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>{titulo}</h2>
        <p className="mt-4 text-gray-400">No hay gastos este mes.</p>
      </div>
    );
  }

  const totalGlobal = datos.reduce((sum, item) => sum + Number(item.total), 0);

  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>{titulo}</h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
        <div className="flex flex-col gap-3 bg-white px-4 py-4 rounded-md">
          {datos.map((item) => {
            const pct = totalGlobal > 0 ? (Number(item.total) / totalGlobal) * 100 : 0;
            return (
              <div key={item.tipo_gasto} className="flex items-center gap-3">
                <span className="w-36 shrink-0 text-sm text-gray-700 text-right truncate" title={item.tipo_gasto}>
                  {item.tipo_gasto}
                </span>
                <div className="flex flex-1 items-center gap-2">
                  <div className="relative h-5 flex-1 rounded bg-gray-100 overflow-hidden">
                    <div
                      className="absolute inset-y-0 left-0 rounded bg-red-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="w-24 shrink-0 text-right text-sm font-medium text-gray-900">
                    {formatCurrency(Number(item.total))}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex justify-end pt-4 pb-1 pr-1">
          <span className="text-sm font-semibold text-gray-700">
            Total: {formatCurrency(totalGlobal)}
          </span>
        </div>
      </div>
    </div>
  );
}
