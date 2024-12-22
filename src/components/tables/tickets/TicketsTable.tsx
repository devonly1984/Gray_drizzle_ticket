"use client";
import { TicketSearchResultsType } from "@/drizzle/queries/ticket.queries";
import { useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  getFacetedUniqueValues,
  SortingState,
  getSortedRowModel
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";
import { CircleCheckIcon, CircleXIcon,ArrowUpDown,ArrowUp,ArrowDown } from "lucide-react";
import {  ticketColumnHelper, ticketHeadersArray } from "./columnHeaders";
import { Button } from "@/components/ui/button";
import Filter from "../filters/Filter";
type Props = {
    data: TicketSearchResultsType;
}
const columns = ticketHeadersArray.map(columnName=>{
  return ticketColumnHelper.accessor(
    (row) => {
      const value = row[columnName];
      if (columnName === "ticketDate" && value instanceof Date) {
        return value.toLocaleDateString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        });
      }
      if (columnName === "completed") {
        return value ? "COMPLETED" : "OPEN";
      }
      return value;
    },
    {
      id: columnName,
      header: ({column: {getIsSorted, toggleSorting}})=>{
        return (
          <Button
            variant="ghost"
            className="pl-1 w-full flex justify-between"
            onClick={() => toggleSorting(getIsSorted() === "asc")}
          >
            {columnName[0].toUpperCase() + columnName[0].slice(1)}
            {getIsSorted() === "asc" && <ArrowUp className="size-4 ml-2" />}
            {getIsSorted() === "desc" && <ArrowDown className="size-4 ml-2" />}
            {getIsSorted() !== "asc" && getIsSorted() === "desc" && (
              <ArrowUpDown className="size-4 ml-2" />
            )}
          </Button>
        );
      },
      cell: ({getValue})=>{
        const value = getValue();
        if (columnName==='completed') {
          return (
            <div className="grid place-content-center">
              {value === "OPEN" ? (
                <CircleXIcon className="opacity-25" />
              ) : (
                <CircleCheckIcon className=" text-green-600" />
              )}
            </div>
          );
        }
        return value;
      }
    }
  );
})
const TicketsTable = ({data}:Props) => {
  const router = useRouter();
const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
const [sorting, setSorting] = useState<SortingState>([
  {
    id: "ticketDate",
    desc: false,
  },
]);
    const table = useReactTable({
      data,
      columns,
      state: {
        sorting,
        columnFilters,
      },
      initialState: {
        pagination: {
          pageSize: 10,
        },
      },
      onColumnFiltersChange: setColumnFilters,
      onSortingChange: setSorting,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      getFacetedUniqueValues: getFacetedUniqueValues(),
      getSortedRowModel: getSortedRowModel(),
    });
  return (
    <div className="mt-6 flex flex-col gap-4">
      <div className=" rounded-lg overflow-hidden border border-1">
        <Table className="border">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="bg-secondary p-1">
                    <div>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </div>
                    {header.column.getCanFilter() ? (
                      <div className="grid place-content-center">
                        <Filter column={header.column} />
                      </div>
                    ) : null}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                className="cursor-pointer hover:bg-border/25 dark:hover:bg-ring/40"
                onClick={() =>
                  router.push(`/tickets/form?ticketId=${row.original.id}`)
                }
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="border">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex basis-1/3 items-center">
          <p className="whitespace-nowrap font-bold">
            {`Page ${
              table.getState().pagination.pageIndex + 1
            } of ${table.getPageCount()}`}
            &nbsp;&nbsp;
            {`[${table.getFilteredRowModel().rows.length} ${
              table.getFilteredRowModel().rows.length !== 1
                ? "total results"
                : "result"
            }]`}
          </p>
        </div>

        <div className="space-x-1">
          <Button
            variant="outline"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button variant="outline" onClick={() => table.resetSorting()}>
            Reset Sorting
          </Button>
          <Button variant="outline" onClick={() => table.resetColumnFilters()}>
            Reset Filters
          </Button>
          <Button
            variant="outline"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
export default TicketsTable;