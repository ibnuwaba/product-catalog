
export default function RouteSkeleton() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8 animate-pulse">
      {/* Page heading */}
      <div className="mb-8 space-y-3">
        <div className="h-8 w-64 rounded bg-gray-200" />
        <div className="h-4 w-96 max-w-full rounded bg-gray-200" />
      </div>

      {/* Product placeholders */}
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="space-y-3">
            <div className="aspect-square rounded-xl bg-gray-200" />
            <div className="h-4 w-3/4 rounded bg-gray-200" />
            <div className="h-4 w-1/3 rounded bg-gray-200" />
          </div>
        ))}
      </div>
    </main>
  );
}
