
export default function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 12 }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse rounded-xl border p-4"
        >
          <div className="aspect-square rounded-lg bg-zinc-200" />
          <div className="mt-4 h-4 w-3/4 rounded bg-zinc-200" />
          <div className="mt-3 h-4 w-1/3 rounded bg-zinc-200" />
        </div>
      ))}
    </div>
  );
}
