// src/components/products/ProductCard.tsx
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/types";
import { getSafeImageUrl } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800"
    >
      <div className="relative aspect-square w-full overflow-hidden bg-gray-100 dark:bg-gray-900">
        <Image
          src={getSafeImageUrl(product.images[0])}
          alt={product.title}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
      </div>
      <div className="p-3">
        <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
          {product.title}
        </p>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          ${product.price}
        </p>
      </div>
    </Link>
  );
}