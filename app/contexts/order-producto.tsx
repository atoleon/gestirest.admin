'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { OrderProducto } from '@/app/lib/definitions';

const STORAGE_KEY = 'pedido_actual';

type ModalProduct = {
  id: number;
  proveedor: string;
  descripcion: string;
};

type OrderProductoContextType = {
  order: OrderProducto[];
  addToOrder: (item: OrderProducto) => void;
  removeFromOrder: (producto_id: number) => void;
  clearOrder: () => void;
  modalOpen: boolean;
  selectedProduct: ModalProduct | null;
  openModal: (product: ModalProduct) => void;
  closeModal: () => void;
};

const OrderProductoContext = createContext<OrderProductoContextType | null>(null);

export function OrderProductoProvider({ children }: { children: ReactNode }) {
  const [order, setOrder] = useState<OrderProducto[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ModalProduct | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setOrder(JSON.parse(saved));
  }, []);

  const saveOrder = (newOrder: OrderProducto[]) => {
    setOrder(newOrder);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newOrder));
  };

  const addToOrder = (item: OrderProducto) => {
    const existing = order.find((o) => o.producto_id === item.producto_id);
    const newOrder = existing
      ? order.map((o) =>
          o.producto_id === item.producto_id
            ? { ...o, cantidad: o.cantidad + item.cantidad }
            : o
        )
      : [...order, item];
    saveOrder(newOrder);
  };

  const removeFromOrder = (producto_id: number) => {
    saveOrder(order.filter((o) => o.producto_id !== producto_id));
  };

  const clearOrder = () => {
    setOrder([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  const openModal = (product: ModalProduct) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  return (
    <OrderProductoContext.Provider
      value={{
        order,
        addToOrder,
        removeFromOrder,
        clearOrder,
        modalOpen,
        selectedProduct,
        openModal,
        closeModal,
      }}
    >
      {children}
    </OrderProductoContext.Provider>
  );
}

export function useOrderProducto() {
  const ctx = useContext(OrderProductoContext);
  if (!ctx) throw new Error('useOrderProducto must be used within OrderProductoProvider');
  return ctx;
}
