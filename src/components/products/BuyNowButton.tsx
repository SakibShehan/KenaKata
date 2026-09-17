// src/components/products/BuyNowButton.tsx
"use client";

import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/lib/types";

interface Props {
  product: Product;
  variant?: "full" | "compact";
}

export function BuyNowButton({ product, variant = "compact" }: Props) {
  const { addItem } = useCart();
  const router = useRouter();

  function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    router.push("/cart");
  }

  if (variant === "full") {
    return (
      <button
        onClick={handleClick}
        className="flex-1 rounded-md border-2 border-gray-900 px-6 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-900 hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-gray-900"
      >
        Buy Now
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      className="flex-1 rounded-md bg-gray-900 px-3 py-2 text-xs font-medium text-white hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
    >
      Buy Now
    </button>
  );
}