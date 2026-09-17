import { HeroSlider } from "@/components/home/HeroSlider";

export function Hero() {
  return (
    <section className="relative isolate h-[400px] overflow-hidden sm:h-[600px]">
      
      <div className="absolute inset-0 z-0">
        <HeroSlider />
      </div>


      <div className="absolute inset-0 z-10 bg-black/50" />


      <div className="relative z-20 mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
          Everything you need,
          <br className="hidden sm:block" /> in one place.
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-lg text-gray-200">
          Discover quality products across every category — from fashion to
          electronics — with fast checkout and honest prices.
        </p>

        <a
          href="/products"
          className="mt-8 inline-block rounded-md bg-white px-6 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-200"
        >
          Shop now
        </a>
      </div>
    </section>
  );
}