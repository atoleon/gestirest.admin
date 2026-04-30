import EditGastoForm from '@/app/ui/gastos/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchGastoById, fetchProveedores } from '@/app/lib/gastos/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Editar Gasto',
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const [gasto, proveedores] = await Promise.all([
    fetchGastoById(id),
    fetchProveedores(),
  ]);

  if (!gasto) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Gastos', href: '/dashboard/gastos' },
          {
            label: 'Editar Gasto',
            href: `/dashboard/gastos/${id}/edit`,
            active: true,
          },
        ]}
      />
      <EditGastoForm gasto={gasto} proveedores={proveedores} />
    </main>
  );
}
