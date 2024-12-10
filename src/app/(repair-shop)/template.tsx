import { ReactNode } from "react";

const RepairTemplate = async({children}:{children:ReactNode}) => {
  return <div className="animate-appear ">{children}</div>;
};
export default RepairTemplate;
