
import type { Product } from "@/lib/types";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface GetProductsParams {
  offset?: number;
  limit?: number;
  categoryId?: number;
  title?: string;
}

export async function getProducts(params: GetProductsParams = {}): Promise<Product[]> {
  const query = new URLSearchParams();
  if (params.offset !== undefined) query.set("offset", String(params.offset));
  if (params.limit !== undefined) query.set("limit", String(params.limit));
  if (params.categoryId) query.set("categoryId", String(params.categoryId));
  if (params.title) query.set("title", params.title);

  const res = await fetch(`${BASE_URL}/products?${query.toString()}`, {
    next: { revalidate: 3600 }, // ISR — product list doesn't need to be live-fresh
  });
  if (!res.ok) throw new Error(`Failed to fetch products: ${res.status}`);
  return res.json();
}

//Fronm here we can get 8 featrued products in home page
export async function getFeaturedProducts(limit = 8): Promise<Product[]> {
  return getProducts({ offset: 0, limit });
}