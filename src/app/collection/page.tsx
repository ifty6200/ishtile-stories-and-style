import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { ServiceStrip } from '@/components/footer';
import { CollectionGallery } from '@/components/collection-gallery';

export const metadata: Metadata = {
  title: 'The Collection',
  description: 'Explore the curated ISHTILE collection: seasonal edits, new arrivals, urban archives and limited drops.',
  openGraph: {
    title: 'The Collection | ISHTILE+',
    description: 'Explore the curated ISHTILE collection: seasonal edits, new arrivals, urban archives and limited drops.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Collection | ISHTILE+',
    description: 'Explore the curated ISHTILE collection: seasonal edits, new arrivals, urban archives and limited drops.',
  },
};

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

      <CollectionGallery />
      <ServiceStrip />
    </>
  );
}
