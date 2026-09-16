"use client";

import Image from "next/image";
import Link from "next/link";
import type { CartItem } from "@/lib/types";
import { useCart } from "@/context/CartContext";
import { getSafeImageUrl } from "@/lib/utils";
import { QuantityStepper } from "@/components/cart/QuantityStepper";

export function CartItemRow({ item }: { item: CartItem }) {
  const { updateQuantity, removeItem } = useCart();
  const { product, quantity } = item;
  const lineTotal = product.price * quantity;

  return (
    <div className="flex flex-wrap items-center gap-4 border-b border-gray-200 py-4 dark:border-gray-800">
      <Link
        href={`/products/${product.slug}`}
        className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md bg-gray-100 dark:bg-gray-900"
      >
        <Image
          src={getSafeImageUrl(product.images[0])}
          alt={product.title}
          fill
          className="object-cover"
        />
      </Link>

      <div className="min-w-[140px] flex-1">
        <p className="text-xs text-gray-500 dark:text-gray-400">{product.category.name}</p>
        <Link
          href={`/products/${product.slug}`}
          className="line-clamp-1 text-sm font-medium text-gray-900 hover:underline dark:text-white"
        >
          {product.title}
        </Link>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">${product.price} each</p>
      </div>

      <QuantityStepper
        quantity={quantity}
        onChange={(next) => updateQuantity(product.id, next)}
      />

      <div className="w-20 text-right text-sm font-semibold text-gray-900 dark:text-white">
        ${lineTotal.toFixed(2)}
      </div>

      <button
        onClick={() => removeItem(product.id)}
        className="text-sm text-red-500 hover:text-red-700"
      >
        Remove
      </button>
    </div>
  );
}