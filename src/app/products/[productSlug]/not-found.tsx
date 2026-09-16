import Link from "next/link";

export default function ProductNotFound() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-20 text-center">
      <p className="text-lg font-medium text-gray-900 dark:text-white">
        We couldn&apos;t find that product.
      </p>
      <Link
        href="/products"
        className="mt-4 inline-block rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
      >
        Back to all products
      </Link>
    </div>
  );
}