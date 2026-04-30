import { ActualizarGasto, BorrarGasto } from '@/app/ui/gastos/buttons';
import GastoEstado from '@/app/ui/gastos/status';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchFilteredGastos } from '@/app/lib/gastos/data';

export default async function GastoTabla({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const gastos = await fetchFilteredGastos(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {gastos?.map((gasto) => (
              <div
                key={gasto.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <p>{gasto.proveedor_nombre}</p>
                    </div>
                    <p className="text-sm text-gray-500">{gasto.numero}</p>
                  </div>
                  <GastoEstado status={gasto.estado} />
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {formatCurrency(gasto.importe)}
                    </p>
                    <p>{formatDateToLocal(gasto.fecha)}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <ActualizarGasto id={gasto.id} />
                    <BorrarGasto id={gasto.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Proveedor
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Fecha
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Número
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Importe
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Forma de pago
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Tipo de gasto
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Formato
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Vencimiento
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Estado
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {gastos?.map((gasto) => (
                <tr
                  key={gasto.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 py-3">
                    {gasto.proveedor_nombre}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(gasto.fecha)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {gasto.numero}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {`${formatCurrency(gasto.importe)} €`}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {gasto.forma_pago}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {gasto.tipo_gasto}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {gasto.formato}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(gasto.vencimiento)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <GastoEstado status={gasto.estado} />
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <ActualizarGasto id={gasto.id} />
                      <BorrarGasto id={gasto.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
