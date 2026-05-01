'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function DateFilter() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  function handleChange(key: 'from' | 'to', value: string) {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex items-center gap-2">
      <input
        type="date"
        aria-label="Desde"
        className="h-10 rounded-md border border-gray-200 px-3 text-sm outline-2"
        defaultValue={searchParams.get('from') ?? ''}
        onChange={(e) => handleChange('from', e.target.value)}
      />
      <span className="text-sm text-gray-500">—</span>
      <input
        type="date"
        aria-label="Hasta"
        className="h-10 rounded-md border border-gray-200 px-3 text-sm outline-2"
        defaultValue={searchParams.get('to') ?? ''}
        onChange={(e) => handleChange('to', e.target.value)}
      />
    </div>
  );
}
