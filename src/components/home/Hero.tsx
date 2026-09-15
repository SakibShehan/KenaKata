// src/components/home/Hero.tsx
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* Layer 1: blurred background image */}
      <Image
        src="/images/hero-banner.png"
        alt=""
        fill
        priority
        className="object-cover blur-none"
      />

      {/* Layer 2: dark overlay so white text stays readable */}
      <div className="absolute bg-black/10" />

      {/* Layer 3: actual content, sharp and on top */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 text-center sm:py-28">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
          Everything you need,
          <br className="hidden sm:block" /> in one place.
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-gray-200">
          Discover quality products across every category — from fashion to
          electronics — with fast checkout and honest prices.
        </p>
        
        <a  href="/products"
          className="mt-8 inline-block rounded-md bg-white px-6 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-200"
        >
          Shop now
        </a>
      </div>
    </section>
  );
}