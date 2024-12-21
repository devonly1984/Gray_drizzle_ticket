import { CustomerSearch } from "@/components/shared";
export const metadata = {
  title: "Customer Search",
};
import * as Sentry from "@sentry/nextjs";
import { getCustomerSearchResults } from "@/drizzle/queries/customer.queries";
import CustomerTable from "@/components/tables/customers/CustomerTable";

const CustomersPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const { searchText } = await searchParams;
  if (!searchText) {
    return <CustomerSearch />;
  }
  const span = Sentry.startInactiveSpan({
    name: "getCustomerSearchResults-2",
  });
  const results = await getCustomerSearchResults(searchText);
  span.end();
  return (
    <>
      <CustomerSearch />
      {results.length ? (
        <CustomerTable data={results} />
      ) : (
        <p className="mt-4">No Results Found </p>
      )}
    </>
  );
};
export default CustomersPage;
