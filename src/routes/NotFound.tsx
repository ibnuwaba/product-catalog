
import { Link } from "react-router";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-xl py-20 text-center">
      <h1 className="text-3xl font-bold">
        Product Not Found
      </h1>

      <p className="mt-3 text-zinc-500">
        Sorry, the product you're looking for doesn't exist.
      </p>

      <Link
        to="/"
        className="mt-6 inline-block rounded-lg bg-black px-5 py-2 text-white"
      >
        Back to products
      </Link>
    </main>
  );
}
