import { TicketSearchResultsType } from "@/drizzle/queries/ticket.queries";
import { createColumnHelper } from "@tanstack/react-table";
export type RowType = TicketSearchResultsType[0];

export const ticketHeadersArray: Array<keyof RowType> = [
  "ticketDate",
  "title",
  "tech",
  "firstName",
  "lastName",
  "email",
  "completed",
];
export const ticketColumnHelper = createColumnHelper<RowType>();

export const columnWidths = {
  completed: 150,
  ticketDate: 150,
  title: 250,
  tech: 225,
  email: 225,
};
