
import { queryOptions } from "@tanstack/react-query";

import {
  fetchProduct,
  fetchProductPage,
  searchProducts,
} from "../api/products";

export const productKeys = {
  all: ["products"] as const,

  pages: () => [...productKeys.all, "page"] as const,
  page: (page: number) => [...productKeys.pages(), page] as const,

  details: () => [...productKeys.all, "detail"] as const,
  detail: (id: number) => [...productKeys.details(), id] as const,

  searches: () => [...productKeys.all, "search"] as const,
  search: (query: string) => [...productKeys.searches(), query] as const,
};

export const productPageQuery = (page: number) =>
  queryOptions({
    queryKey: productKeys.page(page),
    queryFn: () => fetchProductPage(page),
  });

export const productQuery = (id: number) =>
  queryOptions({
    queryKey: productKeys.detail(id),
    queryFn: () => fetchProduct(id),
  });

export const productSearchQuery = (query: string) =>
  queryOptions({
    queryKey: productKeys.search(query),
    queryFn: () => searchProducts(query),
    enabled: query.trim().length >= 2,
  });
