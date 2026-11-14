
import { Link } from "react-router";
import { useCart } from "../hooks/useCart";

export default function CartBadge() {
  const { count } = useCart();

  return (
    <Link
      to="/cart"
      aria-label={`Shopping cart, ${count} ${count === 1 ? "item" : "items"}`}
      className="inline-flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-violet-300 hover:bg-violet-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600"
    >
      <span>Shopping Cart</span>

      <span
        aria-live="polite"
         aria-atomic="true"
        className="flex h-6 min-w-6 items-center justify-center rounded-full bg-violet-600 px-1.5 text-xs font-bold text-white"
      >
        {count}
      </span>
    </Link>
  );
}
