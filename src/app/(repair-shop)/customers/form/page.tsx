import { getCustomer } from "@/drizzle/queries/customer.queries"
import {BackButton} from "@/components/buttons";
import * as Sentry from '@sentry/nextjs'
import {CustomerForm} from "@/components/forms/";

export const generateMetadata = async({searchParams}:{searchParams:Promise<{[key:string]:string|undefined}>})=>{
  const {customerId} = await searchParams;
  if (!customerId) {
    return {title: "New Customer"}
  }
  return {title:`Edit Customer #${customerId}`}

}
const CustomerFormPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  try {
    const { customerId } = await searchParams;
    //Edit Customer
    if (customerId) {
      const customer = await getCustomer(parseInt(customerId));
      if (!customer) {
        return (
          <>
            <h2 className="text-2xl mb-2 ">
              Customer Id {customerId} not found
            </h2>
            <BackButton title="Go Back" />
          </>
        );
      }

      return <CustomerForm customer={customer} />;
    } else {
      //New Customer
      return <CustomerForm />;
    }
  } catch (error) {
    if (error instanceof Error) {
      Sentry.captureException(error);
    }
  }
};

export default CustomerFormPage;