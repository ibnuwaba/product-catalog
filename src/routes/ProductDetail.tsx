
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { HttpError } from "../api/http";
import { productQuery } from "../queries/products";
import NotFound from "./NotFound";
import { useAddToCart } from "../hooks/useAddToCart";

export default function ProductDetail() {
  const { id } = useParams();
  const productId = Number(id);
  const isValidId = Number.isInteger(productId) && productId > 0;

  const { data, isPending, isError, error } = useQuery({
    ...productQuery(productId),
    enabled: isValidId,
  });

  const addMutation = useAddToCart();

  if (!isValidId) return <NotFound />;

  if (isPending) {
    return (
      <main className="mx-auto max-w-7xl px-5 py-20">
        <div className="h-96 animate-pulse rounded-3xl bg-slate-200" />
      </main>
    );
  }

  if (isError) {
    if (error instanceof HttpError && error.status === 404) {
      return <NotFound />;
    }

    return (
      <main className="mx-auto max-w-7xl px-5 py-20">
        <p role="alert" className="rounded-xl bg-red-50 p-5 text-red-600">
          Unable to load product: {error.message}
        </p>
      </main>
    );
  }

  if (!data) return <NotFound />;

  return (
    <main className="min-h-screen bg-slate-50 px-5 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <p className="text-sm font-medium text-violet-600">
            Home / Products / {data.category}
          </p>
        </div>

        <section className="grid gap-10 overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-2 md:p-10">
          <div className="flex min-h-80 items-center justify-center rounded-2xl bg-slate-50 p-8">
            <img
              src={data.thumbnail}
              alt={data.title}
              className="max-h-96 w-full object-contain"
            />
          </div>

          <div className="flex flex-col justify-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-widest text-violet-600">
              {data.category}
            </p>

            <h1 className="text-3xl font-bold leading-tight text-slate-900 md:text-4xl">
              {data.title}
            </h1>

            <div className="mt-4 flex items-center gap-3">
              <span className="text-2xl font-bold text-slate-900">
                ${data.price.toFixed(2)}
              </span>
              <span className="rounded-full bg-amber-50 px-3 py-1 text-sm font-semibold text-amber-600">
                ★ {data.rating}
              </span>
            </div>

            <p className="mt-6 leading-7 text-slate-600">
              {data.description}
            </p>

            <div className="mt-6 border-t border-slate-100 pt-5">
              <p className="text-sm text-slate-600">
                Availability:{" "}
                <span className="font-semibold text-emerald-600">
                  {data.stock > 0 ? `${data.stock} in stock` : "Out of stock"}
                </span>
              </p>
            </div>

            <button
              onClick={() => addMutation.mutate(data)}
              disabled={addMutation.isPending || data.stock <= 0}
              className="mt-8 rounded-xl bg-violet-600 px-6 py-4 font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {addMutation.isPending
                ? "Adding..."
                : data.stock <= 0
                  ? "Out of Stock"
                  : "Add to Cart"}
            </button>

            {addMutation.isError && (
              <p role="alert" className="mt-3 text-sm text-red-600">
                Couldn't add this product. Please try again.
              </p>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
