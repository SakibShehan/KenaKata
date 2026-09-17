import type { CartItem } from "@/lib/types";

const GUEST_CART_KEY = "kenakata-cart-guest";

function userCartKey(userId: number) {
  return `kenakata-cart-${userId}`;
}

function readCart(key: string): CartItem[] {
  if (typeof window === "undefined") return [];
  const saved = localStorage.getItem(key);
  return saved ? JSON.parse(saved) : [];
}

function mergeCartItems(a: CartItem[], b: CartItem[]): CartItem[] {
  const map = new Map<number, CartItem>();
  [...a, ...b].forEach((item) => {
    const existing = map.get(item.product.id);
    map.set(
      item.product.id,
      existing ? { ...existing, quantity: existing.quantity + item.quantity } : item
    );
  });
  return Array.from(map.values());
}

//Transder guest cart to user cart after login 

export function mergeGuestCartIntoUser(userId: number) {
  const guestItems = readCart(GUEST_CART_KEY);
  if (guestItems.length === 0) return; // nothing to merge

  const key = userCartKey(userId);
  const merged = mergeCartItems(readCart(key), guestItems);

  localStorage.setItem(key, JSON.stringify(merged));
  localStorage.removeItem(GUEST_CART_KEY);
}