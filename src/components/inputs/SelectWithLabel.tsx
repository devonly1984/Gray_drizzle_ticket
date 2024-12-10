"use client"
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  type DataObj = {
    id: string;
    description: string;
  };  
type Props<S> = {
  fieldTitle: string;
  nameInSchema: keyof S & string;
  data: DataObj[];
  className?: string;
};

const SelectWithLabel = <S,>({
  fieldTitle,
  nameInSchema,
  data,
  className,
}: Props<S>) => {
  const form = useFormContext();
  return (
    <FormField
      control={form.control}
      name={nameInSchema}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-base" htmlFor={nameInSchema}>
            {fieldTitle}
          </FormLabel>
          <Select {...field} onValueChange={field.onChange}>
            <FormControl>
              <SelectTrigger
                className={`w-full max-w-xs ${className}`}
                id={nameInSchema}
              >
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              </FormControl>
              <SelectContent>
                {data.map((item) => (
                  <SelectItem
                    key={`${nameInSchema}_${item.id}`}
                    value={item.id}
                  >
                    {item.description}
                  </SelectItem>
                ))}
              </SelectContent>
         
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
export default SelectWithLabel