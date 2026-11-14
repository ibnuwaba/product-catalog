
import ProductCard from "../components/ProductCard";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { PAGE_SIZE } from "../api/products";
import { productPageQuery } from "../queries/products";
import ProductGridSkeleton from "../components/ProductGridSkeleton";
import SearchBox from "../components/SearchBox";

export default function ProductList() {
  const [searchParams, setSearchParams] = useSearchParams();

  const requestedPage = Number(searchParams.get("page"));
  const page =
    Number.isInteger(requestedPage) && requestedPage > 0
      ? requestedPage
      : 1;

  const apiPage = page - 1;

  const { data, isPending, isError, error } = useQuery({
    ...productPageQuery(apiPage),
    placeholderData: keepPreviousData,
  });

  function changePage(nextPage: number) {
    setSearchParams(
      nextPage === 1 ? {} : { page: String(nextPage) },
    );
  }

  const hasNextPage = data
    ? apiPage * PAGE_SIZE + data.products.length < data.total
    : false;

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8">

        {/* Hero section */}
        <section className="mb-10 rounded-3xl bg-gradient-to-r from-slate-950 to-violet-950 px-8 py-12 text-white shadow-lg sm:px-12">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-violet-300">
            Discover your next favorite
          </p>

          <h1 className="text-3xl font-bold sm:text-5xl">
            Explore Our Collection
          </h1>

          <p className="mt-4 max-w-xl text-slate-300">
            Find quality products, explore new arrivals, and discover something you'll love.
          </p>
        </section>

        {/* Search section */}
        <SearchBox />

        {/* Product section */}
        <section className="mt-10">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Our Products
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Explore our latest collection
              </p>
            </div>

            {data && (
              <span className="text-sm text-slate-600">
                {data.total} products
              </span>
            )}
          </div>

          {isPending ? (
            <ProductGridSkeleton />
          ) : isError ? (
            <p role="alert" className="rounded-xl bg-red-50 p-5 text-red-700">
              Couldn't load products: {error.message}
            </p>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {data.products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Pagination */}
              <div className="mt-12 flex items-center justify-center gap-5">
                <button
                  onClick={() => changePage(page - 1)}
                  disabled={page === 1}
                  className="rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Previous
                </button>

                <span className="text-sm font-medium text-slate-600">
                  Page {page}
                </span>

                <button
                  onClick={() => changePage(page + 1)}
                  disabled={!hasNextPage}
                  className="rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </section>
      </div>
    </main>
  );
}
