import { tickets } from '@/drizzle/tables/tickets'
import {createInsertSchema,createSelectSchema} from 'drizzle-zod'
import {z} from 'zod';

export const insertTicketSchema = createInsertSchema(tickets, {
  id: z.union([z.number(), z.literal("(New)")]),
  title: (schema) => schema.title.min(1, "Title is required"),
  description: (schema) => schema.description.min(1, "Description is required"),
  tech: (schema) => schema.tech.email("Invalid email address"),
});

export const ticketSelectSchema = createSelectSchema(tickets)

export type insertTicketSchemaType = typeof insertTicketSchema._type;
export type ticketSelectSchemaType = typeof ticketSelectSchema._type;