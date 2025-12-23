// src/app/page.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchPNodes } from "@/lib/xandeum-service";
import { XandeumPNode } from "@/types/xandeum";
import { NodeTable } from "@/components/nodes/node-table";
import { NodeCharts } from "./node-charts"; // Impor komponen baru untuk grafik
import { MetricCards } from '@/components/ui/metric-cards';

const calculateStats = (nodes: XandeumPNode[]) => {
  const totalNodes = nodes.length;
  const activeNodes = nodes.filter(node => node.status === 'active').length;
  const inactiveNodes = nodes.filter(node => node.status === 'inactive').length;
  const syncingNodes = nodes.filter(node => node.status === 'syncing').length;

  return { totalNodes, activeNodes, inactiveNodes, syncingNodes };
};

export default async function DashboardPage() {
  let nodes: XandeumPNode[] = [];
  let stats = { totalNodes: 0, activeNodes: 0, inactiveNodes: 0, syncingNodes: 0 };
  let chartData = [];
  let hadError = false;

  try {
    nodes = await fetchPNodes();
    stats = calculateStats(nodes);

    // Siapkan data grafik di server
    const statusCounts = nodes.reduce((acc, node) => {
      acc[node.status] = (acc[node.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    chartData = Object.entries(statusCounts).map(([status, count]) => ({
      name: status.charAt(0).toUpperCase() + status.slice(1),
      count: count,
    }));
  } catch (error) {
    console.error("Failed to load dashboard data", error);
    hadError = true;
  }

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-1">
        Xandeum Network – pNode Analytics
      </h1>
      <p className="text-sm text-slate-500 mb-6">Live data from pNode RPC — infrastructure metrics</p>

      <div>
        {/* Use client-side MetricCards to get hydration skeletons */}
        <MetricCards stats={stats} />
      </div>

      {/* Render komponen grafik sebagai Client Component */}
      {hadError ? (
        <div className="mb-6 p-4 bg-amber-50 border border-amber-100 text-amber-800 rounded-md">
          Terjadi kesalahan saat mengambil data node. Periksa konfigurasi server atau lihat console untuk detail.
        </div>
      ) : (
        <NodeCharts data={chartData} />
      )}

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Node List</CardTitle>
        </CardHeader>
        <CardContent>
          <NodeTable data={nodes} />
        </CardContent>
      </Card>
    </div>
  );
}