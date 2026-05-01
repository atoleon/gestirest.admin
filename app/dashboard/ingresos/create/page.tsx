import Form from '@/app/ui/ingresos/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Crear Ingreso',
};

export default async function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Ingresos', href: '/dashboard/ingresos' },
          {
            label: 'Crear ingreso',
            href: '/dashboard/ingresos/create',
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}
