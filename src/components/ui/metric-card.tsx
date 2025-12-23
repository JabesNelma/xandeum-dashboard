'use client';

interface MetricCardProps {
  label: string;
  value: string | number | null | undefined;
  colorClass?: string;
}

export function MetricCard({ label, value, colorClass = 'text-slate-900' }: MetricCardProps) {
  return (
    <div className="h-32 md:h-36 rounded-md border border-slate-200 bg-white p-4 flex flex-col justify-between shadow-sm">
      <div className="flex items-start justify-between">
        <div className="text-xs uppercase tracking-wide text-slate-500 font-medium">{label}</div>
      </div>

      <div className={`mt-2 text-3xl md:text-4xl font-extrabold tabular-nums leading-tight ${colorClass}`}>
        {value ?? '—'}
      </div>

    </div>
  );
}
