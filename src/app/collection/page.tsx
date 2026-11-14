import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { ServiceStrip } from '@/components/footer';

export const metadata: Metadata = {
  title: 'The Collection',
  description: 'Explore the curated ISHTILE collection: seasonal edits, new arrivals, urban archives and limited drops.',
};

const collections = [
  {
    number: '01',
    title: <>Summer<br />Essentials<br />’25</>,
    image: '/images/summer.jpg',
    href: '/shop?category=T-shirts',
    tone: 'collection-card-lime',
    imageClass: 'collection-image-muted',
  },
  {
    number: '02',
    title: <>New<br />Arrivals</>,
    image: '/images/portrait.jpg',
    href: '/shop?sort=newest',
    tone: 'collection-card-photo',
    imageClass: 'collection-image-mono',
  },
  {
    number: '03',
    title: <>New<br />Arrivals</>,
    image: '/images/monsoon.jpg',
    href: '/shop?sort=newest',
    tone: 'collection-card-blue',
    imageClass: 'collection-image-texture',
  },
  {
    number: '04',
    title: <>Urban<br />Archives</>,
    image: '/images/spring.jpg',
    href: '/shop?category=Layers',
    tone: 'collection-card-violet',
    imageClass: 'collection-image-texture',
  },
  {
    number: '05',
    title: <>Urban<br />Archives</>,
    image: '/images/portrait.jpg',
    href: '/shop?category=Layers',
    tone: 'collection-card-photo',
    imageClass: 'collection-image-mono',
  },
  {
    number: '06',
    title: <>Limited<br />Drops</>,
    image: '/images/festive.jpg',
    href: '/shop?sort=newest',
    tone: 'collection-card-dark',
    imageClass: 'collection-image-muted',
  },
];

export default function CollectionsPage() {
  return (
    <>
      <section className="collection-hero" aria-labelledby="collection-title">
        <Image
          src="/images/hero.jpg"
          alt="ISHTILE monochrome editorial fashion campaign"
          fill
          priority
          sizes="100vw"
          className="collection-hero-image"
        />
        <div className="collection-hero-shade" />
        <div className="collection-hero-content">
          <p className="eyebrow text-cream/65">ISHTILE / CURATED EDIT</p>
          <h1 id="collection-title">The<br />Collection<span>.</span></h1>
          <p className="collection-hero-description">
            Explore our curated<br className="hidden sm:block" /> selection of brands and<br className="hidden sm:block" /> collections.
          </p>
          <Link href="/shop" className="collection-browse-link">
            Browse All <ArrowUpRight size={20} />
          </Link>
        </div>
        <span className="collection-hero-scribble" aria-hidden="true">〰</span>
      </section>

      <main className="collection-main" aria-label="Curated collections">
        <div className="collection-grid">
          {collections.map((collection) => (
            <Link
              key={collection.number}
              href={collection.href}
              className={`collection-tile ${collection.tone}`}
              aria-label={`${collection.number} — explore collection`}
            >
              <Image
                src={collection.image}
                alt=""
                fill
                sizes="(max-width: 640px) 50vw, 33vw"
                className={`collection-tile-image ${collection.imageClass}`}
              />
              <span className="collection-tile-overlay" />
              <span className="collection-tile-number">{collection.number}</span>
              <ArrowUpRight className="collection-tile-arrow" size={23} strokeWidth={1.6} />
              <span className="collection-tile-title">{collection.title}</span>
              <span className="collection-tile-star" aria-hidden="true">✦</span>
            </Link>
          ))}
        </div>
      </main>
      <ServiceStrip />
    </>
  );
}
