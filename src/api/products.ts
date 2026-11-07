import { fetchJson } from "./http";
const BASE = "https://dummyjson.com";

export const PAGE_SIZE = 12;
export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  stock: number;
  category: string;
  thumbnail: string;
  images: string[];
};
export type ProductPage = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

export function fetchProductPage(page: number) {
  const skip = page * PAGE_SIZE;

  return fetchJson<ProductPage>(
    `${BASE}/products?limit=${PAGE_SIZE}&skip=${skip}`
  );
}

export function fetchProduct(id: number) {
  return fetchJson<Product>(`${BASE}/products/${id}`);
}

export function searchProducts(query: string) {
  return fetchJson<ProductPage>(
    `${BASE}/products/search?q=${encodeURIComponent(query)}`
  );
}