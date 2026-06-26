'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function MonthPicker() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const currentMonth = new Date().toISOString().slice(0, 7);
  const selected = searchParams.get('mes') ?? currentMonth;

  function handleChange(value: string) {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set('mes', value);
    } else {
      params.delete('mes');
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <input
      type="month"
      value={selected}
      onChange={(e) => handleChange(e.target.value)}
      className="h-9 rounded-md border border-gray-200 px-3 text-sm outline-2 outline-blue-300 focus:outline-blue-500"
    />
  );
}
