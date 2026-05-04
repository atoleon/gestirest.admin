import { ActualizarProducto, BorrarProducto } from '@/app/ui/productos/buttons';
import { formatDateToLocal } from '@/app/lib/utils';
import { fetchFilteredProductos } from '@/app/lib/productos/data';

export default async function ProductosTabla({
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
  const productos = await fetchFilteredProductos(query, currentPage, from, to);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {productos?.map((producto) => (
              <div
                key={producto.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="font-medium">{producto.descripcion}</p>
                    <p className="text-sm text-gray-500">{producto.proveedor_nombre}</p>
                    <p className="text-sm text-gray-500">{formatDateToLocal(producto.fecha)}</p>
                  </div>
                  {producto.etiquetas && (
                    <p className="text-xs text-gray-400">{producto.etiquetas}</p>
                  )}
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">{producto.precio.toFixed(2)} €</p>
                    <p className="text-sm text-gray-500">
                      {producto.unidades != null && `Uds: ${producto.unidades}`}
                      {producto.unidades != null && producto.kg != null && ' · '}
                      {producto.kg != null && `Kg: ${producto.kg}`}
                      {producto.descuento != null && ` · Dto: ${producto.descuento}%`}
                      {` · IGIC: ${producto.Igic}%`}
                    </p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <ActualizarProducto id={producto.id} />
                    <BorrarProducto id={producto.id} />
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
                  Proveedor
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Descripción
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Uds
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Kg
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Precio
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Dto %
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  IGIC %
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Etiquetas
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Acciones</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {productos?.map((producto) => (
                <tr
                  key={producto.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6">
                    {formatDateToLocal(producto.fecha)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {producto.proveedor_nombre}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {producto.descripcion}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {producto.unidades ?? '-'}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {producto.kg ?? '-'}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 font-medium">
                    {producto.precio.toFixed(2)} €
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {producto.descuento != null ? `${producto.descuento}%` : '-'}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {producto.Igic}%
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 text-gray-500">
                    {producto.etiquetas ?? '-'}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <ActualizarProducto id={producto.id} />
                      <BorrarProducto id={producto.id} />
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
