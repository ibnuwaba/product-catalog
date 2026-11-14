
import { useDeferredValue, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { productSearchQuery } from "../queries/products";
import ProductCard from "./ProductCard";

export default function SearchBox() {
  const [search, setSearch] = useState("");
  const deferredSearch = useDeferredValue(search.trim());

  const { data, isFetching, isError } = useQuery(
    productSearchQuery(deferredSearch),
  );
 const hasMinimumLength = search.trim().length >= 2;

   return (
    <section className="mb-10" aria-label="Product search">
      <label
        htmlFor="product-search"
        className="mb-2 block text-sm font-semibold text-zinc-700"
      >
        Search products
      </label>

      <input
        id="product-search"
        type="search"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Search products..."
        autoComplete="off"
        className="w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none focus:border-violet-600 focus:ring-2 focus:ring-violet-200"
      />

      {!hasMinimumLength ? (
        <p className="mt-3 text-sm text-zinc-600">
          Enter at least 2 characters to search.
        </p>
      ) : isFetching ? (
        <p role="status" aria-live="polite" className="mt-3 text-sm text-zinc-500">
          Searching products...
        </p>
      ) : isError ? (
        <p role="alert" className="mt-3 text-sm text-red-600">
          Something went wrong. Please try again.
        </p>
      ) : !data || data.products.length === 0 ? (
        <p role="status" className="mt-3 text-sm text-zinc-600">
          No products found.
        </p>
      ) : (
        <>
          <p role="status" className="mt-3 text-sm text-zinc-600">
            Found {data.products.length} products.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {data.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </section>
  );
}