// src/app/node-charts.tsx
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { XandeumPNode } from "@/types/xandeum";

interface NodeChartsProps {
  data: { name: string; count: number }[];
  nodes: XandeumPNode[];
}

export function NodeCharts({ data, nodes }: NodeChartsProps) {
  // Prepare uptime data for top 5 nodes
  const uptimeData = nodes
    .filter(node => node.uptime && node.uptime > 0)
    .sort((a, b) => (b.uptime || 0) - (a.uptime || 0))
    .slice(0, 5)
    .map(node => ({
      name: node.pubkey.slice(0, 8) + '...',
      uptimeDays: Math.floor((node.uptime || 0) / 86400) // Convert seconds to days
    }));

  // Colors for pie chart
  const COLORS = ['#10b981', '#ef4444', '#f59e0b']; // green, red, amber

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Node Status Distribution - Pie Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Node Status Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80" role="img" aria-label="Node status distribution pie chart">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="count"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          {/* Legend */}
          <div className="flex justify-center mt-4 space-x-6">
            {data.map((entry, index) => (
              <div key={entry.name} className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-2" 
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span className="text-sm text-slate-600">{entry.name}: {entry.count}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Node Uptime Distribution - Horizontal Bar Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Top 5 Nodes by Uptime</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80" role="img" aria-label="Top 5 nodes by uptime chart">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={uptimeData} layout="horizontal" margin={{ left: 20, right: 20, top: 10, bottom: 10 }}>
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 10 }} width={60} />
                <Tooltip formatter={(value) => [`${value} days`, 'Uptime']} />
                <Bar dataKey="uptimeDays" fill="#06b6d4" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
