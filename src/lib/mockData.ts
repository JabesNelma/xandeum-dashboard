// src/lib/mockData.ts
import { XandeumPNode } from '@/types/xandeum';

export function generateMockData(): XandeumPNode[] {
  const mockNodes: XandeumPNode[] = [];
  const locations = ['New York, US', 'London, UK', 'Tokyo, JP', 'Frankfurt, DE', 'Singapore, SG', 'Sydney, AU', 'Toronto, CA', 'Amsterdam, NL'];
  const versions = ['1.2.3', '1.2.4', '1.2.5', '1.3.0', '1.3.1'];
  
  // Generate 241 nodes to match requirements
  for (let i = 0; i < 241; i++) {
    const isActive = i < 65; // First 65 are active, rest are inactive
    const pubkey = `EcTqAgBWJ8x4AB2AKcjLMF8k1j4HHPF2017${i.toString().padStart(3, '0')}...`;
    const uptime = isActive ? Math.floor(Math.random() * 800000) + 100000 : Math.floor(Math.random() * 300000) + 50000;
    const blocksProduced = isActive ? Math.floor(Math.random() * 10000) + 1000 : 0;
    const latency = isActive ? Math.floor(Math.random() * 200) + 50 : Math.floor(Math.random() * 500) + 200;
    
    mockNodes.push({
      pubkey,
      ip: `192.168.${Math.floor(i / 255)}.${i % 255 + 1}`,
      port: 8080,
      version: versions[Math.floor(Math.random() * versions.length)],
      lastVote: Date.now() - Math.floor(Math.random() * 1000000),
      status: isActive ? 'active' : 'inactive',
      uptime,
      blocksProduced,
      latency,
      location: locations[Math.floor(Math.random() * locations.length)],
    });
  }
  
  return mockNodes;
}
