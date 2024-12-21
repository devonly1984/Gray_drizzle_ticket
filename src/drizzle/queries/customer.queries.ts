
import { db } from "../index";
import { customers } from "../tables/customers";
import { ilike, eq, or,sql } from "drizzle-orm";

export const getCustomer = async(id:number)=>{
    const customer = await db
      .select()
      .from(customers)
      .where(eq(customers.id, id));

      return customer[0];
}
export const getCustomerSearchResults = async (searchText: string) => {
  const results = await db
    .select()
    .from(customers)
    .where(
      or(
     
        ilike(customers.email, `%${searchText}%`),
        ilike(customers.phone, `%${searchText}%`),
        ilike(customers.city, `%${searchText}%`),
        ilike(customers.zip, `%${searchText}%`),
        sql`lower(concat(${customers.firstName},' ',${
          customers.lastName
        })) like ${`%${searchText.toLowerCase().replace(" ", "%")}%`}`
      )
    );
    return results;

};