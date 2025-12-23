// src/app/node-charts.tsx
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // Impor Card dari shadcn
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface NodeChartsProps {
  data: { name: string; count: number }[];
}

export function NodeCharts({ data }: NodeChartsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <Card>
        <CardHeader>
          <CardTitle>Node Status Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80" role="img" aria-label="Node status distribution chart">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ left: 0, right: 8, top: 8, bottom: 8 }}>
                <XAxis dataKey="name" axisLine={{ stroke: '#cbd5e1' }} tick={{ fill: '#64748b' }} />
                <YAxis axisLine={false} tick={{ fill: '#64748b' }} />
                <Tooltip wrapperStyle={{ borderRadius: 6 }} />
                <Bar dataKey="count" name="Node Count" fill="#06b6d4" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}