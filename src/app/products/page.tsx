import { getProducts, PRODUCTS_PER_PAGE } from "@/lib/api/products";
import { getCategories } from "@/lib/api/categories";
import { ProductFilters } from "@/components/products/ProductFilters";
import { ProductGrid } from "@/components/products/ProductGrid";
import { Pagination } from "@/components/products/Pagination";
import type { Product } from "@/lib/types";

interface Props {
  searchParams: Promise<{
    q?: string;
    category?: string;
    price_min?: string;
    price_max?: string;
    sort?: string;
    page?: string;
  }>;
}

function sortProducts(products: Product[], sort?: string): Product[] {
  const sorted = [...products];
  switch (sort) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "name-asc":
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    default:
      return sorted;
  }
}

export default async function ProductsPage({ searchParams }: Props) {
  const params = await searchParams;
  const page = Number(params.page ?? 1);
  const offset = (page - 1) * PRODUCTS_PER_PAGE;

  const [rawProducts, categories] = await Promise.all([
    getProducts({
      title: params.q,
      categoryId: params.category ? Number(params.category) : undefined,
      price_min: params.price_min ? Number(params.price_min) : undefined,
      price_max: params.price_max ? Number(params.price_max) : undefined,
      offset,
      limit: PRODUCTS_PER_PAGE + 1, // fetch one extra to detect a next page
    }),
    getCategories(),
  ]);

  const hasNextPage = rawProducts.length > PRODUCTS_PER_PAGE;
  const products = sortProducts(rawProducts.slice(0, PRODUCTS_PER_PAGE), params.sort);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">All Products</h1>

      <div className="mt-6">
        <ProductFilters categories={categories} />
      </div>

      <div className="mt-8">
        <ProductGrid products={products} />
      </div>

      {products.length > 0 && <Pagination hasNextPage={hasNextPage} />}
    </div>
  );
}



