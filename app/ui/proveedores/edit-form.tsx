'use client';

import { ProveedorFormData } from '@/app/lib/definitions';
import Link from 'next/link';
import {
  BuildingOfficeIcon,
  IdentificationIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { actualizarProveedor, State } from '@/app/lib/proveedores/actions';
import { useActionState } from 'react';

export default function EditProveedorForm({ proveedor }: { proveedor: ProveedorFormData }) {
  const initialState: State = { message: null, errors: {} };
  const actualizarProveedorConId = actualizarProveedor.bind(null, String(proveedor.id));
  const [state, formAction] = useActionState(actualizarProveedorConId, initialState);

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Nombre */}
        <div className="mb-4">
          <label htmlFor="nombre" className="mb-2 block text-sm font-medium">
            Nombre <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              id="nombre"
              name="nombre"
              type="text"
              defaultValue={proveedor.nombre}
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              aria-describedby="nombre-error"
            />
            <BuildingOfficeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
          <div id="nombre-error" aria-live="polite" aria-atomic="true">
            {state.errors?.nombre?.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>{error}</p>
            ))}
          </div>
        </div>

        {/* Razón social */}
        <div className="mb-4">
          <label htmlFor="razonSocial" className="mb-2 block text-sm font-medium">
            Razón social
          </label>
          <div className="relative">
            <input
              id="razonSocial"
              name="razonSocial"
              type="text"
              defaultValue={proveedor.razon_social ?? ''}
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            />
            <BuildingOfficeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
        </div>

        {/* CIF */}
        <div className="mb-4">
          <label htmlFor="cif" className="mb-2 block text-sm font-medium">
            CIF
          </label>
          <div className="relative">
            <input
              id="cif"
              name="cif"
              type="text"
              maxLength={10}
              defaultValue={proveedor.cif ?? ''}
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            />
            <IdentificationIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
        </div>

        {/* Dirección 1 */}
        <div className="mb-4">
          <label htmlFor="direccion1" className="mb-2 block text-sm font-medium">
            Dirección
          </label>
          <div className="relative">
            <input
              id="direccion1"
              name="direccion1"
              type="text"
              defaultValue={proveedor.direccion1 ?? ''}
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            />
            <MapPinIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
        </div>

        {/* Dirección 2 */}
        <div className="mb-4">
          <label htmlFor="direccion2" className="mb-2 block text-sm font-medium">
            Dirección 2
          </label>
          <div className="relative">
            <input
              id="direccion2"
              name="direccion2"
              type="text"
              defaultValue={proveedor.direccion2 ?? ''}
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            />
            <MapPinIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
        </div>

        {/* Código postal + Ciudad */}
        <div className="mb-4 flex gap-4">
          <div className="w-1/3">
            <label htmlFor="codigoPostal" className="mb-2 block text-sm font-medium">
              Código postal
            </label>
            <input
              id="codigoPostal"
              name="codigoPostal"
              type="text"
              defaultValue={proveedor.codigo_postal ?? ''}
              className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
            />
          </div>
          <div className="flex-1">
            <label htmlFor="ciudad" className="mb-2 block text-sm font-medium">
              Ciudad
            </label>
            <input
              id="ciudad"
              name="ciudad"
              type="text"
              defaultValue={proveedor.ciudad ?? ''}
              className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
            />
          </div>
        </div>

        {/* Provincia */}
        <div className="mb-4">
          <label htmlFor="provincia" className="mb-2 block text-sm font-medium">
            Provincia
          </label>
          <div className="relative">
            <input
              id="provincia"
              name="provincia"
              type="text"
              defaultValue={proveedor.provincia ?? ''}
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            />
            <MapPinIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
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
          href="/dashboard/proveedores"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancelar
        </Link>
        <Button type="submit">Actualizar Proveedor</Button>
      </div>
    </form>
  );
}
