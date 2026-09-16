"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export function OrderSummary() {
  const { items, itemCount, total, clearCart } = useCart();

  return (
    <div className="rounded-lg border border-gray-200 p-5 dark:border-gray-800">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Order Summary</h2>
        {items.length > 0 && (
          <button onClick={clearCart} className="text-xs text-red-500 hover:text-red-700">
            Clear cart
          </button>
        )}
      </div>

      <div className="mt-4 space-y-2 text-sm">
        <div className="flex justify-between text-gray-600 dark:text-gray-400">
          <span>Items ({itemCount})</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-600 dark:text-gray-400">
          <span>Subtotal</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      <div className="my-4 border-t border-gray-200 dark:border-gray-800" />

      <div className="flex justify-between text-base font-semibold text-gray-900 dark:text-white">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>

      {items.length > 0 ? (
        <Link
          href="/checkout"
          className="mt-6 block w-full rounded-md bg-gray-900 px-4 py-3 text-center text-sm font-semibold text-white hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
        >
          Proceed to Checkout
        </Link>
      ) : (
        <button
          disabled
          className="mt-6 w-full rounded-md bg-gray-900 px-4 py-3 text-sm font-semibold text-white opacity-40 dark:bg-white dark:text-gray-900"
        >
          Proceed to Checkout
        </button>
      )}
    </div>
  );
}