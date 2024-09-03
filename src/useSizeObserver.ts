import { useLayoutEffect, useRef } from "react";
import { SizeObserver } from "./SizeObserver";
import type { Options } from "./types";

export const useSizeObserver = <T extends Element>(options: Options) => {
  const node = useRef<T>(null);
  const stableOptions = useRef<Options>(options);
  stableOptions.current = options;
  const observer = useRef<SizeObserver<T> | null>(null);
  if (observer.current) {
    observer.current.options = stableOptions.current;
  }
  useLayoutEffect(() => {
    if (!node.current) {
      return;
    }
    observer.current = new SizeObserver(node.current, stableOptions.current);
    return () => {
      observer.current?.destroy();
    };
  }, []);
  return node;
};
