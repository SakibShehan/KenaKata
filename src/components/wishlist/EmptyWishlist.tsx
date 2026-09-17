import Link from "next/link";

export function EmptyWishlist() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <p className="text-lg font-medium text-gray-900 dark:text-white">
        Your wishlist is empty
      </p>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
        Tap the heart on any product to save it here.
      </p>
      <Link
        href="/products"
        className="mt-4 rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
      >
        Browse Products
      </Link>
    </div>
  );
}