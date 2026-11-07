
import { queryOptions } from "@tanstack/react-query";
import { getCart } from "../api/cart";

export const cartKeys = {
  all: ["cart"] as const,
};

export const cartQuery = () =>
  queryOptions({
    queryKey: cartKeys.all,
    queryFn: getCart,
    staleTime: Infinity,
  });
