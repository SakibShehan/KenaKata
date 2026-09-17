"use client";

import { useWishlist } from "@/context/WishlistContext";
import { WishlistItemTile } from "@/components/wishlist/WishlistItemTile";
import { EmptyWishlist } from "@/components/wishlist/EmptyWishlist";

export default function WishlistPage() {
  const { items } = useWishlist();

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        See Your Favourite Things Here
      </h1>

      {items.length === 0 ? (
        <EmptyWishlist />
      ) : (
        <div className="mt-8">
          {items.map((product) => (
            <WishlistItemTile key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}