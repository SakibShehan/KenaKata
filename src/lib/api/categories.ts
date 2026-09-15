import type { Category } from "@/lib/types";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

function isValidCategory(category: Category): boolean {
  const hasCleanName =
    !!category.name &&
    !category.name.includes("[") &&
    !category.name.includes("http");
  const hasImage = !!category.image && category.image.startsWith("http");
  return hasCleanName && hasImage;
}

export async function getCategories(): Promise<Category[]> {
  const res = await fetch(`${BASE_URL}/categories`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error(`Failed to fetch categories: ${res.status}`);
  const categories: Category[] = await res.json();
  return categories.filter(isValidCategory);
}