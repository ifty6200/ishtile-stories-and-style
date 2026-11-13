import { createFileRoute, Link } from "@tanstack/react-router";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export const Route = createFileRoute("/brands")({
  head: () => ({ meta: [
    { title: "The Brands — ISHTILE" },
    { name: "description", content: "Meet the independent labels that make up the ISHTILE universe." },
  ]}),
  component: BrandsPage,
});

const brands = [
  { slug: "onen", name: "ONEN", note: "Quiet forms. Clear identity.", story: "Everyday dressing, reduced to its most considered form.", image: "photo-1529139574466-a303027c1d8b", position: "center 38%" },
  { slug: "farak", name: "FARAK", note: "A different point of view.", story: "Individuality, confident silhouettes and a little difference.", image: "photo-1515886657613-9f3515b0c78f", position: "center 30%" },
  { slug: "mocha", name: "MOCHA", note: "Objects for everyday life.", story: "Thoughtful accessories and useful objects with a clear visual language.", image: "photo-1539109136881-3be0616acf4b", position: "center 35%" },
  { slug: "pilgrim", name: "PILGRIM", note: "Made to move forward.", story: "Contemporary footwear for days that do not stand still.", image: "photo-1503342217505-b0a15ec3261c", position: "center 42%" },
  { slug: "essentials", name: "ISHTILE Essentials", note: "The everyday, considered.", story: "Familiar forms, easy styling and details that make them your own.", image: "photo-1521572163474-6864f9cf17ab", position: "center 42%" },
];
const photo = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=2200&q=90`;

function BrandsPage() {
  const root = useRef<HTMLElement>(null);
  useGSAP(() => {
    const panels = gsap.utils.toArray<HTMLElement>(".brand-gallery-slide", root.current);
    if (panels.length < 2 || window.matchMedia("(max-width: 760px)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.set(panels.slice(1), { autoAlpha: 0 });
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: root.current,
        start: "top top",
        end: () => `+=${window.innerHeight * (panels.length - 1)}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });
    panels.slice(1).forEach((panel, index) => {
      const previous = panels[index];
      if (!previous) return;
      timeline.to(previous, { autoAlpha: 0, duration: 1, ease: "none" }, index);
      timeline.fromTo(panel, { autoAlpha: 0 }, { autoAlpha: 1, duration: 1, ease: "none" }, index);
      timeline.fromTo(panel.querySelector(".brand-gallery-copy"), { y: 34 }, { y: 0, duration: 1, ease: "none" }, index);
    });
    return () => timeline.scrollTrigger?.kill();
  }, { scope: root });

  return <main className="brands-index-page">
    <section className="brand-gallery" ref={root} aria-label="Explore ISHTILE brands">
      {brands.map((brand, index) => <article className="brand-gallery-slide" key={brand.slug} style={{ backgroundImage: `linear-gradient(90deg,rgba(9,9,9,.78) 0%,rgba(9,9,9,.3) 54%,rgba(9,9,9,.08) 100%),url("${photo(brand.image)}")`, backgroundPosition: brand.position }}>
        <div className="brand-gallery-top"><span>ISHTILE / INDEPENDENT LABELS</span><span>0{index + 1} — 0{brands.length}</span></div>
        <div className="brand-gallery-copy">
          <p className="eyebrow">THE ISHTILE UNIVERSE / BRAND 0{index + 1}</p>
          <h1>{brand.name}<i>.</i></h1>
          <p className="brand-gallery-note">{brand.note}</p>
          <p className="brand-gallery-story">{brand.story}</p>
          <Link to="/discover/$type/$slug" params={{ type: "brand", slug: brand.slug }} className="brand-gallery-explore">EXPLORE {brand.name.toUpperCase()} <ArrowUpRight size={17}/></Link>
        </div>
        <div className="brand-gallery-bottom"><span>SCROLL TO DISCOVER</span><ArrowDown size={16}/><span>DISCOVER BEYOND LABELS.</span></div>
      </article>)}
    </section>
    <div className="brand-gallery-mobile-list">
      {brands.map((brand,index)=><Link key={brand.slug} to="/discover/$type/$slug" params={{type:"brand",slug:brand.slug}} className="brand-mobile-card" style={{backgroundImage:`linear-gradient(90deg,rgba(0,0,0,.65),rgba(0,0,0,.08)),url("${photo(brand.image)}")`,backgroundPosition:brand.position}}>
        <span>0{index+1} / ISHTILE LABEL</span><strong>{brand.name}</strong><b>EXPLORE <ArrowUpRight size={15}/></b>
      </Link>)}
    </div>
  </main>;
}
