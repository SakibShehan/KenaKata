
"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import type { Category } from "@/lib/types";

export function ProductFilters({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [q, setQ] = useState(searchParams.get("q") ?? "");
  const [priceMin, setPriceMin] = useState(searchParams.get("price_min") ?? "");
  const [priceMax, setPriceMax] = useState(searchParams.get("price_max") ?? "");

  // Skip debounce on the very first render
  const isFirstRender = useRef(true);

  function applyFilters(overrides: Record<string, string | null> = {}) {
    const params = new URLSearchParams(searchParams.toString());

    const values: Record<string, string> = {
      q,
      price_min: priceMin,
      price_max: priceMax,
      ...overrides,
    };

    Object.entries(values).forEach(([key, value]) => {
      if (value) params.set(key, value);
      else params.delete(key);
    });

    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  }

  // Live search
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const timeout = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (q) params.set("q", q);
      else params.delete("q"); // this is what makes clearing the box work
      params.delete("page");
      router.push(`${pathname}?${params.toString()}`);
    }, 400);

    return () => clearTimeout(timeout);
  }, [q]);

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end">
      {/* Search */}
      <div className="flex-1 min-w-[180px]">
        <label className="block text-xs font-medium text-gray-500 dark:text-gray-400">
          Search
        </label>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search products..."
          className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-gray-500 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white"
        />
      </div>

      {/* Category */}
      <div className="min-w-[160px]">
        <label className="block text-xs font-medium text-gray-500 dark:text-gray-400">
          Category
        </label>
        <select
          value={searchParams.get("category") ?? ""}
          onChange={(e) => applyFilters({ category: e.target.value || null })}
          className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-gray-500 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white"
        >
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* Price range */}
      <div className="flex gap-2">
        <div>
          <label className="block text-xs font-medium text-gray-500 dark:text-gray-400">
            Min $
          </label>
          <input
            type="number"
            min={0}
            value={priceMin}
            onChange={(e) => setPriceMin(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && applyFilters()}
            className="mt-1 w-24 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-gray-500 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 dark:text-gray-400">
            Max $
          </label>
          <input
            type="number"
            min={0}
            value={priceMax}
            onChange={(e) => setPriceMax(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && applyFilters()}
            className="mt-1 w-24 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-gray-500 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white"
          />
        </div>
      </div>

      {/* Sort */}
      <div className="min-w-[160px]">
        <label className="block text-xs font-medium text-gray-500 dark:text-gray-400">
          Sort by
        </label>
        <select
          value={searchParams.get("sort") ?? "default"}
          onChange={(e) => applyFilters({ sort: e.target.value })}
          className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-gray-500 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white"
        >
          <option value="default">Default</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="name-asc">Name: A–Z</option>
        </select>
      </div>

      <button
        onClick={() => applyFilters()}
        className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
      >
        Apply
      </button>
    </div>
  );
}