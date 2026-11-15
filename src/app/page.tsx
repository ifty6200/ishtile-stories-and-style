import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Plus, Sparkle } from 'lucide-react';
import { brands, products } from '@/lib/catalog';
import { HomeHero } from '@/components/home-hero';
import { EditorialRail } from '@/components/editorial-rail';
import { ProductCard } from '@/components/product-card';
import { BrandCard } from '@/components/brand-card';
import { ServiceStrip } from '@/components/footer';

export const metadata: Metadata = {
  title: 'ISHTILE+ — More Fashion. More You.',
  description: 'Discover independent fashion labels, new arrivals, and everyday essentials at ISHTILE+.',
  openGraph: {
    title: 'ISHTILE+ — More Fashion. More You.',
    description: 'Discover independent fashion labels, new arrivals, and everyday essentials at ISHTILE+.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ISHTILE+ — More Fashion. More You.',
    description: 'Discover independent fashion labels, new arrivals, and everyday essentials at ISHTILE+.',
  },
};

export default function Home() {
  return (
    <>
      <HomeHero />
      <nav className="campaign-track" aria-label="Shop collections">
        {[
          {
            image: 'spring',
            label: 'Spring collection — shop new arrivals',
            href: '/shop?sort=newest',
          },
          {
            image: 'summer',
            label: 'Summer essentials — shop T-shirts',
            href: '/shop?category=T-shirts',
          },
          { image: 'festive', label: 'Festive collection — explore ROOTS', href: '/brands/roots' },
          {
            image: 'monsoon',
            label: 'Monsoon collection — shop layers',
            href: '/shop?category=Layers',
          },
        ].map((campaign) => (
          <Link
            key={campaign.image}
            href={campaign.href}
            className="campaign-tile"
            aria-label={campaign.label}
          >
            <Image
              src={`/images/${campaign.image}.jpg`}
              alt={campaign.label}
              fill
              sizes="(max-width: 640px) 230px, 25vw"
            />
          </Link>
        ))}
      </nav>
      <section className="site-width pb-13 pt-8 sm:pb-18 sm:pt-12" aria-labelledby="featured-title">
        <div className="mb-7 flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow mb-2 text-ink/50">Good pieces. Great possibilities.</p>
            <h2 id="featured-title" className="section-title">
              Featured products.
            </h2>
          </div>
          <Link href="/shop" className="text-link pb-1">
            View all <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-7 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6">
          {products.slice(0, 12).map((product, index) => (
            <div key={product.slug} className={index >= 6 ? 'hidden sm:block' : ''}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
        <Link href="/shop" className="button-dark mx-auto mt-8 flex w-fit sm:hidden">
          Explore all products <ArrowRight size={16} />
        </Link>
      </section>
      <EditorialRail />
      <section className="site-width py-14 sm:py-20" aria-labelledby="brands-title">
        <div className="mb-7 flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow mb-2 text-ink/50">Different brands. One universe.</p>
            <h2 className="section-title" id="brands-title">
              Find your people.
            </h2>
            <p className="mt-3 text-sm text-ink/60">
              Independent minds. Distinct identities. All in one place.
            </p>
          </div>
          <Link href="/brands" className="text-link pb-1">
            All brands <ArrowRight size={16} />
          </Link>
        </div>
        <div className="home-brand-rail grid auto-cols-[78%] grid-flow-col gap-3 overflow-x-auto overscroll-x-contain pb-3 sm:auto-cols-[32%] lg:auto-cols-[23%]">
          {brands.slice(0, 4).map((brand, index) => (
            <BrandCard key={brand.slug} brand={brand} index={index} />
          ))}
        </div>
      </section>
      <ServiceStrip />
    </>
  );
}
