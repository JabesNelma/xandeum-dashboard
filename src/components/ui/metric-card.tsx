'use client';

interface MetricCardProps {
  label: string;
  value: string | number | null | undefined;
  colorClass?: string;
}

export function MetricCard({ label, value, colorClass = 'text-slate-700' }: MetricCardProps) {
  return (
    <div className="h-28 rounded-md shadow-sm border bg-white p-4 flex flex-col justify-between">
      <div className="text-xs uppercase tracking-wider text-slate-500">{label}</div>
      <div className={`text-3xl md:text-4xl font-extrabold tabular-nums ${colorClass}`}>{value ?? '—'}</div>
    </div>
  );
}
