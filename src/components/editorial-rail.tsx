import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Plus, Sparkle } from 'lucide-react';

function EditorialCards() {
  return (
    <>
      <Link href="/editorial" className="editorial-banner editorial-rail-card min-h-55 rounded p-7 sm:min-h-64 sm:p-10">
        <div className="relative z-10">
          <p className="eyebrow mb-4 text-cream/60">The ISHTILE journal</p>
          <h2 className="text-4xl font-semibold tracking-[-.06em]">Editorial.</h2>
          <p className="mt-2 max-w-45 text-sm leading-relaxed text-cream/75">Fashion, culture and<br />everything in between.</p>
          <span className="text-link mt-6 underline underline-offset-4">Explore the stories <ArrowUpRight size={16} /></span>
        </div>
        <Sparkle className="absolute right-8 top-7 size-17 rotate-12 text-lime" strokeWidth={1} />
      </Link>
      <Link href="/shop?category=T-shirts" className="editorial-rail-card relative flex min-h-55 items-center overflow-hidden rounded bg-lime p-7 sm:min-h-64 sm:p-10">
        <div className="relative z-10">
          <p className="eyebrow mb-4">Less effort. More expression.</p>
          <h2 className="text-4xl font-semibold leading-none tracking-[-.06em]">Everyday<br />essentials.</h2>
          <span className="text-link mt-6 underline underline-offset-4">Find your favourites <ArrowRight size={16} /></span>
        </div>
        <div className="absolute -right-10 bottom-0 top-0 w-3/5 rotate-[-9deg] mix-blend-multiply">
          <Image src="/images/essential-tee.jpg" alt="Black signature essential tee" fill className="object-contain" sizes="(max-width: 768px) 80vw, 70vw" />
        </div>
        <Plus className="absolute right-5 top-5" size={22} strokeWidth={1} />
      </Link>
    </>
  );
}

export function EditorialRail() {
  return (
    <div className="editorial-rail" aria-label="Editorial and essentials">
      <div className="editorial-rail-track">
        <div className="editorial-rail-group"><EditorialCards /></div>
        <div className="editorial-rail-group" aria-hidden="true"><EditorialCards /></div>
      </div>
    </div>
  );
}
