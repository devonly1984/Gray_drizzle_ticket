import { useEffect } from "react"
import { useRouter } from "next/navigation"
const usePolling = (ms: number = 60000, searchParams: string | null) => {
    const router = useRouter();
    useEffect(() => {
      const intervalId = setInterval(() => {
        if (!searchParams) {
          router.refresh();
        }
      }, ms);
      return () => clearInterval(intervalId);

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ms, searchParams]);
};
export default usePolling