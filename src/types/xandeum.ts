// src/types/xandeum.ts

export interface XandeumPNode {
  pubkey: string;      // Public key unik pNode
  ip: string;          // Alamat IP pNode
  port: number;        // Port komunikasi
  version: string;     // Versi software pNode
  lastVote?: number;   // Timestamp vote terakhir (jika ada)
  status: 'active' | 'inactive' | 'syncing' | 'unknown'; // Status saat ini
  uptime?: number;     // Uptime dalam detik
  blocksProduced?: number; // Jumlah blok yang dihasilkan
  latency?: number;    // Latency jaringan ke pNode ini
  location?: string;   // Lokasi geografis opsional
}

export interface XandeumNetworkStats {
  totalNodes: number;
  activeNodes: number;
  inactiveNodes: number;
  avgUptime: number;
  latestBlock: number;
}

export interface PNodeRpcResponse {
  jsonrpc: string;
  id: string;
  result?: any;
  error?: {
    code: number;
    message: string;
  };
}