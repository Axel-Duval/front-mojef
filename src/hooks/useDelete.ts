import { useEffect, useState } from "react";
import { useAxios } from "./useAxios";

/**
 * @experimental
 */
export function useDelete(endpoint: string): [boolean, boolean] {
  const axios = useAxios();
  const [isLoading, setLoading] = useState(true);
  const [isErrored, setErrored] = useState(false);

  useEffect(() => {
    axios
      .delete(endpoint)
      .then((res) => {
        if (((res.status / 100) | 0) !== 2) {
          throw new Error(`Unable to delete ${endpoint}.\n${res}`);
        }
      })
      .catch(() => setErrored(true))
      .finally(() => setLoading(false));
  }, [axios, endpoint]);

  return [isLoading, isErrored];
}
