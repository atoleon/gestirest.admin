'use client';

import { useEffect, useState } from 'react';
import { TrashIcon } from '@heroicons/react/24/outline';
import { useOrderProducto } from '@/app/contexts/order-producto';

export default function AddToOrderModal() {
  const {
    modalOpen,
    selectedProduct,
    order,
    addToOrder,
    removeFromOrder,
    clearOrder,
    closeModal,
  } = useOrderProducto();

  const [cantidad, setCantidad] = useState(1);

  useEffect(() => {
    setCantidad(1);
  }, [selectedProduct]);

  if (!modalOpen || !selectedProduct) return null;

  const handleAddAndContinuar = () => {
    if (cantidad > 0) {
      addToOrder({
        producto_id: selectedProduct.id,
        proveedor: selectedProduct.proveedor,
        descripcion: selectedProduct.descripcion,
        cantidad,
      });
    }
    closeModal();
  };

  const handleConfirmar = () => {
    if (cantidad > 0) {
      addToOrder({
        producto_id: selectedProduct.id,
        proveedor: selectedProduct.proveedor,
        descripcion: selectedProduct.descripcion,
        cantidad,
      });
    }
    clearOrder();
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="mx-4 w-full max-w-md rounded-xl bg-white shadow-2xl">
        {/* Header */}
        <div className="border-b px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-900">Añadir al pedido</h2>
        </div>

        <div className="p-6 space-y-5">
          {/* Producto seleccionado */}
          <div className="rounded-lg bg-blue-50 border border-blue-100 p-4">
            <p className="text-xs font-medium text-blue-500 uppercase tracking-wide mb-1">
              {selectedProduct.proveedor}
            </p>
            <p className="font-semibold text-gray-900">{selectedProduct.descripcion}</p>
          </div>

          {/* Input de cantidad */}
          <div>
            <label
              htmlFor="cantidad"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Cantidad a pedir
            </label>
            <input
              id="cantidad"
              type="number"
              min={1}
              value={cantidad}
              onChange={(e) => setCantidad(Math.max(1, Number(e.target.value)))}
              className="block w-32 rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Lista de productos en el pedido */}
          {order.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Pedido actual&nbsp;
                <span className="text-gray-400 font-normal">
                  ({order.length} {order.length === 1 ? 'producto' : 'productos'})
                </span>
              </h3>
              <ul className="max-h-44 overflow-y-auto divide-y divide-gray-100 rounded-lg border border-gray-200">
                {order.map((item) => (
                  <li
                    key={item.producto_id}
                    className="flex items-center justify-between px-3 py-2 text-sm"
                  >
                    <div className="min-w-0 flex-1 pr-3">
                      <p className="font-medium text-gray-800 truncate">{item.descripcion}</p>
                      <p className="text-xs text-gray-400">{item.proveedor}</p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-gray-500">× {item.cantidad}</span>
                      <button
                        onClick={() => removeFromOrder(item.producto_id)}
                        className="text-gray-300 hover:text-red-500 transition-colors"
                        aria-label="Quitar del pedido"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Botones */}
        <div className="border-t px-6 py-4 flex justify-end gap-3">
          <button
            onClick={handleAddAndContinuar}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Continuar
          </button>
          <button
            onClick={handleConfirmar}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500 transition-colors"
          >
            Confirmar pedido
          </button>
        </div>
      </div>
    </div>
  );
}
