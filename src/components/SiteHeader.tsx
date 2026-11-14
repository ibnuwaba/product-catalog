
import { Link } from "react-router";
import CartBadge from "./CartBadge";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <Link
          to="/"
          aria-label="Catalog home"
          className="flex items-center gap-3"
        >
          <span
            aria-hidden="true"
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600 text-lg font-bold text-white"
          >
            C
          </span>

          <div>
            <span className="block text-xl font-bold tracking-tight text-slate-900">
              Catalog
            </span>
            <span className="block text-xs text-slate-600">
              Discover something great
            </span>
          </div>
        </Link>

        <nav aria-label="Main navigation">
          <CartBadge />
        </nav>
      </div>
    </header>
  );
}
