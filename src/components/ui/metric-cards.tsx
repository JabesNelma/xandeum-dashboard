'use client';

import { useEffect, useState } from 'react';
import { MetricCard } from './metric-card';
import { Skeleton } from './skeleton';

interface Stats {
  totalNodes: number;
  activeNodes: number;
  inactiveNodes: number;
}

export function MetricCards({ stats }: { stats: Stats }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Calculate Healthy Index as percentage
  const healthyIndex = stats.totalNodes > 0 
    ? Math.round((stats.activeNodes / stats.totalNodes) * 100)
    : 0;

  if (!mounted) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
        <div className="h-32"><Skeleton className="h-full" /></div>
        <div className="h-32"><Skeleton className="h-full" /></div>
        <div className="h-32"><Skeleton className="h-full" /></div>
        <div className="h-32"><Skeleton className="h-full" /></div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
      <MetricCard label="Total Nodes" value={stats.totalNodes} />
      <MetricCard label="Active Nodes" value={stats.activeNodes} colorClass="text-emerald-600" />
      <MetricCard label="Inactive Nodes" value={stats.inactiveNodes} colorClass="text-red-600" />
      <MetricCard label="Healthy Index" value={`${healthyIndex}%`} colorClass="text-cyan-500" />
    </div>
  );
}
