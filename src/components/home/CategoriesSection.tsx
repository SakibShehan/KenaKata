import Image from "next/image";
import Link from "next/link";
import { getCategories } from "@/lib/api/categories";

export async function CategoriesSection() {
  const categories = await getCategories();
  const shown = categories.slice(0, 7);

  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
        Shop by Category
      </h2>
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {shown.map((category) => (
          <Link
            key={category.id}
            href={`/products?category=${category.id}`}
            className="group overflow-hidden rounded-lg border border-gray-200 text-center dark:border-gray-800"
          >
            <div className="relative aspect-square w-full bg-gray-100 dark:bg-gray-900">
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
            </div>
            <p className="p-2 text-sm font-medium text-gray-900 dark:text-white">
              {category.name}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}