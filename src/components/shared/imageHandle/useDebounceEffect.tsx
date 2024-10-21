import { useEffect, DependencyList } from "react";

export function useDebounceEffect<T extends unknown[]>(
  fn: (...args: T) => void,
  waitTime: number,
  deps?: DependencyList
) {
  useEffect(() => {
    const t = setTimeout(() => {
      fn(...(deps as T));
    }, waitTime);

    return () => {
      clearTimeout(t);
    };
  }, [fn, waitTime, ...(deps || [])]);
}
