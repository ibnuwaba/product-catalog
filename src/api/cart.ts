
import { fetchJson } from "./http";
import type { Product } from "./products";

const CART_KEY = "catalog-cart";

export type CartItem = {
  product: Product;
  quantity: number;
};

function saveCart(items: CartItem[]) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
}

export function getCart(): CartItem[] {
  const saved = localStorage.getItem(CART_KEY);

  if (!saved) return [];

  try {
    return JSON.parse(saved) as CartItem[];
  } catch {
    return [];
  }
}

export async function addToCart(product: Product): Promise<CartItem[]> {
  // Send a real POST request to DummyJSON.
  await fetchJson<unknown>("https://dummyjson.com/carts/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: 1,
      products: [{ id: product.id, quantity: 1 }],
    }),
  });

  // Persist the cart locally.
  const items = getCart();
  const existing = items.find((item) => item.product.id === product.id);

  if (existing) {
    existing.quantity += 1;
  } else {
    items.push({ product, quantity: 1 });
  }

  saveCart(items);

  return items;
}

export function removeFromCart(productId: number): CartItem[] {
  const items = getCart().filter(
    (item) => item.product.id !== productId,
  );

  saveCart(items);

  return items;
}
