
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

  return (
    <section className="mb-10">
      <input
        type="search"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Search products..."
        className="w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none focus:border-black"
      />

      {search.trim().length < 2 ? (
        <p className="mt-3 text-sm text-zinc-500">
          Enter at least 2 characters to search.
        </p>
      ) : isFetching ? (
        <p className="mt-3 text-sm text-zinc-500">Searching...</p>
      ) : isError ? (
        <p className="mt-3 text-sm text-red-600">
          Something went wrong. Please try again.
        </p>
      ) : !data || data.products.length === 0 ? (
        <p className="mt-3 text-sm text-zinc-500">
          No products found.
        </p>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data.products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
