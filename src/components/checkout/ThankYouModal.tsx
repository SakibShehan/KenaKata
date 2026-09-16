
"use client";

export function ThankYouModal({
  onBackdropClick,
  onViewMore,
}: {
  onBackdropClick: () => void;
  onViewMore: () => void;
}) {
  return (
    <div
      onClick={onBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm rounded-xl bg-white p-8 text-center shadow-xl dark:bg-gray-900"
      >
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-green-600 dark:text-green-400"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <h2 className="mt-4 text-xl font-bold text-gray-900 dark:text-white">Thank you!</h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Your order has been placed successfully. Pay with cash on delivery.
        </p>
        <button
          onClick={onViewMore}
          className="mt-6 w-full rounded-md bg-gray-900 px-4 py-3 text-sm font-semibold text-white hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
        >
          View More Products
        </button>
      </div>
    </div>
  );
}