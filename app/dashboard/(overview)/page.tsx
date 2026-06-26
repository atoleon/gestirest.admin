import CardWrapper from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import ResumenGastos from '@/app/ui/dashboard/resumen-gastos';
import MonthPicker from '@/app/ui/dashboard/month-picker';
import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
import {
  RevenueChartSkeleton,
  LatestInvoicesSkeleton,
  CardsSkeleton,
} from '@/app/ui/skeletons';

export default async function Page({
  searchParams,
}: {
  searchParams?: Promise<{ mes?: string }>;
}) {
  const params = await searchParams;
  const mes = params?.mes;

  return (
    <main>
      <div className="flex items-center gap-4 mb-4">
        <h1 className={`${lusitana.className} text-xl md:text-2xl`}>
          Dashboard
        </h1>
        <Suspense>
          <MonthPicker />
        </Suspense>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper mes={mes} />
        </Suspense>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
        </Suspense>
        <Suspense fallback={<LatestInvoicesSkeleton />}>
          <ResumenGastos mes={mes} />
        </Suspense>
      </div>
    </main>
  );
}
