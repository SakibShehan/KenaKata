
"use client";

export function QuantityStepper({
  quantity,
  onChange,
}: {
  quantity: number;
  onChange: (next: number) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => onChange(quantity - 1)}
        disabled={quantity <= 1}
        className="flex h-7 w-7 items-center justify-center rounded border border-gray-300 text-gray-700 hover:bg-gray-100 disabled:opacity-40 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
      >
        −
      </button>
      <span className="w-6 text-center text-sm text-gray-900 dark:text-white">{quantity}</span>
      <button
        onClick={() => onChange(quantity + 1)}
        className="flex h-7 w-7 items-center justify-center rounded border border-gray-300 text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
      >
        +
      </button>
    </div>
  );
}