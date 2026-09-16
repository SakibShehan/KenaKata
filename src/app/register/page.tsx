import { RegisterForm } from "@/components/auth/RegisterForm";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="mx-auto max-w-sm px-4 py-16">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create an account</h1>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
        Join Kenakata to check out faster.
      </p>
      <div className="mt-6">
        <RegisterForm />
      </div>
      <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-gray-900 underline dark:text-white">
          Log in
        </Link>
      </p>
    </div>
  );
}