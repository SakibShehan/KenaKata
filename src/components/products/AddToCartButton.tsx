// src/components/products/AddToCartButton.tsx
"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/lib/types";

interface Props {
  product: Product;
  variant?: "full" | "compact";
}

export function AddToCartButton({ product, variant = "full" }: Props) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  if (variant === "compact") {
    return (
      <button
        onClick={handleClick}
        className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-xs font-medium text-gray-900 hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800"
      >
        {added ? "Added ✓" : "Add to Cart"}
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      className="flex-1 rounded-md bg-gray-900 px-6 py-3 text-sm font-semibold text-white hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
    >
      {added ? "Added to cart ✓" : "Add to Cart"}
    </button>
  );
}