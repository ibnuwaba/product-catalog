
import { Link } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import type { Product } from "../api/products";
import { productQuery } from "../queries/products";
import { useAddToCart } from "../hooks/useAddToCart";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const queryClient = useQueryClient();
  const addMutation = useAddToCart();

  function prefetchProduct() {
    queryClient.prefetchQuery(productQuery(product.id));
  }

  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Link
        to={`/products/${product.id}`}
        aria-label={`View ${product.title}`}
        onMouseEnter={prefetchProduct}
        onFocus={prefetchProduct}
        className="block rounded-t-2xl focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-violet-600"
      >
        <div className="flex h-56 items-center justify-center overflow-hidden bg-slate-50 p-5">
          <img
            src={product.thumbnail}
            alt={product.title}
            loading="lazy"
            className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
          />
        </div>

        <div className="px-5 pt-5">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-violet-600">
            {product.category}
          </p>

          <h2 className="line-clamp-2 min-h-12 text-base font-bold text-slate-900 transition group-hover:text-violet-700">
            {product.title}
          </h2>

          <div className="mt-3 flex items-center justify-between">
            <span className="text-xl font-bold text-slate-900">
              ${product.price.toFixed(2)}
            </span>

            <span
  className="text-sm text-amber-700"
  aria-label={`Rated ${product.rating} out of 5`}
>
  <span aria-hidden="true">★</span> {product.rating}
</span>
          </div>
        </div>
      </Link>

      <div className="px-5 pb-5 pt-4">
        <button
          type="button"
          onClick={() => addMutation.mutate(product)}
          disabled={addMutation.isPending}
          aria-label={`Add ${product.title} to cart`}
          className="w-full rounded-xl bg-violet-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-violet-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 disabled:opacity-50"
        >
          {addMutation.isPending ? "Adding..." : "Add to Cart"}
        </button>

        {addMutation.isError && (
          <p role="alert" className="mt-2 text-xs text-red-600">
            Couldn't add product. Please try again.
          </p>
        )}
      </div>
    </article>
  );
}
