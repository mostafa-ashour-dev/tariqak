import Image from 'next/image';
import React from 'react'

export default function HeroSectionViews() {
  return (
    <div className="hero-section-views">
      <Image
        src="/imgs/hero/mockup1.png"
        alt="Hero Image"
        width={300}
        height={600}
        className="w-[70%] h-[75%] object-contain transform-[translateX(-5rem)_translateY(2rem)] z-20"
      />
      <Image
        src="/imgs/hero/mockup1.png"
        alt="Hero Image"
        width={300}
        height={600}
        className="w-[70%] h-[75%] object-contain absolute top-[8rem] right-[-4rem] rotate-y-[-180deg] z-20"
      />
    </div>
  );
}
