
import { selectCustomerSchemaType } from "@/zod-schemas/customer.schema";
import { createColumnHelper } from "@tanstack/react-table";

export const customerHeadersArray: Array<keyof selectCustomerSchemaType> = [
  "firstName",
  "lastName",
  "email",
  "phone",
  "city",
  "zip",
];
export const customerColumnHeader=createColumnHelper<selectCustomerSchemaType>()
export const columns = customerHeadersArray.map((columnName) =>
  customerColumnHeader.accessor(columnName, {
    id: columnName,
    header: columnName[0].toUpperCase() + columnName.slice(1),
  })
);
