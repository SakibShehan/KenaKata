import { Hero } from "@/components/home/Hero";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { CategoriesSection } from "@/components/home/CategoriesSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <CategoriesSection />
    </>
  );
}