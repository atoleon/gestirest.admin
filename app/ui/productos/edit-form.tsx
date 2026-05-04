'use client';

import { ProductoForm, ProveedorField } from '@/app/lib/definitions';
import Link from 'next/link';
import {
  CalendarIcon,
  CurrencyDollarIcon,
  TagIcon,
  DocumentTextIcon,
  ReceiptPercentIcon,
  TruckIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { actualizarProducto, State } from '@/app/lib/productos/actions';
import { useActionState } from 'react';

export default function EditProductoForm({
  producto,
  proveedores,
}: {
  producto: ProductoForm;
  proveedores: ProveedorField[];
}) {
  const initialState: State = { message: null, errors: {} };
  const actualizarProductoConId = actualizarProducto.bind(null, String(producto.id));
  const [state, formAction] = useActionState(actualizarProductoConId, initialState);
  const fecha = new Date(producto.fecha).toLocaleDateString('en-CA');

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">

        {/* Proveedor */}
        <div className="mb-4">
          <label htmlFor="proveedor" className="mb-2 block text-sm font-medium">
            Proveedor
          </label>
          <div className="relative">
            <select
              id="proveedor"
              name="proveedorId"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={String(producto.proveedor_id)}
              aria-describedby="proveedor-error"
            >
              <option value="" disabled>Selecciona proveedor</option>
              {proveedores.map((proveedor) => (
                <option key={proveedor.id} value={proveedor.id}>
                  {proveedor.nombre}
                </option>
              ))}
            </select>
            <TruckIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="proveedor-error" aria-live="polite" aria-atomic="true">
            {state.errors?.proveedorId?.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>{error}</p>
            ))}
          </div>
        </div>

        {/* Fecha */}
        <div className="mb-4">
          <label htmlFor="fecha" className="mb-2 block text-sm font-medium">
            Fecha
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="fecha"
                name="fecha"
                type="date"
                defaultValue={fecha}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="fecha-error"
              />
              <CalendarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div id="fecha-error" aria-live="polite" aria-atomic="true">
            {state.errors?.fecha?.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>{error}</p>
            ))}
          </div>
        </div>

        {/* Descripción */}
        <div className="mb-4">
          <label htmlFor="descripcion" className="mb-2 block text-sm font-medium">
            Descripción
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="descripcion"
                name="descripcion"
                type="text"
                defaultValue={producto.descripcion}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="descripcion-error"
              />
              <DocumentTextIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div id="descripcion-error" aria-live="polite" aria-atomic="true">
            {state.errors?.descripcion?.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>{error}</p>
            ))}
          </div>
        </div>

        {/* Unidades y Kg en fila */}
        <div className="mb-4 grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="unidades" className="mb-2 block text-sm font-medium">
              Unidades
            </label>
            <div className="relative mt-2 rounded-md">
              <input
                id="unidades"
                name="unidades"
                type="number"
                step="0.01"
                min="0"
                defaultValue={producto.unidades ?? ''}
                className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="unidades-error"
              />
            </div>
            <div id="unidades-error" aria-live="polite" aria-atomic="true">
              {state.errors?.unidades?.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>{error}</p>
              ))}
            </div>
          </div>
          <div>
            <label htmlFor="kg" className="mb-2 block text-sm font-medium">
              Kg
            </label>
            <div className="relative mt-2 rounded-md">
              <input
                id="kg"
                name="kg"
                type="number"
                step="0.001"
                min="0"
                defaultValue={producto.kg ?? ''}
                className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="kg-error"
              />
            </div>
            <div id="kg-error" aria-live="polite" aria-atomic="true">
              {state.errors?.kg?.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>{error}</p>
              ))}
            </div>
          </div>
        </div>

        {/* Precio */}
        <div className="mb-4">
          <label htmlFor="precio" className="mb-2 block text-sm font-medium">
            Precio (€)
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="precio"
                name="precio"
                type="number"
                step="0.01"
                min="0"
                defaultValue={producto.precio}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="precio-error"
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div id="precio-error" aria-live="polite" aria-atomic="true">
            {state.errors?.precio?.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>{error}</p>
            ))}
          </div>
        </div>

        {/* Descuento e IGIC en fila */}
        <div className="mb-4 grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="descuento" className="mb-2 block text-sm font-medium">
              Descuento (%)
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="descuento"
                  name="descuento"
                  type="number"
                  step="0.01"
                  min="0"
                  max="100"
                  defaultValue={producto.descuento ?? ''}
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                  aria-describedby="descuento-error"
                />
                <ReceiptPercentIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
            <div id="descuento-error" aria-live="polite" aria-atomic="true">
              {state.errors?.descuento?.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>{error}</p>
              ))}
            </div>
          </div>
          <div>
            <label htmlFor="Igic" className="mb-2 block text-sm font-medium">
              IGIC (%)
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="Igic"
                  name="Igic"
                  type="number"
                  step="0.01"
                  min="0"
                  defaultValue={producto.Igic}
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                  aria-describedby="Igic-error"
                />
                <ReceiptPercentIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
            <div id="Igic-error" aria-live="polite" aria-atomic="true">
              {state.errors?.Igic?.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>{error}</p>
              ))}
            </div>
          </div>
        </div>

        {/* Etiquetas */}
        <div className="mb-4">
          <label htmlFor="etiquetas" className="mb-2 block text-sm font-medium">
            Etiquetas
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="etiquetas"
                name="etiquetas"
                type="text"
                defaultValue={producto.etiquetas ?? ''}
                placeholder="Ej: carne, pescado, bebida..."
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="etiquetas-error"
              />
              <TagIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div id="etiquetas-error" aria-live="polite" aria-atomic="true">
            {state.errors?.etiquetas?.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>{error}</p>
            ))}
          </div>
        </div>

        <div aria-live="polite" aria-atomic="true">
          {state.message ? (
            <p className="mt-2 text-sm text-red-500">{state.message}</p>
          ) : null}
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/productos"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancelar
        </Link>
        <Button type="submit">Actualizar Producto</Button>
      </div>
    </form>
  );
}
