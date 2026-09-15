
"use client";

import Link from "next/link";

export function Navbar() {


  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur dark:border-gray-800 dark:bg-gray-950/80">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          Kenakata
        </Link>

        <div className="flex items-center gap-6">
          <Link
            href="/products"
            className="text-sm font-medium text-gray-700 hover:text-gray-950 dark:text-gray-300 dark:hover:text-white"
          >
            Products
          </Link>

          <Link
            href="/cart"
            aria-label="Cart"
            className="text-gray-700 hover:text-gray-950 dark:text-gray-300 dark:hover:text-white"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.6 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" />
            </svg>
          </Link>

          <Link
            href="/login"
            className="text-sm font-medium text-gray-700 hover:text-gray-950 dark:text-gray-300 dark:hover:text-white"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
          >
            Sign up
          </Link>

        
        </div>
      </nav>
    </header>
  );
}