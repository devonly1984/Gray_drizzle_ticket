import Form from "next/form";
import { Input } from "@/components/ui/input";
import { SearchButton } from "@/components/buttons";
const TicketSearch = () => {
  return (
    <Form action="/tickets" className="flex gap-2 items-center ">
      <Input
        name="searchText"
        type="text"
        placeholder="Search Tickets"
        className="w-full"
      />
      <SearchButton />
    </Form>
  );
};
export default TicketSearch;
