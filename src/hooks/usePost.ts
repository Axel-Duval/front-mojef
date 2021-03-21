import { useState } from "react";
import { useAxios } from "./useAxios";

/**
 * @experimental
 */
export function usePost<Q, R>(
  endpoint: string
): [R | null, (body: Q) => void, boolean, boolean] {
  const [isLoading, setLoading] = useState(false);
  const [isErrored, setErrored] = useState(false);
  const [result, setResult] = useState<R | null>(null);
  const axios = useAxios();

  const post = (data: Q): void => {
    setLoading(true);
    setErrored(false);
    axios
      .post(endpoint, data)
      .then((res) => {
        if (Math.floor(res.status / 100) === 2) {
          setResult(res.data);
        } else {
          throw new Error(`Got status ${res.status}\n${res}`);
        }
      })
      .catch(() => setErrored(true))
      .finally(() => setLoading(false));
  };

  return [result, post, isLoading, isErrored];
}
