import { db } from "../index";
import { customers } from "../tables/customers";
import { tickets } from "../tables/tickets";
import { eq, or, ilike, sql, asc } from "drizzle-orm";

export const getTicket = async(id:number)=>{
    const ticket = await db
      .select()
      .from(tickets)
      .where(eq(tickets.id, id));

      return ticket[0];
}
export const getOpenTickets = async () => {
  const results = await db
    .select({
      ticketDate: tickets.createdAt,
      title: tickets.title,
      firstName: customers.firstName,
      lastName: customers.lastName,
      email: customers.email,
      tech: tickets.tech,
    })
    .from(tickets)
    .leftJoin(customers, eq(tickets.customerId, customers.id))
    .where(eq(tickets.completed, false));
  return results;
};
export const getTicketSearchResults = async(searchText:string)=>{
  const results = await db
    .select({
      ticketDate: tickets.createdAt,
      title: tickets.title,
      firstName: customers.firstName,
      lastName: customers.lastName,
      email: customers.email,
      tech: tickets.tech,
      completed: tickets.completed
    })
    .from(tickets)
    .leftJoin(customers, eq(tickets.customerId, customers.id))
    .where(
      or(
        ilike(tickets.title, `%${searchText}%`),
        ilike(tickets.tech, `%${searchText}%`),
        ilike(customers.email, `%${searchText}%`),
        ilike(customers.phone, `%${searchText}%`),
        ilike(customers.city, `%${searchText}%`),

        ilike(customers.zip, `%${searchText}%`),
        sql`lower(concat(${customers.firstName}," ",${
          customers.lastName
        })) LIKE ${`%${searchText.toLowerCase().replace(" ", "%")}%`}`,
      )
    ).orderBy(asc(tickets.createdAt))
return results;

}

export type TicketSearchResultsType = Awaited<
  ReturnType<typeof getTicketSearchResults>
>;