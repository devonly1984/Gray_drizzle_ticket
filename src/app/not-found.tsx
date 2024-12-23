import Image from "next/image";
import Link from "next/link";
export const metadata = {
  title: "Page not found",
};
const NotFound = ()=>{
return (
  <div className="px-2 w-full">
    <div className="mx-auto py-4  flex flex-col justify-center items-center gap-4">
      <h2 className="text-2xl">Page Not found</h2>
      <Image
        src="/images/not-found.png"
        alt="Not Found"
        className="m-0 rounded-xl "
        height={300}
        width={300}
        sizes="300px"
        priority
        title="Page Not Found"
      />
    </div>
    <Link href="/tickets" className="text-center hover:underline">
      <h3>Go Home</h3>
    </Link>
  </div>
);
}
export default NotFound