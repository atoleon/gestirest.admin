import EditProveedorForm from '@/app/ui/proveedores/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchProveedorById } from '@/app/lib/proveedores/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Editar Proveedor',
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const proveedor = await fetchProveedorById(id);

  if (!proveedor) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Proveedores', href: '/dashboard/proveedores' },
          {
            label: 'Editar Proveedor',
            href: `/dashboard/proveedores/${id}/edit`,
            active: true,
          },
        ]}
      />
      <EditProveedorForm proveedor={proveedor} />
    </main>
  );
}
