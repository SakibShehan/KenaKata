
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCheckout } from "@/context/CheckoutContext";
import { useCart } from "@/context/CartContext";
import { OrderReview } from "@/components/checkout/OrderReview";
import { ThankYouModal } from "@/components/checkout/ThankYouModal";

export default function CheckoutConfirmPage() {
  const router = useRouter();
  const { orderInfo } = useCheckout();
  const { items, clearCart } = useCart();
  const [placed, setPlaced] = useState(false);

  // No order info in memory (direct visit, or a refresh wiped it) → back to the form.
  useEffect(() => {
    if (!orderInfo || items.length === 0) {
      router.replace("/checkout");
    }
  }, [orderInfo, items.length, router]);

  function handleConfirmOrder() {
    setPlaced(true);
  }

  function handleBackdropClick() {
    clearCart();
    router.push("/");
  }

  function handleViewMore() {
    clearCart();
    router.push("/products");
  }

  if (!orderInfo) return null; // brief flash before the redirect effect kicks in

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Review Your Order</h1>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
        Double-check everything before confirming.
      </p>

      <div className="mt-8 rounded-lg border border-gray-200 p-6 dark:border-gray-800">
        <OrderReview orderInfo={orderInfo} />
      </div>

      <button
        onClick={handleConfirmOrder}
        className="mt-8 w-full rounded-md bg-gray-900 px-4 py-3 text-sm font-semibold text-white hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
      >
        Confirm Order — Cash on Delivery
      </button>

      {placed && (
        <ThankYouModal onBackdropClick={handleBackdropClick} onViewMore={handleViewMore} />
      )}
    </div>
  );
}