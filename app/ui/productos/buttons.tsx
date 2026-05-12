'use client';

import { PencilIcon, PlusIcon, ShoppingCartIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { borrarProducto } from '@/app/lib/productos/actions';
import { useOrderProducto } from '@/app/contexts/order-producto';

export function CrearProducto() {
  return (
    <Link
      href="/dashboard/productos/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Crear producto</span>
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function ActualizarProducto({ id }: { id: number }) {
  return (
    <Link
      href={`/dashboard/productos/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function BorrarProducto({ id }: { id: number }) {
  const borrarProductoConId = borrarProducto.bind(null, String(id));

  return (
    <form action={borrarProductoConId}>
      <button type="submit" className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Borrar</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}

export function AñadirAlPedido({
  id,
  proveedor,
  descripcion,
}: {
  id: number;
  proveedor: string;
  descripcion: string;
}) {
  const { openModal } = useOrderProducto();

  return (
    <button
      onClick={() => openModal({ id, proveedor, descripcion })}
      className="rounded-md border p-2 hover:bg-blue-50 hover:border-blue-300 transition-colors"
      aria-label="Añadir al pedido"
    >
      <ShoppingCartIcon className="w-5 text-blue-600" />
    </button>
  );
}
