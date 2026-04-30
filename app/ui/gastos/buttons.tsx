import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { borrarGasto } from '@/app/lib/gastos/actions';

export function CrearGasto() {
  return (
    <Link
      href="/dashboard/gastos/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Crear gasto</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function ActualizarGasto({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/gastos/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function BorrarGasto({ id }: { id: string }) {
  const borrarGastoConId = borrarGasto.bind(null, id);

  return (
    <form action={borrarGastoConId}>
      <button type="submit" className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Borrar</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}
