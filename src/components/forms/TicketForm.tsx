"use client"
import {useForm} from 'react-hook-form';
import { insertTicketSchema,type insertTicketSchemaType,type ticketSelectSchemaType } from '@/zod-schemas/ticket.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { selectCustomerSchemaType } from '@/zod-schemas/customer.schema';

import { Form } from '@/components/ui/form';
import {
  InputWithLabel,
  SelectWithLabel,
  TextAreaWithLabel,
  CheckboxWithLabel
} from "@/components/inputs";
import { Button } from "@/components/ui/button";
import { useAction } from 'next-safe-action/hooks';
import { saveTicket } from "@/app/actions/ticket.actions";
import { useToast } from "@/hooks/use-toast";
import { LoaderCircle } from "lucide-react";
import DisplayServerActionResponse from "@/components/shared/DisplayServerActionResponse";
type Props = {
  customer: selectCustomerSchemaType;
  ticket?: ticketSelectSchemaType;
  techs?: {
    id: string;
    description: string;
  }[];
  isEditable?: boolean;
};
const TicketForm = ({
  customer: {
    id,
    firstName,
    lastName,
    address1,
    address2,
    city,
    state,
    zip,
    email,
    phone,
  },
  ticket,
  techs,
  isEditable = true,
}: Props) => {
  const { toast } = useToast();
  const isManager = Array.isArray(techs);
  const defaultValues: insertTicketSchemaType = {
    id: ticket?.id ?? "(New)",
    customerId: ticket?.customerId ?? id,
    title: ticket?.title ?? "",
    description: ticket?.description ?? "",
    completed: ticket?.completed ?? false,
    tech: ticket?.tech ?? "new-ticket@example.com",
  };

  const form = useForm<insertTicketSchemaType>({
    mode: "onBlur",
    resolver: zodResolver(insertTicketSchema),
    defaultValues,
  });
  const {
    execute: executeSave,
    result: saveResult,
    isExecuting: isSaving,
    reset: resetSaveAction,
  } = useAction(saveTicket, {
    onSuccess({ data }) {
      //toast user
      toast({
        variant: "default",
        title: "Success!",
        description: data?.message,
      });
    },
    onError() {
      //toast user error
      toast({
        variant: "destructive",
        title: "Error",
        description: "Save Failed",
      });
    },
  });
  const onSubmit = async (values: insertTicketSchemaType) => {
    executeSave(values);
  };
  return (
    <div className="flex flex-col gap-1 sm:p-8">
            <DisplayServerActionResponse result={saveResult} />

      <div className="">
        <h2 className="text-2xl font-bold">
          {ticket?.id && isEditable
            ? `Edit Ticket #${ticket.id}`
            : ticket?.id
            ? `View Ticket #${ticket.id}`
            : "New Ticket Form"}
        </h2>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col md:flex-row gap-4 md:gap-8"
        >
          <div className="flex flex-col gap-4 w-full max-w-xs">
            <InputWithLabel<insertTicketSchemaType>
              fieldTitle="Title"
              nameInSchema="title"
              disabled={!isEditable}
            />
            {isManager ? (
              <SelectWithLabel<insertTicketSchemaType>
                fieldTitle="Tech Id"
                nameInSchema="tech"
                data={[
                  {
                    id: "new-ticket@example.com",
                    description: "new-ticket@example.com",
                  },
                  ...techs,
                ]}
              />
            ) : (
              <InputWithLabel<insertTicketSchemaType>
                fieldTitle="Tech"
                nameInSchema="tech"
                disabled
              />
            )}
            {ticket?.id ? (
              <CheckboxWithLabel<insertTicketSchemaType>
                fieldTitle="Completed"
                nameInSchema="completed"
                message="Yes"
                disabled={!isEditable}
              />
            ) : null}

            <div className="mt-4 space-y-2">
              <h3 className="text-lg ">Customer Info</h3>
              <hr className="w-4/5" />
              <p>
                {firstName} {lastName}
              </p>
              <p className="">{address1}</p>
              {address2 ? <p>{address2}</p> : null}
              <p>
                {city}, {state} {zip}
              </p>
              <hr className="w-4/5" />
              <p>Email: {email}</p>
              <p>Phone: {phone}</p>
            </div>
          </div>
          <div className="flex flex-col gap-4 w-full max-w-xs">
            <TextAreaWithLabel<insertTicketSchemaType>
              fieldTitle="Description of Ticket"
              nameInSchema="description"
              className="h-96"
              disabled={!isEditable}
            />
            {isEditable ? (
              <div className="flex gap-2">
                <Button
                  className="w-3/4"
                  variant="default"
                  title="Save"
                  type="submit"
                >
                  {isSaving ? (
                    <>
                      <LoaderCircle className="animate-spin" />
                      Saving
                    </>
                  ) : (
                    <>Save</>
                  )}
                </Button>
                <Button
                  variant="destructive"
                  title="Reset"
                  type="button"
                  onClick={() => {
                    form.reset(defaultValues);
                    resetSaveAction();
                  }
                  }
                >
                  Reset
                </Button>
              </div>
            ) : (
              <></>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};
export default TicketForm