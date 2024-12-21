"use client";
import { TicketSearchResultsType } from "@/drizzle/queries/ticket.queries";

import {
  flexRender,
  getCoreRowModel,
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
import { useRouter } from "next/navigation";
import { CircleCheckIcon, CircleXIcon } from "lucide-react";
import {  ticketColumnHelper, ticketHeadersArray } from "./columnHeaders";
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
      header: columnName[0].toUpperCase() + columnName[0].slice(1),
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
    const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
    });
  return (
    <div className="mt-6 rounded-lg overflow-hidden border border-1">
      <Table className="border">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} className="bg-secondary">
                  <div>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </div>
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
  );
}
export default TicketsTable;