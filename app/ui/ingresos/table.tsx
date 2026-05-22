import { ActualizarIngreso, BorrarIngreso } from '@/app/ui/ingresos/buttons';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchFilteredIngresos } from '@/app/lib/ingresos/data';

export default async function IngresosTabla({
  query,
  currentPage,
  from,
  to,
}: {
  query: string;
  currentPage: number;
  from: string;
  to: string;
}) {
  const ingresos = await fetchFilteredIngresos(query, currentPage, from, to);
  const importeTotal = ingresos.reduce(
    (sum, ingreso) => sum + Number(ingreso.total),
    0,
  );

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {ingresos?.map((ingreso) => (
              <div
                key={ingreso.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="font-medium">{ingreso.tipo_ingreso}</p>
                    <p className="text-sm text-gray-500">{formatDateToLocal(ingreso.fecha)}</p>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">{formatCurrency(ingreso.total)}</p>
                    <p className="text-sm text-gray-500">
                      Efectivo: {formatCurrency(ingreso.efectivo)} · Tarjeta: {formatCurrency(ingreso.tarjeta)}
                    </p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <ActualizarIngreso id={ingreso.id} />
                    <BorrarIngreso id={ingreso.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Fecha
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Tipo
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Efectivo
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Tarjeta
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Total
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Acciones</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {ingresos?.map((ingreso) => (
                <tr
                  key={ingreso.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6">
                    {formatDateToLocal(ingreso.fecha)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {ingreso.tipo_ingreso}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatCurrency(ingreso.efectivo)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatCurrency(ingreso.tarjeta)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 font-medium">
                    {formatCurrency(ingreso.total)}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <ActualizarIngreso id={ingreso.id} />
                      <BorrarIngreso id={ingreso.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {importeTotal > 0 && (
            <div className="mt-4 flex justify-end px-4 py-2">
              {formatCurrency(importeTotal)} €
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
