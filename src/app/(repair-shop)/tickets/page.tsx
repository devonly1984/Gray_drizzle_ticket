import TicketSearch from "@/components/shared/TicketSearch";
import TicketsTable from "@/components/tables/tickets/TicketsTable";
import {
  getTicketSearchResults,
  getOpenTickets,
} from "@/drizzle/queries/ticket.queries";

const TicketsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
let results;
   const { searchText } = await searchParams;
  if (!searchText) {
  results = await getOpenTickets();

    return (
      <>
        <TicketSearch />
        {results.length ? <TicketsTable data={results} /> : <p className="mt-4">No Open Tickets Found</p>
        }
      </>
    );
  }
    results = await getTicketSearchResults(searchText);
  return (
    <>
      <TicketSearch />
      {results.length ? (
        <TicketsTable data={results} />
      ) : (
        <p className="mt-4">No Results Found</p>
      )}
    </>
  );
};
export default TicketsPage;
