'use client';

import { IngresoForm } from '@/app/lib/definitions';
import Link from 'next/link';
import {
  CalendarIcon,
  CurrencyDollarIcon,
  DocumentIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { actualizarIngreso, State } from '@/app/lib/ingresos/actions';
import { tipoIngreso } from '@/app/lib/data-sets';
import { useActionState } from 'react';

export default function EditIngresoForm({ ingreso }: { ingreso: IngresoForm }) {
  const initialState: State = { message: null, errors: {} };
  const actualizarIngresoConId = actualizarIngreso.bind(null, String(ingreso.id));
  const [state, formAction] = useActionState(actualizarIngresoConId, initialState);
  const fecha = new Date(ingreso.fecha).toLocaleDateString('en-CA');
  
  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
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
                defaultValue={fecha ?? ''}
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

        {/* Tipo de ingreso */}
        <div className="mb-4">
          <label htmlFor="tipo-ingreso" className="mb-2 block text-sm font-medium">
            Tipo de ingreso
          </label>
          <div className="relative">
            <select
              id="tipo-ingreso"
              name="tipoIngreso"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={ingreso.tipo_ingreso}
              aria-describedby="tipo-ingreso-error"
            >
              <option value="" disabled>Selecciona tipo</option>
              {tipoIngreso.map((tipo) => (
                <option key={tipo} value={tipo}>{tipo}</option>
              ))}
            </select>
            <DocumentIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="tipo-ingreso-error" aria-live="polite" aria-atomic="true">
            {state.errors?.tipoIngreso?.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>{error}</p>
            ))}
          </div>
        </div>

        {/* Efectivo */}
        <div className="mb-4">
          <label htmlFor="efectivo" className="mb-2 block text-sm font-medium">
            Efectivo (€)
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="efectivo"
                name="efectivo"
                type="number"
                step="0.01"
                min="0"
                defaultValue={ingreso.efectivo}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="efectivo-error"
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div id="efectivo-error" aria-live="polite" aria-atomic="true">
            {state.errors?.efectivo?.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>{error}</p>
            ))}
          </div>
        </div>

        {/* Tarjeta */}
        <div className="mb-4">
          <label htmlFor="tarjeta" className="mb-2 block text-sm font-medium">
            Tarjeta (€)
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="tarjeta"
                name="tarjeta"
                type="number"
                step="0.01"
                min="0"
                defaultValue={ingreso.tarjeta}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="tarjeta-error"
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div id="tarjeta-error" aria-live="polite" aria-atomic="true">
            {state.errors?.tarjeta?.map((error: string) => (
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
          href="/dashboard/ingresos"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancelar
        </Link>
        <Button type="submit">Actualizar Ingreso</Button>
      </div>
    </form>
  );
}
