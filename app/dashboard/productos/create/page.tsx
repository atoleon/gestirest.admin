import CrearProductoForm from '@/app/ui/productos/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchProveedoresParaProductos } from '@/app/lib/productos/data';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Crear Producto',
};

export default async function Page() {
  const proveedores = await fetchProveedoresParaProductos();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Productos', href: '/dashboard/productos' },
          {
            label: 'Crear producto',
            href: '/dashboard/productos/create',
            active: true,
          },
        ]}
      />
      <CrearProductoForm proveedores={proveedores} />
    </main>
  );
}
