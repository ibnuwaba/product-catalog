import { lazy } from "react";

export function lazyRoute<T extends React.ComponentType>(
  importFn: () => Promise<{ default: T }>
) {
  return lazy(importFn);
}
