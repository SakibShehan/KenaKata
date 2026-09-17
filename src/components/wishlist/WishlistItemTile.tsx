"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/types";
import { getSafeImageUrl } from "@/lib/utils";
import { useWishlist } from "@/context/WishlistContext";

export function WishlistItemTile({ product }: { product: Product }) {
  const { removeFromWishlist } = useWishlist();

  return (
    <div className="flex items-center gap-4 border-b border-gray-200 py-4 dark:border-gray-800">
      <Link
        href={`/products/${product.slug}`}
        className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md bg-gray-100 dark:bg-gray-900"
      >
        <Image src={getSafeImageUrl(product.images[0])} alt={product.title} fill className="object-cover" />
      </Link>

      <Link href={`/products/${product.slug}`} className="min-w-0 flex-1">
        <p className="text-xs text-gray-500 dark:text-gray-400">{product.category.name}</p>
        <p className="line-clamp-1 text-sm font-medium text-gray-900 hover:underline dark:text-white">
          {product.title}
        </p>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">${product.price}</p>
      </Link>

      <button
        onClick={() => removeFromWishlist(product.id)}
        className="shrink-0 text-sm text-red-500 hover:text-red-700"
      >
        Remove from wishlist
      </button>
    </div>
  );
}