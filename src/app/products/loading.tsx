export default function LoadingProducts() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="h-8 w-40 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
      <div className="mt-6 h-16 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="aspect-square animate-pulse rounded-lg bg-gray-200 dark:bg-gray-800" />
        ))}
      </div>
    </div>
  );
}