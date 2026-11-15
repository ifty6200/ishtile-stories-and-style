'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ArrowUpRight, Sparkle } from 'lucide-react';
import { useState } from 'react';

const slides = [
  { image: 'hero', alt: 'Expressive streetwear portrait with colourful collage artwork' },
  { image: 'spring', alt: 'A fresh editorial look from the ISHTILE spring collection' },
  { image: 'summer', alt: 'Summer fashion from the ISHTILE collection' },
  { image: 'portrait', alt: 'An editorial portrait from the ISHTILE collection' },
];

export function HomeHero() {
  const [activeIndex, setActiveIndex] = useState(0);

  const changeSlide = (direction: -1 | 1) => {
    setActiveIndex((current) => (current + direction + slides.length) % slides.length);
  };

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-art" aria-hidden="true">
        {slides.map((slide, index) => (
          <Image
            key={slide.image}
            src={`/images/${slide.image}.jpg`}
            alt={slide.alt}
            fill
            priority={index === 0}
            loading={index === 0 ? 'eager' : 'lazy'}
            sizes="(max-width: 640px) 150vw, 75vw"
            className={`hero-art-image ${index === activeIndex ? 'is-active' : ''}`}
          />
        ))}
      </div>
      <Sparkle className="hero-star" strokeWidth={1.2} aria-hidden="true" />
      <div className="site-width hero-content">
        <p className="eyebrow text-cream/60">Independent labels. Unlimited expression.</p>
        <h1 id="hero-title">
          MORE
          <br />
          FASHION.
          <br />
          <span className="text-lime">MORE YOU.</span>
        </h1>
        <Link
          href="/brands"
          className="mt-8 inline-flex items-center gap-7 border-b border-lime/70 pb-2 text-sm sm:mt-10 sm:text-base"
        >
          Discover beyond labels <ArrowUpRight size={20} className="text-lime" />
        </Link>
      </div>
      <div className="hero-bottom">
        <span className="hero-edition"><span aria-hidden="true" /> THE WORLD OF ISHTILE</span>
        <div className="hero-slide-controls" aria-label="Homepage campaign slides">
          <span className="hero-slide-count" aria-live="polite">
            {String(activeIndex + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
          </span>
          <button type="button" onClick={() => changeSlide(-1)} aria-label="Previous campaign image">
            <ArrowLeft size={16} strokeWidth={1.5} />
          </button>
          <button type="button" onClick={() => changeSlide(1)} aria-label="Next campaign image">
            <ArrowRight size={16} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </section>
  );
}