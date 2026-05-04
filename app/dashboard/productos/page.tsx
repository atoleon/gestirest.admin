import Pagination from '@/app/ui/invoices/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/productos/table';
import { CrearProducto } from '@/app/ui/productos/buttons';
import DateFilter from '@/app/ui/dashboard/date-filter';
import { lusitana } from '@/app/ui/fonts';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchProductosPaginas } from '@/app/lib/productos/data';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Productos',
};

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
    from?: string;
    to?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const from = searchParams?.from || '';
  const to = searchParams?.to || '';

  const totalPages = await fetchProductosPaginas(query, from, to);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Productos</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Buscar producto..." />
        <DateFilter />
        <CrearProducto />
      </div>
      <Suspense key={query + currentPage + from + to} fallback={<InvoicesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} from={from} to={to} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
