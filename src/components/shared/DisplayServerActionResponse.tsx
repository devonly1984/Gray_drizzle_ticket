import { ReactNode } from "react";

type Props = {
  result: {
    data?: {
      message?: string;
    };
    serverError?: string;
    validationErrors?: Record<string, string[] | undefined>;
  };
};
const MessageBox = ({
  type,
  content,
}: {
  type: "success" | "error";
  content: ReactNode;
}) => (
  <div
    className={`bg-accent px-4 py-2 my-2 rounded-lg ${
      type === "error" ? "text-red-500" : ""
    }`}
  >
    {type === "success" ? "Success" : "Error"}
    {content}
  </div>
);
const DisplayServerActionResponse = ({
  result,

}: Props) => {
    const {data,serverError,validationErrors} = result
  return (
    <div className="">
      {data?.message && (
        <MessageBox type="success" content={`Success ${data?.message}`} />
      )}
      {serverError && <MessageBox type="error" content={serverError} />}
      {validationErrors && (
        <MessageBox
          type="error"
          content={Object.keys(validationErrors).map((key) => (
            <p key={key}>
              `${key}: ${validationErrors[key as keyof typeof validationErrors]}`
              
            </p>
          ))}
        />
      )}
    </div>
  );
};
export default DisplayServerActionResponse