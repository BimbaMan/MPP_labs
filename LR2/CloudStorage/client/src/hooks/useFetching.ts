import { useState } from "react";

type FetchingReturnType = [
  fetching: (...args: any[]) => Promise<void>,
  isLoading: boolean,
  error: string
];

export const useFetching = (
  callback: (...args: any[]) => Promise<void>
): FetchingReturnType => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetching = async (...args: any[]) => {
    try {
      setIsLoading(true);
      await callback(...args);
    } catch (e: any) {
      console.log(e);
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  return [fetching, isLoading, error];
};
