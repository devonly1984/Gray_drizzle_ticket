"use client"
import { useAction } from "next-safe-action/hooks";
import { saveCustomer } from "@/app/actions/customer.actions";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  insertCustomerSchema,
  type insertCustomerSchemaType,
  type selectCustomerSchemaType,
} from "@/zod-schemas/customer.schema";
import {
  InputWithLabel,
  SelectWithLabel,
  TextAreaWithLabel,
  CheckboxWithLabel,
} from "@/components/inputs";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import {StatesArray} from '@/constants/StatesArray'
import { useToast } from "@/hooks/use-toast";
import { LoaderCircle } from "lucide-react";
import DisplayServerActionResponse from "@/components/shared/DisplayServerActionResponse";
type Props = {
  customer?: selectCustomerSchemaType;
};
const CustomerForm = ({ customer }: Props) => {
  const { getPermission, isLoading } = useKindeBrowserClient();
  const isManager = !isLoading && getPermission("manager")?.isGranted;
 const { toast } = useToast();
  
    const defaultValues: insertCustomerSchemaType = {
      id: customer?.id ?? 0,
      firstName: customer?.firstName ?? "",
      lastName: customer?.lastName ?? "",
      address1: customer?.address1 ?? "",
      address2: customer?.address2 ?? "",
      city: customer?.city ?? "",
      state: customer?.state ?? "",
      zip: customer?.zip ?? "",
      phone: customer?.phone ?? "",
      email: customer?.email ?? "",
      notes: customer?.notes ?? "",
      active: customer?.active ?? true,
    };
  const form = useForm<insertCustomerSchemaType>({
    mode: "onBlur",
    resolver: zodResolver(insertCustomerSchema),
    defaultValues,
  });
  const {
    execute: executeSave,
    result: saveResult,
    isExecuting: isSaving,
    reset: resetSaveAction,
  } = useAction(saveCustomer, {
    onSuccess({data}){
      //toast user
      toast({
        variant: "default",
        title: "Success!",
        description: data?.message,
      });
    },
    onError(){
      //toast user error
      toast({
        variant: "destructive",
        title: "Error",
        description: "Save Failed",
      });
    },
    
  });
  const onSubmit = async (values: insertCustomerSchemaType) => {
    executeSave(values);
  };
  return (
    <div className="flex flex-col gap-1 sm:px-8">
      <DisplayServerActionResponse result={saveResult} />
      <div className="">
        <h2 className="text-2xl font-bold">
          {customer?.id ? "Edit" : "Create"} Customer{" "}
          {customer?.id ? `#${customer.id}` : "Form"}
        </h2>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col md:flex-row gap-4 md:gap-8 "
        >
          <div className="flex flex-col gap-4 w-full max-w-xs">
            <InputWithLabel<insertCustomerSchemaType>
              fieldTitle="First Name"
              nameInSchema="firstName"
            />
            <InputWithLabel<insertCustomerSchemaType>
              fieldTitle="Last Name"
              nameInSchema="lastName"
            />
            <InputWithLabel<insertCustomerSchemaType>
              fieldTitle="Address"
              nameInSchema="address1"
            />
            <InputWithLabel<insertCustomerSchemaType>
              fieldTitle="Address 2"
              nameInSchema="address2"
            />
            <InputWithLabel<insertCustomerSchemaType>
              fieldTitle="City"
              nameInSchema="city"
            />
            <SelectWithLabel<insertCustomerSchemaType>
              fieldTitle="State"
              nameInSchema="state"
              data={StatesArray}
            />
          </div>
          <div className="flex flex-col gap-4 w-full max-w-xs">
            <InputWithLabel<insertCustomerSchemaType>
              fieldTitle="Zip Code"
              nameInSchema="zip"
            />
            <InputWithLabel<insertCustomerSchemaType>
              fieldTitle="Email"
              nameInSchema="email"
            />
            <InputWithLabel<insertCustomerSchemaType>
              fieldTitle="Phone Number"
              nameInSchema="phone"
            />

            <TextAreaWithLabel<insertCustomerSchemaType>
              fieldTitle="Notes"
              nameInSchema="notes"
              className="h-40"
            />
            {isLoading ? (
              <p>Loading...</p>
            ) : isManager && customer?.id ? (
              <CheckboxWithLabel<insertCustomerSchemaType>
                fieldTitle="Active"
                nameInSchema="active"
                message="Yes"
              />
            ) : null}
            <div className="flex gap-2">
              <Button
                className="w-3/4"
                variant="default"
                title="Save"
                type="submit"
                disabled={isSaving}
              >
                {isSaving ? (
                  <>
                    <LoaderCircle className="animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save"
                )}
              </Button>
              <Button
                variant="destructive"
                title="Reset"
                type="button"
                onClick={() => {
                  form.reset(defaultValues);
                  resetSaveAction();
                }}
              >
                Reset
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};
export default CustomerForm