import { useState } from "react";
import { useAxios } from "./useAxios";

/**
 * @experimental
 */
export function usePost<Q, R>(
  endpoint: string
): [(body: Q) => Promise<R>, boolean, boolean] {
  const [isLoading, setLoading] = useState(false);
  const [isErrored, setErrored] = useState(false);
  const axios = useAxios();

  const post = (data: Q): Promise<R> => {
    setLoading(true);
    return axios
      .post(endpoint, data)
      .then((res) => {
        if (res.status / 100 === 2) {
          return res.data;
        }
        throw new Error(`Got status ${res.status}\n${res}`);
      })
      .catch(() => setErrored(true))
      .finally(() => setLoading(true));
  };

  return [post, isLoading, isErrored];
}
