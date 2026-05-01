import Form from '@/app/ui/proveedores/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Crear Proveedor',
};

export default async function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Proveedores', href: '/dashboard/proveedores' },
          {
            label: 'Crear proveedor',
            href: '/dashboard/proveedores/create',
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}
