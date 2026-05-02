import {
  BanknotesIcon,
  ClockIcon,
  UserGroupIcon,
  InboxIcon,
} from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import {
  fetchCardData,
  fetchIncomingsCurrentMonth,
  fetchExpensesCurrentMonth,
} from "@/app/lib/data";
import { formatCurrency } from "@/app/lib/utils";

const iconMap = {
  collected: BanknotesIcon,
  customers: UserGroupIcon,
  pending: ClockIcon,
  invoices: InboxIcon,
};

export default async function CardWrapper() {
  const currentMonthName = new Date()
    .toLocaleString("es-ES", {
      month: "long",
    })
    .toUpperCase();

  const incomingCurrentMonth = await fetchIncomingsCurrentMonth();
  const expensesCurrentMonth = await fetchExpensesCurrentMonth();

  const { numberOfInvoices, numberOfCustomers } = await fetchCardData();

  return (
    <>
      <Card
        title={`INGRESOS ${currentMonthName}`}
        value={formatCurrency(incomingCurrentMonth)}
        type="collected"
        color="bg-green-100 text-green-700"
      />
      <Card
        title={`GASTOS ${currentMonthName}`}
        value={formatCurrency(expensesCurrentMonth)}
        type="collected"
        color="bg-red-100 text-red-700"
      />
      <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
      <Card
        title="Total Customers"
        value={numberOfCustomers}
        type="customers"
      />
    </>
  );
}

export function Card({
  title,
  value,
  type,
  color,
}: {
  title: string;
  value: number | string;
  type: "invoices" | "customers" | "pending" | "collected";
  color?: string;
}) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div
        className={`flex p-4 ${color ? color : "bg-gray-100 text-gray-700"} rounded-lg`}
      >
        {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p
        className={`${lusitana.className}
          truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
      >
        {value}
      </p>
    </div>
  );
}
