import {CircleCheckIcon,CircleXIcon,ArrowUpDown,ArrowDown,ArrowUp} from 'lucide-react'
import { useRouter,useSearchParams } from 'next/navigation'
import {useState} from 'react';
import { usePolling } from "@/hooks/usePolling";
import { Button } from '../ui/button';
import Filter from '@/components/shared/Filter';
import { TicketSearchResultsType } from '@/drizzle/queries/ticket.queries';
import { ColumnFiltersState, SortingState } from '@tanstack/react-table';
import { ticketColumns, ticketHeadersArray } from './tickets/columnHeaders';


type Props = {
  data: TicketSearchResultsType,
};


const TicketTable = ({data}:Props)=>{
    const router = useRouter();
    const searchParams = useSearchParams();
    const [columnFilters,setColumnFilters] = useState<ColumnFiltersState>([])
    const [sorting, setSorting] = useState<SortingState>([
        {
            id:"ticketDate",
            desc:false
        }
    ])
 const columns = ticketHeadersArray.map(columnName=>{
        return ticketColumns.accessor(row=>{
            const value = row[columnName];
            if (columnName==='ticketDate' && value instanceof Date){
                return value.toLocaleDateString('en-US',{
                    year:'numeric',
                    month:'2-digit',
                    day:'2-digit'
                })
            }
            if (columnName==='completed') {
                return value ? "COMPLETED" : "OPEN";
            }
            return value
        }, {
            id: columnName,
            header: ({column})=>{
                return (
                  <Button
                    variant="ghost"
                    className="pl-1 w-full flex justify-between"
                    onClick={() =>
                      column.toggleSorting(column.getIsSorted() === "asc")
                    }
                  >
                    {columnName[0].toUpperCase() + columnName.slice(1)}
                    {column.getIsSorted() === "asc" && (
                      <ArrowUp className="ml-2 size-4" />
                    )}
                    {column.getIsSorted() === "desc" && (
                      <ArrowDown className="size-4 ml-2" />
                    )}
                    {column.getIsSorted() !== "desc" &&
                      column.getIsSorted() !== "asc" && (
                        <ArrowUpDown className="size-4 ml-2" />
                      )}
                  </Button>
                );
            },cell:({getValue})=>{
                const value=getValue();
                if (columnName==='completed') {
                    return (
                      <div className="grid place-content-center">
                        {value === "OPEN" ? (
                          <CircleXIcon className="opacity-25" />
                        ) : (
                          <CircleCheckIcon className="text-greeen-600" />
                        )}
                      </div>
                    );
                }
            }
        })
    
    })
    return (
        <></>
    )
}
export default TicketTable;