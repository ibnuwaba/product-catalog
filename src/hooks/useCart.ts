import { useQuery } from "@tanstack/react-query";
import { cartQuery } from "../queries/cart";

export function useCart() {
  const query = useQuery({
    ...cartQuery(),
    select: (items) => ({
      items,
      count: items.reduce((sum, item) => sum + item.quantity, 0),
      total: items.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0,
      ),
    }),
  });

  return {
    ...query,
    items: query.data?.items ?? [],
    count: query.data?.count ?? 0,
    total: query.data?.total ?? 0,
  };
}