'use client';

import { useState, useEffect } from 'react';
import { TrashIcon, TruckIcon } from '@heroicons/react/24/outline';
import { OrderProducto } from '@/app/lib/definitions';

const STORAGE_KEY = 'pedido_actual';

export default function OrderTable() {
  const [order, setOrder] = useState<OrderProducto[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setOrder(JSON.parse(saved));
  }, []);

  const save = (newOrder: OrderProducto[]) => {
    setOrder(newOrder);
    if (newOrder.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newOrder));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const updateCantidad = (producto_id: number, cantidad: number) => {
    save(order.map((o) => (o.producto_id === producto_id ? { ...o, cantidad } : o)));
  };

  const remove = (producto_id: number) => {
    save(order.filter((o) => o.producto_id !== producto_id));
  };

  const clearAll = () => {
    setOrder([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  if (order.length === 0) {
    return (
      <div className="mt-6 rounded-lg bg-gray-50 p-10 text-center text-gray-400">
        No hay productos en el pedido actual.
      </div>
    );
  }

  const grouped = order.reduce<Record<string, OrderProducto[]>>((acc, item) => {
    if (!acc[item.proveedor]) acc[item.proveedor] = [];
    acc[item.proveedor].push(item);
    return acc;
  }, {});

  const totalArticulos = order.length;

  return (
    <div className="mt-6 space-y-6">
      {Object.entries(grouped).map(([proveedor, items]) => (
        <div key={proveedor} className="overflow-hidden rounded-lg bg-gray-50">
          {/* Cabecera del proveedor */}
          <div className="flex items-center gap-2 border-b border-gray-200 bg-gray-100 px-5 py-3">
            <TruckIcon className="w-4 h-4 text-gray-500 shrink-0" />
            <span className="font-semibold text-gray-700">{proveedor}</span>
            <span className="ml-1 text-sm text-gray-400">
              · {items.length} {items.length === 1 ? 'artículo' : 'artículos'}
            </span>
          </div>

          {/* Tabla de artículos */}
          <table className="min-w-full bg-white text-sm text-gray-900">
            <thead>
              <tr className="border-b border-gray-100 text-left text-xs font-medium uppercase text-gray-500">
                <th className="px-5 py-3">Descripción</th>
                <th className="px-5 py-3 w-40">Cantidad</th>
                <th className="px-5 py-3 w-12"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {items.map((item) => (
                <tr key={item.producto_id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3">{item.descripcion}</td>
                  <td className="px-5 py-3">
                    <input
                      type="number"
                      min={1}
                      value={item.cantidad}
                      onChange={(e) =>
                        updateCantidad(item.producto_id, Math.max(1, Number(e.target.value)))
                      }
                      className="w-24 rounded-md border border-gray-300 px-2 py-1 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-5 py-3">
                    <button
                      onClick={() => remove(item.producto_id)}
                      className="rounded-md p-1 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500"
                      aria-label="Eliminar artículo"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-gray-200 pt-4">
        <p className="text-sm text-gray-500">
          {Object.keys(grouped).length} {Object.keys(grouped).length === 1 ? 'proveedor' : 'proveedores'} ·{' '}
          {totalArticulos} {totalArticulos === 1 ? 'artículo' : 'artículos'} en total
        </p>
        <button
          onClick={clearAll}
          className="text-sm text-red-400 transition-colors hover:text-red-600"
        >
          Vaciar pedido
        </button>
      </div>
    </div>
  );
}
