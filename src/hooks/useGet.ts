import { useEffect, useState } from "react";
import { useAxios } from "./useAxios";

/**
 * @experimental
 */
export function useGet<T>(endpoint: string): [T | null, boolean, boolean] {
  const axios = useAxios();
  const [isLoading, setLoading] = useState(true);
  const [isErrored, setErrored] = useState(false);
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    axios
      .get(endpoint)
      .then(({ data }) => {
        setData(data);
      })
      .catch(() => setErrored(true))
      .finally(() => setLoading(false));
  }, [axios, endpoint]);

  return [data, isLoading, isErrored];
}
