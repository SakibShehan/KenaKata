
import { getFeaturedProducts } from "@/lib/api/products";
import { ProductCard } from "@/components/products/ProductCard";

export async function FeaturedProducts() {
  const products = await getFeaturedProducts(12);

  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
        Featured Products
      </h2>
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}