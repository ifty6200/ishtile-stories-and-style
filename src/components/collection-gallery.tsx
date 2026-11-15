'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const slides = [
  { title: 'Summer Essentials ’25', image: 'summer', href: '/shop?category=T-shirts', link: 'Shop the edit' },
  { title: 'New Arrivals', image: 'portrait', href: '/shop?sort=newest', link: 'Discover new' },
  { title: 'Urban Archives', image: 'spring', href: '/shop?category=Layers', link: 'Explore layers' },
  { title: 'Limited Drops', image: 'festive', href: '/shop?sort=newest', link: 'View new drops' },
];

type GalleryTrigger = { start: number; end: number; scroll: (position?: number) => unknown; kill: () => void };

export function CollectionGallery() {
  const galleryRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<GalleryTrigger | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let cancelled = false;
    let scrollTrigger: GalleryTrigger | null = null;

    const setupGallery = async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]);
      if (cancelled || !galleryRef.current) return;
      const frame = gallery.querySelector('.collection-gallery-frame');
      if (!frame) return;

      gsap.registerPlugin(ScrollTrigger);
      scrollTrigger = ScrollTrigger.create({
        trigger: gallery,
        start: 'top top',
        end: () => `+=${window.innerHeight * (slides.length - 1)}`,
        pin: frame,
        pinSpacing: true,
        scrub: 0.4,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const nextIndex = Math.min(
            slides.length - 1,
            Math.round(self.progress * (slides.length - 1)),
          );
          setActiveIndex((currentIndex) => (currentIndex === nextIndex ? currentIndex : nextIndex));
        },
      });
      triggerRef.current = scrollTrigger;
    };

    void setupGallery();
    return () => {
      cancelled = true;
      scrollTrigger?.kill();
      triggerRef.current = null;
    };
  }, []);

  const selectSlide = (index: number) => {
    const trigger = triggerRef.current;
    if (trigger) {
      const progress = index / (slides.length - 1);
      trigger.scroll(trigger.start + (trigger.end - trigger.start) * progress);
    } else {
      setActiveIndex(index);
    }
  };

  const activeSlide = slides[activeIndex];

  return (
    <section ref={galleryRef} className="collection-gallery" aria-label="Featured collection edits">
      <div className="collection-gallery-frame">
        <div className="collection-gallery-images" aria-hidden="true">
          {slides.map((slide, index) => (
            <Image
              key={slide.image}
              src={`/images/${slide.image}.jpg`}
              alt=""
              fill
              sizes="100vw"
              priority={index === 0}
              className={`collection-gallery-image ${index === activeIndex ? 'is-active' : ''}`}
            />
          ))}
        </div>
        <div className="collection-gallery-shade" />
        <div className="collection-gallery-copy" key={activeSlide.title}>
          <p className="eyebrow">ISHTILE / {String(activeIndex + 1).padStart(2, '0')}</p>
          <h2>{activeSlide.title}</h2>
          <Link href={activeSlide.href} className="collection-gallery-link">
            {activeSlide.link} <ArrowUpRight size={20} strokeWidth={1.5} />
          </Link>
        </div>
        <div className="collection-gallery-index" aria-live="polite">
          <span>{String(activeIndex + 1).padStart(2, '0')}</span>
          <span className="collection-gallery-index-divider" />
          <span>{String(slides.length).padStart(2, '0')}</span>
        </div>
        <nav className="collection-gallery-nav" aria-label="Choose a collection edit">
          {slides.map((slide, index) => (
            <button
              key={slide.title}
              type="button"
              aria-pressed={activeIndex === index}
              onClick={() => selectSlide(index)}
            >
              <span>{String(index + 1).padStart(2, '0')}</span>
              {slide.title}
            </button>
          ))}
        </nav>
      </div>
    </section>
  );
}