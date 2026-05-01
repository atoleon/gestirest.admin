import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { borrarProveedor } from '@/app/lib/proveedores/actions';

export function CrearProveedor() {
  return (
    <Link
      href="/dashboard/proveedores/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Crear proveedor</span>
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function ActualizarProveedor({ id }: { id: number }) {
  return (
    <Link
      href={`/dashboard/proveedores/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function BorrarProveedor({ id }: { id: number }) {
  const borrarProveedorConId = borrarProveedor.bind(null, String(id));

  return (
    <form action={borrarProveedorConId}>
      <button type="submit" className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Borrar</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}
