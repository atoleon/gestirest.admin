'use client';

import { ProveedorField } from '@/app/lib/definitions';
import Link from 'next/link';
import {
  BanknotesIcon,
  DocumentIcon,
  CurrencyDollarIcon,
  HashtagIcon,
  TruckIcon,
  CalendarIcon,
  DocumentCheckIcon
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { crearGasto, State } from '@/app/lib/gastos/actions';
import { formaPago, tipoGasto, formatoGasto, estadoGasto } from '@/app/lib/data-sets';
import { useActionState } from 'react';

export default function Form({ proveedores }: { proveedores: ProveedorField[] }) {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(crearGasto, initialState);

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
              defaultValue=""
              aria-describedby="proveedor-error"
            >
              <option value="" disabled>
                Selecciona proveedor
              </option>
              {proveedores.map((proveedor) => (
                <option key={proveedor.id} value={proveedor.id}>
                  {proveedor.nombre}
                </option>
              ))}
            </select>
            <TruckIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="proveedor-error" aria-live="polite" aria-atomic="true">
            {state.errors?.proveedorId &&
              state.errors.proveedorId.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
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
                placeholder="AAAA-MM-DD"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="fecha-error"
              />
              <CalendarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div id="fecha-error" aria-live="polite" aria-atomic="true">
            {state.errors?.fecha &&
              state.errors.fecha.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Número */}
        <div className="mb-4">
          <label htmlFor="numero" className="mb-2 block text-sm font-medium">
            Número de documento
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="numero"
                name="numero"
                type="string"
                placeholder="Introduce número de documento"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="numero-error"
              />
              <HashtagIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div id="numero-error" aria-live="polite" aria-atomic="true">
            {state.errors?.numero &&
              state.errors.numero.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Importe */}
        <div className="mb-4">
          <label htmlFor="importe" className="mb-2 block text-sm font-medium">
            Importe
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="importe"
                name="importe"
                type="number"
                step="0.01"
                placeholder="Introduce importe"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="importe-error"
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div id="importe-error" aria-live="polite" aria-atomic="true">
            {state.errors?.importe &&
              state.errors.importe.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Forma de pago */}
        <div className="mb-4">
          <label
            htmlFor="forma-pago"
            className="mb-2 block text-sm font-medium"
          >
            Forma de pago
          </label>
          <div className="relative">
            <select
              id="forma-pago"
              name="formaPago"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby="forma-pago-error"
            >
              <option value="" disabled>
                Selecciona Forma de Pago
              </option>
              {formaPago.map((forma) => (
                <option key={forma} value={forma}>
                  {forma}
                </option>
              ))}
            </select>
            <BanknotesIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="forma-pago-error" aria-live="polite" aria-atomic="true">
            {state.errors?.formaPago &&
              state.errors.formaPago.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Tipo de gasto */}
        <div className="mb-4">
          <label
            htmlFor="tipo-gasto"
            className="mb-2 block text-sm font-medium"
          >
            Tipo de gasto
          </label>
          <div className="relative">
            <select
              id="tipo-gasto"
              name="tipoGasto"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby="tipo-gasto-error"
            >
              <option value="" disabled>
                Selecciona Tipo
              </option>
              {tipoGasto.map((tipo) => (
                <option key={tipo} value={tipo}>
                  {tipo}
                </option>
              ))}
            </select>
            <DocumentIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="tipo-gasto-error" aria-live="polite" aria-atomic="true">
            {state.errors?.tipoGasto &&
              state.errors.tipoGasto.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Formato */}
        <div className="mb-4">
          <label htmlFor="formato" className="mb-2 block text-sm font-medium">
            Formato
          </label>
          <div className="relative">
            <select
              id="formato"
              name="formato"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby="formato-error"
            >
              <option value="" disabled>
                Selecciona Formato
              </option>
              {formatoGasto.map((formato) => (
                <option key={formato} value={formato}>
                  {formato}
                </option>
              ))}
            </select>
            <DocumentIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="formato-error" aria-live="polite" aria-atomic="true">
            {state.errors?.formato &&
              state.errors.formato.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Vencimiento */}
        <div className="mb-4">
          <label
            htmlFor="vencimiento"
            className="mb-2 block text-sm font-medium"
          >
            Vencimiento
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="vencimiento"
                name="vencimiento"
                type="date"
                placeholder="AAAA-MM-DD"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="vencimiento-error"
              />
              <CalendarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div id="vencimiento-error" aria-live="polite" aria-atomic="true">
            {state.errors?.vencimiento &&
              state.errors.vencimiento.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Estado */}
        <div className="mb-4">
          <label htmlFor="estado" className="mb-2 block text-sm font-medium">
            Estado
          </label>
          <div className="relative">
            <select
              id="estado"
              name="estado"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby="estado-error"
            >
              <option value="" disabled>
                Selecciona Estado
              </option>
              {estadoGasto.map((estado) => (
                <option key={estado} value={estado}>
                  {estado}
                </option>
              ))}
            </select>
            <DocumentCheckIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="estado-error" aria-live="polite" aria-atomic="true">
            {state.errors?.estado &&
              state.errors.estado.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
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
          href="/dashboard/gastos"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancelar
        </Link>
        <Button type="submit">Crear Gasto</Button>
      </div>
    </form>
  );
}
