import { useEffect, useState } from "react";
import { useAxios } from "./useAxios";

/**
 * @experimental
 */
export function useGet<T>(
  endpoint: string,
  trigger = true
): [T | null, boolean, boolean] {
  const axios = useAxios();
  const [isLoading, setLoading] = useState(true);
  const [isErrored, setErrored] = useState(false);
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    if (trigger) {
      setLoading(true);
      setData(null);
      setErrored(false);
      axios
        .get(endpoint)
        .then((res) => {
          if (((res.status / 100) | 0) !== 2) {
            throw new Error(`Unable to post to ${endpoint}.\n${res}`);
          } else {
            setData(res.data);
          }
        })
        .catch(() => setErrored(true))
        .finally(() => setLoading(false));
    }
  }, [axios, endpoint, trigger]);

  return [data, isLoading, isErrored];
}
