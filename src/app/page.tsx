// src/app/page.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchPNodes } from "@/lib/xandeum-service";
import { XandeumPNode } from "@/types/xandeum";
import { NodeTable } from "@/components/nodes/node-table";
import { NodeCharts } from "./node-charts"; // Impor komponen baru untuk grafik
import { MetricCards } from '@/components/ui/metric-cards';
import { TypingEffect } from '@/components/ui/typing-effect';
import { RefreshButton } from '@/components/ui/refresh-button';
import { generateMockData } from '@/lib/mockData';

const calculateStats = (nodes: XandeumPNode[]) => {
  const totalNodes = nodes.length;
  const activeNodes = nodes.filter(node => node.status === 'active').length;
  const inactiveNodes = nodes.filter(node => node.status === 'inactive').length;

  return { totalNodes, activeNodes, inactiveNodes };
};

export default async function DashboardPage() {
  let nodes: XandeumPNode[] = [];
  let stats = { totalNodes: 0, activeNodes: 0, inactiveNodes: 0 };
  let chartData: { name: string; count: number }[] = [];
  let hadError = false;
  let lastUpdated = new Date().toLocaleString();

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
    // Use mock data if API fails
    nodes = generateMockData();
    stats = calculateStats(nodes);
    lastUpdated = new Date().toLocaleString();
  }

  return (
    <div className="container mx-auto py-12">
      {/* Hero Section with Typing Effect */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">
          Xandeum Network – pNode Analytics
        </h1>
        <div className="flex items-center justify-between mb-4">
          <div className="text-lg">
            <TypingEffect 
              phrases={[
                "Monitor Your pNode Performance.",
                "Real-Time Network Analytics.",
                "The Storage Layer for Solana dApps.",
                "Live from the pRPC Gossip."
              ]}
              className="subtitle"
            />
          </div>
        </div>
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-slate-500">
            Last Updated: {lastUpdated}
          </p>
          <RefreshButton />
        </div>
      </div>

      <div>
        {/* Use client-side MetricCards to get hydration skeletons */}
        <MetricCards stats={stats} />
      </div>

      {/* Render komponen grafik sebagai Client Component */}
      {hadError ? (
        <div className="mb-6 p-4 bg-amber-50 border border-amber-100 text-amber-800 rounded-md">
          Using mock data - connection to pRPC failed. Please check server configuration.
        </div>
      ) : null}
      
      <NodeCharts data={chartData} nodes={nodes} />

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Node List</CardTitle>
        </CardHeader>
        <CardContent>
          <NodeTable data={nodes} />
        </CardContent>
      </Card>

      {/* Footer */}
      <footer className="mt-12 text-center text-sm text-slate-500">
        <p>Xandeum Network – pNode Analytics Dashboard. Data sourced from pRPC.</p>
      </footer>
    </div>
  );
}
