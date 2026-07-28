"use client";

import * as React from "react";
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

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  return (
    <div className="space-y-6">
      {/* Search Input Filter */}
      <div className="flex justify-between items-center">
        <Input
          placeholder="SEARCH PRODUCTS..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="border-2 rounded-lg focus-visible:ring-primary max-w-sm h-12 font-bold placeholder:text-muted-foreground/60 uppercase"
        />
      </div>

      {/* Styled Table Body Container */}
      <div className="bg-card/40 backdrop-blur-sm border-2 border-border/60 rounded-xl overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/40 border-border/60 border-b-2">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="hover:bg-transparent border-b-border/60"
              >
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="h-14">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="hover:bg-primary/5 border-border/40 border-b transition-colors duration-200"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-4">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-64 text-center"
                >
                  <div className="flex flex-col items-center gap-2">
                    <span className="font-extrabold text-primary text-2xl uppercase">
                      NO PRODUCTS FOUND !
                    </span>
                    <span className="font-semibold text-muted-foreground text-sm uppercase">
                      TRY SEARCHING FOR SOMETHING ELSE
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls matching your button style */}
      <div className="flex justify-between items-center py-2">
        <span className="font-black text-muted-foreground text-xs uppercase tracking-widest">
          PAGE {table.getState().pagination.pageIndex + 1} OF{" "}
          {table.getPageCount() || 1}
        </span>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="hover:bg-primary disabled:opacity-30 border-2 rounded-lg font-extrabold hover:text-primary-foreground uppercase transition-all duration-300"
          >
            PREVIOUS
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="hover:bg-primary disabled:opacity-30 border-2 rounded-lg font-extrabold hover:text-primary-foreground uppercase transition-all duration-300"
          >
            NEXT
          </Button>
        </div>
      </div>
    </div>
  );
}
