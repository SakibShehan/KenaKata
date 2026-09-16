"use client";

import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { getSafeImageUrl } from "@/lib/utils";
import type { OrderInfo } from "@/context/CheckoutContext";

export function OrderReview({ orderInfo }: { orderInfo: OrderInfo }) {
  const { items, total } = useCart();

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Order Items</h2>
        <div className="mt-4 divide-y divide-gray-200 dark:divide-gray-800">
          {items.map((item) => (
            <div key={item.product.id} className="flex items-center gap-4 py-3">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md bg-gray-100 dark:bg-gray-900">
                <Image
                  src={getSafeImageUrl(item.product.images[0])}
                  alt={item.product.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {item.product.title}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Qty {item.quantity} × ${item.product.price}
                </p>
              </div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                ${(item.product.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-between border-t border-gray-200 pt-4 text-base font-semibold text-gray-900 dark:border-gray-800 dark:text-white">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Delivery Details</h2>
        <dl className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <dt className="text-gray-500 dark:text-gray-400">Name</dt>
            <dd className="text-gray-900 dark:text-white">{orderInfo.fullName}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-500 dark:text-gray-400">Email</dt>
            <dd className="text-gray-900 dark:text-white">{orderInfo.email}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-500 dark:text-gray-400">Phone</dt>
            <dd className="text-gray-900 dark:text-white">{orderInfo.phone}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="shrink-0 text-gray-500 dark:text-gray-400">Location</dt>
            <dd className="text-right text-gray-900 dark:text-white">{orderInfo.location}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}