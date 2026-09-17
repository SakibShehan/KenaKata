"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

const SLIDES = [
  "/images/hero-banner.png",
  "/images/hero-banner-2.jpg",
  "/images/Hero-banner-3.jpeg",
];

const SLIDE_DURATION = 5000; // 5 seconds

export function HeroSlider() {
  const [current, setCurrent] = useState(0);

  const goToNext = useCallback(() => {
    setCurrent((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const goToPrev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  }, []);

// animation for 5 seconds
  useEffect(() => {
    const timer = setTimeout(goToNext, SLIDE_DURATION);
    return () => clearTimeout(timer);
  }, [current, goToNext]);

  return (
    <div className="relative h-full w-full overflow-hidden">
    
      {SLIDES.map((src, index) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={src}
            alt=""
            fill
            priority={index === 0}
            className="object-cover blur-[2px]"
          />
        </div>
      ))}

      
      <button
        onClick={goToPrev}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60"
      >
        ‹
      </button>
      <button
        onClick={goToNext}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60"
      >
        ›
      </button>

// Dots navigation
      <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-2 rounded-full transition-all ${
              index === current ? "w-6 bg-white" : "w-2 bg-white/50 hover:bg-white/75"
            }`}
          />
        ))}
      </div>
    </div>
  );
}