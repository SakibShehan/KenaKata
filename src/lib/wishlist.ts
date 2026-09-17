// src/lib/wishlist.ts
import type { Product } from "@/lib/types";

const GUEST_WISHLIST_KEY = "kenakata-wishlist-guest";

function userWishlistKey(userId: number) {
  return `kenakata-wishlist-${userId}`;
}

function readWishlist(key: string): Product[] {
  if (typeof window === "undefined") return [];
  const saved = localStorage.getItem(key);
  return saved ? JSON.parse(saved) : [];
}

function mergeWishlists(a: Product[], b: Product[]): Product[] {
  const map = new Map<number, Product>();
  [...a, ...b].forEach((product) => map.set(product.id, product));
  return Array.from(map.values());
}

//Merges after login or signup 
export function mergeGuestWishlistIntoUser(userId: number) {
  const guestItems = readWishlist(GUEST_WISHLIST_KEY);
  if (guestItems.length === 0) return;

  const key = userWishlistKey(userId);
  const merged = mergeWishlists(readWishlist(key), guestItems);

  localStorage.setItem(key, JSON.stringify(merged));
  localStorage.removeItem(GUEST_WISHLIST_KEY);
}

export { GUEST_WISHLIST_KEY, userWishlistKey };