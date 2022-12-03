import { useRef, MutableRefObject } from "react";

export default function useOnLoad<T = Record<string, any>>(
  callback: (pageParams: T) => void
): {
  pageParams: MutableRefObject<T>;
} {
  const isLoaded = useRef(false);
  const pageParams = useRef<T>({} as T);
  if (!isLoaded.current) {
    isLoaded.current = true;
    callback(pageParams.current);
  }
  return { pageParams };
}
