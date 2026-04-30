import { fetchProveedores } from '@/app/lib/gastos/data';
import Form from '@/app/ui/gastos/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Crear Gasto',
};

export default async function Page() {
  const proveedores = await fetchProveedores();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Gastos', href: '/dashboard/gastos' },
          {
            label: 'Crear gasto',
            href: '/dashboard/gastos/create',
            active: true,
          },
        ]}
      />
      <Form proveedores={proveedores} />
    </main>
  );
}
