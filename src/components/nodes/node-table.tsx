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
import { useState } from "react";
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

// Definisi kolom untuk DataTable
const columns: ColumnDef<XandeumPNode>[] = [
  {
    accessorKey: "pubkey",
    header: "Public Key",
    cell: ({ row }) => <div className="font-mono text-sm break-all text-slate-700">{row.getValue("pubkey")}</div>,
  },
  {
    accessorKey: "ip",
    header: "IP Address",
    cell: ({ row }) => <div className="font-mono text-sm text-slate-600">{row.getValue("ip")}</div>,
  },
  {
    accessorKey: "version",
    header: "Version",
    cell: ({ row }) => <div>{row.getValue("version")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      let statusColor = "bg-slate-400"; // Default muted
      if (status === 'active') statusColor = "bg-emerald-400";
      if (status === 'inactive') statusColor = "bg-red-400";
      if (status === 'syncing') statusColor = "bg-amber-400";

      return (
        <div className="flex items-center">
          <div className={`h-2 w-2 rounded-full mr-2 ${statusColor}`} />
          <div className="text-sm text-slate-600 capitalize">{status}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "uptime",
    header: "Uptime (s)",
    cell: ({ row }) => <div>{row.getValue("uptime")}</div>,
  },
  {
    accessorKey: "blocksProduced",
    header: "Blocks Produced",
    cell: ({ row }) => <div>{row.getValue("blocksProduced")}</div>,
  },
  {
    accessorKey: "latency",
    header: "Latency (ms)",
    cell: ({ row }) => <div>{row.getValue("latency")}</div>,
  },
  {
    accessorKey: "location",
    header: "Location",
    cell: ({ row }) => <div>{row.getValue("location") || 'N/A'}</div>,
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
      <div className="rounded-md border shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="bg-slate-50/20">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
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
      <div className="flex items-center justify-end space-x-2 py-4">
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