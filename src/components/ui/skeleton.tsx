'use client';

export function Skeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`bg-slate-200/50 animate-pulse rounded ${className}`} aria-hidden />
  );
}
