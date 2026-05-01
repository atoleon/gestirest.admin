import EditIngresoForm from '@/app/ui/ingresos/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchIngresoById } from '@/app/lib/ingresos/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Editar Ingreso',
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const ingreso = await fetchIngresoById(id);

  if (!ingreso) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Ingresos', href: '/dashboard/ingresos' },
          {
            label: 'Editar Ingreso',
            href: `/dashboard/ingresos/${id}/edit`,
            active: true,
          },
        ]}
      />
      <EditIngresoForm ingreso={ingreso} />
    </main>
  );
}
