import EditProductoForm from '@/app/ui/productos/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchProductoById, fetchProveedoresParaProductos } from '@/app/lib/productos/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Editar Producto',
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const [producto, proveedores] = await Promise.all([
    fetchProductoById(id),
    fetchProveedoresParaProductos(),
  ]);

  if (!producto) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Productos', href: '/dashboard/productos' },
          {
            label: 'Editar Producto',
            href: `/dashboard/productos/${id}/edit`,
            active: true,
          },
        ]}
      />
      <EditProductoForm producto={producto} proveedores={proveedores} />
    </main>
  );
}
