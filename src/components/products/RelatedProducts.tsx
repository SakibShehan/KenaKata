import { getRelatedProducts } from "@/lib/api/products";
import { ProductCard } from "@/components/products/ProductCard";

export async function RelatedProducts({
  categoryId,
  excludeId,
}: {
  categoryId: number;
  excludeId: number;
}) {
  const related = await getRelatedProducts(categoryId, excludeId, 4);
  if (related.length === 0) return null;

  return (
    <section className="mt-16">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
        Related Products
      </h2>
      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {related.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}