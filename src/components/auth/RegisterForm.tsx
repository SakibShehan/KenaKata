"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { registerSchema, type RegisterFormData } from "@/lib/schemas/auth";
import { useAuth } from "@/context/AuthContext";
import { isEmailAvailable } from "@/lib/api/auth";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function RegisterForm() {
  const { register: registerUser } = useAuth();
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
    const [emailStatus, setEmailStatus] = useState<"idle" | "checking" | "available" | "taken" | "invalid">("idle");
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({ resolver: zodResolver(registerSchema) });

  async function checkEmail() {
    const email = getValues("email");

    if (!email) {
      setEmailStatus("idle");
      return;
    }

    if (!EMAIL_REGEX.test(email)) {
      setEmailStatus("invalid");
      return;
    }

    setEmailStatus("checking");
    const available = await isEmailAvailable(email);
    setEmailStatus(available ? "available" : "taken");
  }

  async function onSubmit(data: RegisterFormData) {
    setServerError(null);
    try {
      await registerUser(data.name, data.email, data.password);
      router.push("/");
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Registration failed");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {serverError && (
        <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600 dark:bg-red-950 dark:text-red-400">
          {serverError}
        </p>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
        <input
          {...register("name")}
          className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-gray-500 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white"
        />
        {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
        <input
          {...register("email")}
          type="email"
          onBlur={checkEmail}
          className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-gray-500 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white"
        />
        {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}

        {!errors.email && emailStatus === "invalid" && (
          <p className="mt-1 text-xs text-red-500">Email format is not valid.</p>
        )}
        {!errors.email && emailStatus === "checking" && (
          <p className="mt-1 text-xs text-gray-500">Checking availability...</p>
        )}
        {!errors.email && emailStatus === "taken" && (
          <p className="mt-1 text-xs text-red-500">This email is already registered.</p>
        )}
        {!errors.email && emailStatus === "available" && (
          <p className="mt-1 text-xs text-green-600">Email is available.</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
        <input
          {...register("password")}
          type="password"
          className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-gray-500 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white"
        />
        {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting || emailStatus === "taken" || emailStatus === "invalid"}
        className="w-full rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 disabled:opacity-50 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
      >
        {isSubmitting ? "Creating account..." : "Create account"}
      </button>
    </form>
  );
}