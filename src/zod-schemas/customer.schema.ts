import {createInsertSchema,createSelectSchema} from 'drizzle-zod'
import { customers } from '@/drizzle/tables/customers'


export const insertCustomerSchema = createInsertSchema(customers, {
  firstName: (schema) => schema.firstName.min(1, "First name is required"),
  lastName: (schema) => schema.lastName.min(1, "Last name is equired"),
  address1: (schema) => schema.address1.min(1, "Address is required"),
  city: (schema) => schema.city.min(1, "City is required"),
  state: (schema) =>
    schema.state.length(2, "State must be exactly 2 characters"),
  email: (schema) => schema.email.email("Invalid email address format"),
  zip: (schema) =>
    schema.zip.regex(
      /^\d{5}(-\d{4})?$/,
      "Invalid zip code format use 55555-5555 "
    ),
  phone: (Schema) =>
    Schema.phone.regex(
      /^\d{3}-\d{3}-\d{4}$/,
      "Invalid phone number format. Use XXX-XXX-XXXX"
    ),
});
export const selectCustomerSchema = createSelectSchema(customers);

export type insertCustomerSchemaType = typeof insertCustomerSchema._type;

export type selectCustomerSchemaType = typeof selectCustomerSchema._type;