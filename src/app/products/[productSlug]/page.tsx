import { notFound } from "next/navigation";
import Image from "next/image";
import { getProductBySlug } from "@/lib/api/products";
import { getSafeImageUrl } from "@/lib/utils";
import { AddToCartButton } from "@/components/products/AddToCartButton";
import { RelatedProducts } from "@/components/products/RelatedProducts";

interface Props {
  params: Promise<{ productSlug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { productSlug } = await params;
  const product = await getProductBySlug(productSlug);
  if (!product) return { title: "Product not found — Kenakata" };
  return {
    title: `${product.title} — Kenakata`,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { productSlug } = await params;
  const product = await getProductBySlug(productSlug);
  if (!product) notFound();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="grid gap-8 sm:grid-cols-2">
        <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-900">
          <Image
            src={getSafeImageUrl(product.images[0])}
            alt={product.title}
            fill
            priority
            className="object-cover"
          />
        </div>

        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {product.title}
          </h1>
          <p className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">
            ${product.price}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
            {product.description}
          </p>

          <div className="mt-6">
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>

      <RelatedProducts categoryId={product.category.id} excludeId={product.id} />
    </div>
  );
}