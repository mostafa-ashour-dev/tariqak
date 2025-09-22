"use client";

import useEmblaCarousel from "embla-carousel-react";

export function EmblaCarousel() {
  const [emblaRef] = useEmblaCarousel();

  return (
    <div className="embla overflow-hidden w-full h-screen" ref={emblaRef}>
      <div className="embla__container flex w-full h-full">
        <div className="embla__slide min-w-[100vw] bg-amber-700 h-full">Slide 1</div>
        <div className="embla__slide min-w-[100vw] bg-amber-600 h-full">Slide 2</div>
        <div className="embla__slide min-w-[100vw] bg-amber-500 h-full">Slide 3</div>
      </div>
    </div>
  );
}
