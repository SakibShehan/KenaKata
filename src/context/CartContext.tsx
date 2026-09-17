"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import type { CartItem, Product } from "@/lib/types";
import { useAuth } from "@/context/AuthContext";

interface CartContextValue {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
}

const CartContext = createContext<CartContextValue | null>(null);

const GUEST_CART_KEY = "kenakata-cart-guest";

function cartKey(userId: number | undefined): string {
  return userId ? `kenakata-cart-${userId}` : GUEST_CART_KEY;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const { user, loading: authLoading } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Things added to cart automatically after login and stored in local storage. 
  useEffect(() => {
    if (authLoading) return;
    const key = cartKey(user?.id);
    const saved = localStorage.getItem(key);
    setItems(saved ? JSON.parse(saved) : []);
    setHydrated(true);
  }, [user?.id, authLoading]);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(cartKey(user?.id), JSON.stringify(items));
  }, [items, hydrated, user?.id]);

  function addItem(product: Product) {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  }

  function removeItem(productId: number) {
    setItems((prev) => prev.filter((i) => i.product.id !== productId));
  }

  function updateQuantity(productId: number, quantity: number) {
    if (quantity < 1) return;
    setItems((prev) =>
      prev.map((i) => (i.product.id === productId ? { ...i, quantity } : i))
    );
  }

  function clearCart() {
    setItems([]);
  }

  const total = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clearCart, total, itemCount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}