import { CheckoutForm } from "@/components/checkout/CheckoutForm";

export default function CheckoutPage() {
  return (
    <div className="mx-auto max-w-lg px-4 py-12">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Checkout</h1>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
        Enter your delivery details to continue.
      </p>
      <div className="mt-6">
        <CheckoutForm />
      </div>
    </div>
  );
}