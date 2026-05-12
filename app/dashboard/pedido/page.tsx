import { lusitana } from '@/app/ui/fonts';
import { Metadata } from 'next';
import OrderTable from '@/app/ui/pedido/order-table';

export const metadata: Metadata = {
  title: 'Pedido',
};

export default function Page() {
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Pedido</h1>
      </div>
      <OrderTable />
    </div>
  );
}
