"use client";

export default function ProductsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-20 text-center">
      <p className="text-lg font-medium text-gray-900 dark:text-white">
        Something went wrong loading products.
      </p>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
        {error.message || "Please try again."}
      </p>
      <button
        onClick={() => reset()}
        className="mt-4 rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
      >
        Try again
      </button>
    </div>
  );
}