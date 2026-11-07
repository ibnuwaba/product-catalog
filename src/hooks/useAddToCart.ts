
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addToCart } from "../api/cart";
import type { Product } from "../api/products";
import type { CartItem } from "../api/cart";
import { cartKeys } from "../queries/cart";

export function useAddToCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (product: Product) => addToCart(product),

    onMutate: async (product) => {
      await queryClient.cancelQueries({
        queryKey: cartKeys.all,
      });

      const previousCart =
        queryClient.getQueryData<CartItem[]>(cartKeys.all) ?? [];

      const existingItem = previousCart.find(
        (item) => item.product.id === product.id,
      );

      const optimisticCart = existingItem
        ? previousCart.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          )
        : [...previousCart, { product, quantity: 1 }];

      queryClient.setQueryData(cartKeys.all, optimisticCart);

      return { previousCart };
    },

    onError: (_error, _product, context) => {
      if (context) {
        queryClient.setQueryData(cartKeys.all, context.previousCart);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: cartKeys.all,
      });
    },
  });
}
