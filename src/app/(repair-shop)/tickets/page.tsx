import TicketSearch from "@/components/shared/TicketSearch";
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
        <p>{JSON.stringify(results)}</p>
      </>
    );
  }
   results = await getTicketSearchResults(searchText);
  return (
    <>
      <TicketSearch />
      <p>{JSON.stringify(results)}</p>
    </>
  );
};
export default TicketsPage;
