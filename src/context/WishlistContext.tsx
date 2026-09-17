"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import type { Product } from "@/lib/types";
import { useAuth } from "@/context/AuthContext";
import { GUEST_WISHLIST_KEY, userWishlistKey } from "@/lib/wishlist";

interface WishlistContextValue {
  items: Product[];
  toggleWishlist: (product: Product) => void;
  removeFromWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
  count: number;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);

function wishlistKey(userId: number | undefined): string {
  return userId ? userWishlistKey(userId) : GUEST_WISHLIST_KEY;
}

export function WishlistProvider({ children }: { children: ReactNode }) {
  const { user, loading: authLoading } = useAuth();
  const [items, setItems] = useState<Product[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (authLoading) return;
    const key = wishlistKey(user?.id);
    const saved = localStorage.getItem(key);
    setItems(saved ? JSON.parse(saved) : []);
    setHydrated(true);
  }, [user?.id, authLoading]);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(wishlistKey(user?.id), JSON.stringify(items));
  }, [items, hydrated, user?.id]);

  function toggleWishlist(product: Product) {
    setItems((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) return prev.filter((p) => p.id !== product.id);
      return [...prev, product];
    });
  }

  function removeFromWishlist(productId: number) {
    setItems((prev) => prev.filter((p) => p.id !== productId));
  }

  function isInWishlist(productId: number) {
    return items.some((p) => p.id === productId);
  }

  return (
    <WishlistContext.Provider
      value={{ items, toggleWishlist, removeFromWishlist, isInWishlist, count: items.length }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}