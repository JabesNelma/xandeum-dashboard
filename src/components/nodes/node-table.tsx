'use client';

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { XandeumPNode } from "@/types/xandeum";

// Helper function to format uptime
function formatUptime(seconds: number | undefined): string {
  if (!seconds || seconds === 0) return 'N/A';
  
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  
  const parts = [];
  if (days > 0) parts.push(`${days}d`);
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  
  return parts.length > 0 ? parts.join(' ') : '< 1m';
}

// Helper function to truncate public key
function truncatePubkey(pubkey: string): string {
  if (pubkey.length <= 12) return pubkey;
  return pubkey.slice(0, 12) + '...';
}

// Definisi kolom untuk DataTable
const columns: ColumnDef<XandeumPNode>[] = [
  {
    accessorKey: "pubkey",
    header: "Public Key",
    cell: ({ row }) => {
      const pubkey = row.getValue("pubkey") as string;
      return (
        <div className="font-mono text-sm text-slate-700 max-w-[20rem] truncate" title={pubkey}>
          {truncatePubkey(pubkey)}
        </div>
      );
    },
  },
  {
    accessorKey: "ip",
    header: "IP Address",
    cell: ({ row }) => (
      <div className="font-mono text-sm text-slate-600 max-w-[12rem] truncate" title={String(row.getValue("ip"))}>
        {row.getValue("ip")}
      </div>
    ),
  },
  {
    accessorKey: "version",
    header: "Version",
    cell: ({ row }) => <div className="text-sm">{row.getValue("version")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      let statusColor = "bg-slate-400"; // Default muted
      let badgeColor = "bg-slate-100 text-slate-600"; // Default badge
      if (status === 'active') {
        statusColor = "bg-emerald-500";
        badgeColor = "bg-emerald-100 text-emerald-800";
      }
      if (status === 'inactive') {
        statusColor = "bg-red-500";
        badgeColor = "bg-red-100 text-red-800";
      }
      if (status === 'syncing') {
        statusColor = "bg-amber-500";
        badgeColor = "bg-amber-100 text-amber-800";
      }

      return (
        <div className="flex items-center">
          <div className={`h-2.5 w-2.5 rounded-full mr-3 ${statusColor} ring-1 ring-slate-100`} aria-hidden />
          <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${badgeColor}`}>
            {status}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "uptime",
    header: "Uptime",
    cell: ({ row }) => {
      const uptime = row.getValue("uptime") as number;
      return <div className="text-sm">{formatUptime(uptime)}</div>;
    },
  },
  {
    accessorKey: "blocksProduced",
    header: "Blocks Produced",
    cell: ({ row }) => {
      const blocks = row.getValue("blocksProduced") as number;
      return <div className="text-sm tabular-nums">{blocks?.toLocaleString() || 0}</div>;
    },
  },
  {
    accessorKey: "latency",
    header: "Latency (ms)",
    cell: ({ row }) => {
      const latency = row.getValue("latency") as number;
      return <div className="text-sm tabular-nums">{latency?.toLocaleString() || 'N/A'}</div>;
    },
  },
  {
    accessorKey: "location",
    header: "Location",
    cell: ({ row }) => <div className="text-sm">{row.getValue("location") || 'N/A'}</div>,
  },
];

interface NodeTableProps {
  data: XandeumPNode[];
}

export function NodeTable({ data }: NodeTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      {/* Baris Filter Global */}
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter by IP or PubKey..."
          value={(table.getColumn("ip")?.getFilterValue() as string) ?? (table.getColumn("pubkey")?.getFilterValue() as string) ?? ""}
          onChange={(event) => {
            // Kita bisa memilih satu kolom utama untuk filter global, atau buat logika filter kustom
            // Untuk sederhananya, kita gunakan filter pada kolom 'ip'
            table.getColumn("ip")?.setFilterValue(event.target.value);
            // Jika ingin filter global pada banyak kolom, diperlukan logika tambahan di getFilteredRowModel
          }}
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border border-slate-200 shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="bg-slate-50">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="text-xs uppercase tracking-wide text-slate-500 font-medium">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {!mounted ? (
              // Show skeleton rows while hydrating
              Array.from({ length: Math.max(6, data.length || 6) }).map((_, i) => (
                <TableRow key={`skeleton-${i}`}>
                  {Array.from({ length: columns.length }).map((__, j) => (
                    <TableCell key={`s-${i}-${j}`}>
                      <div className="h-4 w-full bg-slate-200/50 animate-pulse rounded" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="hover:bg-slate-50 transition-colors"
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-sm text-slate-500"
                >
                  No results — try a different filter or check the data source.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* Pagination */}
      <div className="node-table-pagination flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div> 
    </div>
  );
}