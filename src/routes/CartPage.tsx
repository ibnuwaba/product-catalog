
import { useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router";
import { removeFromCart } from "../api/cart";
import { useCart } from "../hooks/useCart";
import { cartKeys } from "../queries/cart";

export default function CartPage() {
  const queryClient = useQueryClient();
  const { items, total, count } = useCart();

  function handleRemove(productId: number) {
    const updatedCart = removeFromCart(productId);
    queryClient.setQueryData(cartKeys.all, updatedCart);
  }

  return (
    <main className="min-h-screen bg-slate-50 px-5 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-widest text-violet-600">
            Your Shopping Bag
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900 md:text-4xl">
            Shopping Cart
          </h1>
          <p className="mt-2 text-slate-500">
            {count} {count === 1 ? "item" : "items"} in your cart
          </p>
        </div>

        {items.length === 0 ? (
          <section className="rounded-3xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-violet-50 text-3xl">
              🛒
            </div>

            <h2 className="mt-6 text-2xl font-bold text-slate-900">
              Your cart is empty
            </h2>

            <p className="mt-3 text-slate-500">
              Discover our collection and find something you love.
            </p>

            <Link
              to="/"
              className="mt-7 inline-block rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white transition hover:bg-violet-700"
            >
              Explore Products
            </Link>
          </section>
        ) : (
          <div className="grid items-start gap-8 lg:grid-cols-[1fr_350px]">
            <section className="space-y-4">
              {items.map((item) => (
                <article
                  key={item.product.id}
                  className="flex flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center"
                >
                  <div className="flex h-28 w-full shrink-0 items-center justify-center rounded-xl bg-slate-50 p-3 sm:w-28">
                    <img
                      src={item.product.thumbnail}
                      alt={item.product.title}
                      className="h-full w-full object-contain"
                    />
                  </div>

                  <div className="flex-1">
                    <h2 className="font-bold text-slate-900">
                      {item.product.title}
                    </h2>

                    <p className="mt-2 text-sm text-slate-500">
                      Quantity: {item.quantity}
                    </p>

                    <p className="mt-2 font-bold text-violet-700">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </p>
                  </div>

                  <button
                    onClick={() => handleRemove(item.product.id)}
                    className="rounded-xl border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                  >
                    Remove
                  </button>
                </article>
              ))}
            </section>

            <aside className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:sticky lg:top-28">
              <h2 className="text-xl font-bold text-slate-900">
                Order Summary
              </h2>

              <div className="mt-6 flex justify-between text-sm text-slate-500">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <div className="mt-4 flex justify-between text-sm text-slate-500">
                <span>Shipping</span>
                <span>Free</span>
              </div>

              <div className="my-6 border-t border-slate-200" />

              <div className="flex justify-between text-lg font-bold text-slate-900">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <Link
                to="/"
                className="mt-7 block rounded-xl bg-violet-600 px-5 py-3.5 text-center font-semibold text-white transition hover:bg-violet-700"
              >
                Continue Shopping
              </Link>

              <p className="mt-4 text-center text-xs text-slate-400">
                Demo catalog — checkout is not enabled.
              </p>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}
