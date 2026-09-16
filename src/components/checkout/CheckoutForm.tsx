"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { checkoutSchema, type CheckoutFormData } from "@/lib/schemas/checkout";
import { useCheckout } from "@/context/CheckoutContext";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

export function CheckoutForm() {
  const router = useRouter();
  const { setOrderInfo } = useCheckout();
  const { items } = useCart();
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: user?.name ?? "",
      email: user?.email ?? "",
      phone: "",
      location: "",
    },
  });

  // Nothing to check out? Send them back to the cart instead of an empty form.
  useEffect(() => {
    if (items.length === 0) router.replace("/cart");
  }, [items.length, router]);

  function onSubmit(data: CheckoutFormData) {
    setOrderInfo(data);
    router.push("/checkout/confirm");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Full Name
        </label>
        <input
          {...register("fullName")}
          className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-gray-500 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white"
        />
        {errors.fullName && <p className="mt-1 text-xs text-red-500">{errors.fullName.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Phone Number
        </label>
        <input
          {...register("phone")}
          placeholder="e.g. +880 1XXXXXXXXX"
          className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-gray-500 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white"
        />
        {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Email
        </label>
        <input
          {...register("email")}
          type="email"
          className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-gray-500 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white"
        />
        {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Delivery Location
        </label>
        <textarea
          {...register("location")}
          rows={3}
          placeholder="House, road, area, city..."
          className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-gray-500 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white"
        />
        {errors.location && <p className="mt-1 text-xs text-red-500">{errors.location.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-md bg-gray-900 px-4 py-3 text-sm font-semibold text-white hover:bg-gray-700 disabled:opacity-50 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
      >
        Confirm Checkout
      </button>
    </form>
  );
}