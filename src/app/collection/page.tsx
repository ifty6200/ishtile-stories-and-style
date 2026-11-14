import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { ServiceStrip } from '@/components/footer';

export const metadata: Metadata = { title: 'Collections' };

const collections = [
  {
    number: '01',
    title: 'Spring / In Bloom',
    description: 'Light layers and fresh perspectives for the season ahead.',
    image: '/images/spring.jpg',
    href: '/shop?sort=newest',
    tone: 'collection-card-light',
  },
  {
    number: '02',
    title: 'Summer Essentials',
    description: 'Easy pieces, considered silhouettes, everyday comfort.',
    image: '/images/summer.jpg',
    href: '/shop?category=T-shirts',
    tone: 'collection-card-lime',
  },
  {
    number: '03',
    title: 'Festive Edit',
    description: 'A contemporary take on pieces made for getting together.',
    image: '/images/festive.jpg',
    href: '/brands/roots',
    tone: 'collection-card-dark',
  },
  {
    number: '04',
    title: 'Monsoon Layers',
    description: 'Functional layers for changing skies and moving days.',
    image: '/images/monsoon.jpg',
    href: '/shop?category=Layers',
    tone: 'collection-card-light',
  },
];

export default function CollectionsPage() {
  return (
    <>
      <main className="site-width pb-16">
        <div className="breadcrumb pt-8">
          <Link href="/">Home</Link>
          <span>/</span>
          <span>Collections</span>
        </div>
        <section className="collection-intro relative overflow-hidden py-14 sm:py-22">
          <div className="relative z-10 max-w-3xl">
            <p className="eyebrow mb-5 text-ink/50">ISHTILE / CURATED EDIT</p>
            <h1 className="page-heading">
              The Collection<span className="text-[#a2b52e]">.</span>
            </h1>
            <p className="mt-6 max-w-lg text-sm leading-relaxed text-ink/65 sm:text-base">
              A changing selection of ideas, moods and pieces. Explore the edits
              that bring our independent labels together.
            </p>
            <Link href="/shop" className="text-link mt-7 inline-flex">
              Browse all <ArrowUpRight size={17} />
            </Link>
          </div>
          <span aria-hidden="true" className="collection-intro-mark">✦</span>
        </section>
        <section aria-label="Curated collections" className="grid gap-4 sm:grid-cols-2">
          {collections.map((collection) => (
            <Link
              key={collection.number}
              href={collection.href}
              className={`collection-card group ${collection.tone}`}
            >
              <Image
                src={collection.image}
                alt=""
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.035]"
              />
              <span className="collection-card-shade" />
              <span className="collection-card-number">{collection.number}</span>
              <span className="collection-card-arrow"><ArrowUpRight size={22} /></span>
              <span className="collection-card-copy">
                <span className="eyebrow mb-3 block">{collection.number} / CURATED EDIT</span>
                <span className="block text-3xl font-semibold leading-[.98] tracking-[-.055em] sm:text-4xl">
                  {collection.title}
                </span>
                <span className="mt-3 block max-w-xs text-sm leading-relaxed opacity-75">
                  {collection.description}
                </span>
                <span className="mt-6 inline-flex items-center gap-2 text-sm underline underline-offset-4">
                  Explore collection <ArrowUpRight size={16} />
                </span>
              </span>
              <span aria-hidden="true" className="collection-card-star">✦</span>
            </Link>
          ))}
        </section>
      </main>
      <ServiceStrip />
    </>
  );
}
