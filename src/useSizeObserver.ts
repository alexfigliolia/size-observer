import { useLayoutEffect, useRef } from "react";
import { SizeObserver } from "./SizeObserver";
import type { Options } from "./types";

export const useSizeObserver = <T extends Element>(options: Options) => {
  const node = useRef<T>(null);
  useLayoutEffect(() => {
    if (!node.current) {
      return;
    }
    const observer = new SizeObserver(node.current, options);
    return () => {
      observer.destroy();
    };
  }, [options]);
  return node;
};
