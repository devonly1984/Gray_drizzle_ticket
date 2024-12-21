import { useEffect } from "react";
import { useRouter } from "next/navigation";

export const usePolling = (
  ms: number = 60000,
  searchParam: string | null
) => {
    const router = useRouter();
    useEffect(() => {
      const intervalId = setInterval(() => {
        if (!searchParam) {
          router.refresh();
        }
      }, ms);
      return () => clearInterval(intervalId);

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParam, ms]); 
};