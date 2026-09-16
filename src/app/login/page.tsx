import { LoginForm } from "@/components/auth/LoginForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-sm px-4 py-16">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Log in</h1>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
        Welcome back to Kenakata.
      </p>
      <div className="mt-6">
        <LoginForm />
      </div>
      <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="font-medium text-gray-900 underline dark:text-white">
          Sign up
        </Link>
      </p>
    </div>
  );
}