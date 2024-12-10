import Header from "@/components/layout/Header"
import { ReactNode } from "react"

const RepairLayout = async({children}:{children:ReactNode}) => {
  return (
    <div className="mx-auto w-full max-w-7xl">
      <Header />
      <div className="px-4 py-2">{children}</div>
    </div>
  );
}
export default RepairLayout