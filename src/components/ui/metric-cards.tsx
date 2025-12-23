'use client';

import { useEffect, useState } from 'react';
import { MetricCard } from './metric-card';
import { Skeleton } from './skeleton';

interface Stats {
  totalNodes: number;
  activeNodes: number;
  inactiveNodes: number;
  syncingNodes: number;
}

export function MetricCards({ stats }: { stats: Stats }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="h-28"><Skeleton className="h-full" /></div>
        <div className="h-28"><Skeleton className="h-full" /></div>
        <div className="h-28"><Skeleton className="h-full" /></div>
        <div className="h-28"><Skeleton className="h-full" /></div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <MetricCard label="Total Nodes" value={stats.totalNodes} />
      <MetricCard label="Active Nodes" value={stats.activeNodes} colorClass="text-emerald-500" />
      <MetricCard label="Inactive Nodes" value={stats.inactiveNodes} colorClass="text-red-400" />
      <MetricCard label="Syncing Nodes" value={stats.syncingNodes} colorClass="text-amber-500" />
    </div>
  );
}
