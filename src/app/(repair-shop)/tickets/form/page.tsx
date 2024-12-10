import { getCustomer } from "@/drizzle/queries/customer.queries"
import { getTicket } from "@/drizzle/queries/ticket.queries";
import BackButton from "@/components/shared/BackButton";
import * as Sentry from '@sentry/nextjs'
import TicketForm from "@/components/forms/TicketForm";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Users, init as kindeInit } from "@kinde/management-api-js";
export const generateMetadata = async({searchParams}:{searchParams:Promise<{[key:string]:string|undefined}>})=>{
  const { customerId, ticketId } = await searchParams;
  if (!customerId && !ticketId) {
    return { title: "Missing Ticket Id or Customer Id" };
  }
  if (customerId) {
    return { title: `New Ticket for Customer #${customerId}` };
  }
  if (ticketId) {
    return { title: `Edit Ticket #${ticketId}` };
  }
}
const TicketFormPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
    
    try {
      const { customerId, ticketId } = await searchParams;
      //Edit Customer
      if (!customerId || !ticketId) {
        return (
          <>
            <h2 className="text-2xl mb-2 ">
              Ticket Id or Customer Id required to load ticket form.
            </h2>
            <BackButton title="Go Back" />
          </>
        );
      }
      const { getPermission, getUser } = getKindeServerSession();
      const [managerPermission, user] = await Promise.all([
        getPermission("manager"),
        getUser(),
      ]);
      const isManager = managerPermission?.isGranted;

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
        if (!customer.active) {
          return (
            <>
              <h2 className="text-2xl mb-2">
                {customerId} is not currently active
                <BackButton title="Go Back" />
              </h2>
            </>
          );
        }
        if (isManager) {
          kindeInit();
          const { users } = await Users.getUsers();
          const techs = users
            ? users.map((user) => ({
                id: user.email!,
                description: user.email!,
              }))
            : [];
            <TicketForm customer={customer} techs={techs!} />;
        } else {
          return <TicketForm customer={customer} />;
        }
        
      }
      //return ticket form

      //Edit Ticket
      if (ticketId) {
        const ticket = await getTicket(parseInt(ticketId));
        if (!ticket) {
          return (
            <>
              <h2 className="text-2xl mb-2">{ticketId} was not found</h2>
              <BackButton title="Go Back" />
            </>
          );
        }
        const customer = await getCustomer(ticket.customerId);
        if (isManager) {
          kindeInit();
          const { users } = await Users.getUsers();
          const techs = users
            ? users.map((user) => ({
                id: user.email!,
                description: user.email!,
              }))
            : [];
            <TicketForm customer={customer} ticket={ticket} techs={techs!} />;
        } else {
          const isEditable =
            user?.email?.toLowerCase() === ticket.tech.toLowerCase();

          return (
            <TicketForm
              customer={customer}
              ticket={ticket}
              isEditable={isEditable}
            />
          );
        }
      
      }
    } catch (error) {
        if (error instanceof Error) {
           Sentry.captureException(error);
        }
      }

};
export default TicketFormPage