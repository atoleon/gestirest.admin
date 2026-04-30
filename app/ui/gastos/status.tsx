import { CheckIcon, ClockIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function GastoEstado({ status }: { status: string }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-xs',
        {
          'bg-red-600 text-white': status === 'Pendiente',
          'bg-green-500 text-white': status === 'Pagado',
        },
      )}
    >
      {status === 'Pendiente' ? (
        <>
          Pendiente
          <ClockIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
      {status === 'Pagado' ? (
        <>
          Pagado
          <CheckIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
    </span>
  );
}
