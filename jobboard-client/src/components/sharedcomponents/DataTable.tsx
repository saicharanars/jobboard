"use client";

import React, { useState, useMemo, ReactElement } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Input } from "../ui/input";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  filters?: string[];
  customFilterColumn?: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  filters,
  customFilterColumn,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  const uniqueValues = useMemo(() => {
    const values: { [key: string]: Set<any> } = {};
    if (filters) {
      filters.forEach((filter) => {
        values[filter] = new Set(data.map((item: any) => item[filter]));
      });
    }
    return values;
  }, [data, filters]);
  const CustomFilterInput = () => (
    <Input
      placeholder={`Filter ${customFilterColumn}...`}
      value={
        (table
          .getColumn(customFilterColumn || "")
          ?.getFilterValue() as string) ?? ""
      }
      onChange={(event) =>
        table
          .getColumn(customFilterColumn || "")
          ?.setFilterValue(event.target.value)
      }
      className="max-w-sm"
    />
  );

  return (
    <div className="rounded-md border p-1 ">
      <div className="flex items-center justify-end py-4 space-x-2">
        {customFilterColumn && <CustomFilterInput />}
        {filters &&
          filters.length > 0 &&
          filters.map((filter) => (
            <Select
              key={filter}
              onValueChange={(value) =>
                table.getColumn(filter)?.setFilterValue(value || undefined)
              }
              value={
                (table.getColumn(filter)?.getFilterValue() as string) ??
                undefined
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={undefined}>{filter}</SelectItem>
                {Array.from(uniqueValues[filter] || []).map((value) => (
                  <SelectItem key={value} value={value}>
                    {value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ))}
      </div>

      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              className="bg-blue-700 hover:bg-blue-900 rounded-md  "
            >
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className="p-1 text-white  font-bold text-md capitalize"
                  >
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
          {table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && "selected"}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id} className="p-1 m-1">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex items-center  justify-end p-2 my-2 gap-2">
        <Button
          className="border rounded p-1"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
          variant={"link"}
        >
          <ChevronsLeft className="h-4 w-4" />
        </Button>
        <Button
          className="border rounded p-1"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          variant={"link"}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          className="border rounded p-1"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          variant={"link"}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
        <Button
          className="border rounded p-1"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          variant={"link"}
          disabled={!table.getCanNextPage()}
        >
          <ChevronsRight className="h-4 w-4" />
        </Button>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </strong>
        </span>
        <span className="flex items-center gap-1">
          | Go to page:
          <input
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            className="border p-1 rounded w-16"
          />
        </span>
        <Select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem
              value={table.getState().pagination.pageSize}
            ></SelectItem>

            {[10, 20, 30, 40, 50].map((pageSize) => (
              <SelectItem key={pageSize} value={pageSize}>
                Show {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
