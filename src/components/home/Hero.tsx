// src/components/home/Hero.tsx
export function Hero() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 text-center sm:py-28">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
        Everything you need,
        <br className="hidden sm:block" /> in one place.
      </h1>
      <p className="mx-auto mt-6 max-w-xl text-lg text-gray-600 dark:text-gray-400">
        Discover quality products across every category — from fashion to
        electronics — with fast checkout and honest prices.
      </p>
      
       <a href="/products"
        className="mt-8 inline-block rounded-md bg-gray-900 px-6 py-3 text-sm font-semibold text-white hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
      >
        Shop now
      </a>
    </section>
  );
}