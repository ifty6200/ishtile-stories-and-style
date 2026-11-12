import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/collection")({
  head: () => ({ meta: [
    { title: "The Collection — ISHTILE" },
    { name: "description", content: "Explore curated collections from across the ISHTILE universe." },
  ]}),
  component: CollectionPage,
});

const photo = (id:string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1400&q=88`;
const tiles = [
  { title: <>Summer<br/>Essentials<br/>'25</>, href:"/shop", kind:"lime", aria:"Summer Essentials 25" },
  { title:null, href:"/shop", kind:"women", aria:"Women's fashion portrait" },
  { title:<>New<br/>Arrivals</>, href:"/shop", kind:"blue", aria:"New Arrivals" },
  { title:<>Urban<br/>Archives</>, href:"/shop", kind:"violet", aria:"Urban Archives" },
  { title:null, href:"/shop", kind:"men", aria:"Men's fashion portrait" },
  { title:<>Limited<br/>Drops</>, href:"/shop", kind:"black", aria:"Limited Drops" },
];

function CollectionPage() {
  return <main className="collection-page">
    <section className="collection-hero">
      <div className="collection-hero-photo" role="img" aria-label="Black and white editorial portrait of a male model wearing sunglasses"/>
      <div className="collection-hero-copy">
        <p className="collection-eyebrow">ISHTILE / CURATED EDIT</p>
        <h1>The<br/>Collection<span>.</span></h1>
        <p>Explore our curated<br/>selection of brands and<br/>collections.</p>
        <Link to="/shop" className="collection-browse">Browse All <ArrowRight size={16}/></Link>
      </div>
      <span className="collection-lime-scribble" aria-hidden="true">〰〰〰</span>
    </section>
    <section className="collection-tiles" aria-label="Explore collections">
      {tiles.map((tile,i)=><Link key={tile.kind} to={tile.href} className={`collection-tile collection-${tile.kind}`} aria-label={tile.aria}>
        {(tile.kind==="women"||tile.kind==="men")&&<span className="collection-image" aria-hidden="true"/>}
        {tile.title&&<span className="collection-tile-title">{tile.title}</span>}
        <span className="collection-tile-star" aria-hidden="true">✦</span>
        <span className="collection-tile-index">0{i+1}</span>
        <ArrowUpRight className="collection-tile-arrow" size={17}/>
      </Link>)}
    </section>
    <div className="collection-footer"><span>ISHTILE / STORIES AND STYLE</span><span>DISCOVER BEYOND LABELS. ✦</span></div>
  </main>;
}
