import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/discover/$type/$slug")({
  head: ({ params }) => ({ meta: [{ title: decodeURIComponent(params.slug).replace(/-/g," ") + " — ISHTILE" }] }),
  component: DiscoverPage,
});
const products = [
  {id:"tee",brand:"ISHTILE Essentials",name:"Oversized Logo Tee",price:2490,category:"men",image:"photo-1521572163474-6864f9cf17ab"},
  {id:"shirt",brand:"ONEN",name:"Everyday Essential Shirt",price:3290,category:"men",image:"photo-1598033129183-c4f50c736f10"},
  {id:"trouser",brand:"FARAK",name:"Relaxed Fit Trousers",price:3890,category:"men",image:"photo-1473966968600-fa801b869a1a"},
  {id:"bag",brand:"MOCHA",name:"Minimal Crossbody Bag",price:2190,category:"accessories",image:"photo-1548036328-c9fa89d128fa"},
  {id:"sneaker",brand:"PILGRIM",name:"Contemporary Sneakers",price:5490,category:"footwear",image:"photo-1542291026-7eec264c27ff"},
  {id:"cap",brand:"ISHTILE Essentials",name:"Structured Everyday Cap",price:1490,category:"lifestyle",image:"photo-1588850561407-ed78c282e89b"},
];
const brands:Record<string,{name:string;note:string;story:string}> = {
  onen:{name:"ONEN",note:"Quiet forms. Clear identity.",story:"ONEN explores everyday dressing through considered shapes, clean lines and pieces designed to work beyond a single season."},
  farak:{name:"FARAK",note:"A different point of view.",story:"FARAK is built around individuality and a confident point of view. Discover pieces that bring a little difference to the everyday."},
  mocha:{name:"MOCHA",note:"Objects for everyday life.",story:"MOCHA brings together useful objects and understated accessories, balancing function with a thoughtful visual language."},
  pilgrim:{name:"PILGRIM",note:"Made to move forward.",story:"PILGRIM approaches footwear and movement with a contemporary outlook, creating pieces for days that do not stand still."},
  essentials:{name:"ISHTILE Essentials",note:"The everyday, considered.",story:"A considered edit of everyday staples: familiar forms, easy styling and details that make them feel like your own."},
};
const brandOrder = ["onen", "farak", "mocha", "pilgrim", "essentials"];
const collections:Record<string,{name:string;copy:string}> = {
  "summer-essentials-25":{name:"Summer Essentials '25",copy:"Light layers, everyday staples and easy pieces selected for warmer days."},
  "new-arrivals":{name:"New Arrivals",copy:"Fresh perspectives and the latest pieces to enter the ISHTILE universe."},
  "urban-archives":{name:"Urban Archives",copy:"An ongoing study of city dressing, everyday expression and contemporary style."},
  "limited-drops":{name:"Limited Drops",copy:"A changing edit of special pieces and limited selections. Here for a moment."},
};
const stories:Record<string,{title:string;category:string;copy:string}> = {
  "the-new-generation-of-fashion":{title:"The New Generation of Fashion",category:"Perspective",copy:"A new generation is changing the way fashion is found, worn and shared. Independent labels, individual expression and communities are reshaping the landscape."},
  "beyond-the-runway":{title:"Beyond the Runway",category:"Culture",copy:"Fashion does not begin and end on a runway. It lives in the streets, in the details and in the people who make a look their own."},
  "culture-in-contemporary-fashion":{title:"Culture in Contemporary Fashion",category:"Journal",copy:"Clothing carries references, memories and ideas. We look at the cultural details that make contemporary fashion more than a trend."},
};
const money=(n:number)=>"৳"+n.toLocaleString("en-BD");
const image=(id:string)=>"https://images.unsplash.com/"+id+"?auto=format&fit=crop&w=800&q=85";
function DiscoverPage(){
 const {type,slug}=Route.useParams(); const key=decodeURIComponent(slug).toLowerCase();
 const brand=type==="brand"?brands[key]:undefined; const collection=type==="collection"?collections[key]:undefined; const story=type==="story"?stories[key]:undefined;
 const category=type==="category"?key:undefined;
 const title=brand?.name||collection?.name||story?.title||(category?category.charAt(0).toUpperCase()+category.slice(1):key.replace(/-/g," "));
 const copy=brand?.story||collection?.copy||story?.copy||(category?"Explore the "+category+" edit from across the ISHTILE universe.":"Discover more from ISHTILE: independent labels, considered products and contemporary culture.");
 const items=products.filter(p=>brand?p.brand.toLowerCase().includes(key==="essentials"?"essentials":key):category?p.category===category:collection?true:story?false:true);
 return <main className="discover-page"><div className={brand ? "discover-hero discover-brand-hero" : "discover-hero"}><div className="discover-hero-copy"><span className="eyebrow">THE ISHTILE UNIVERSE / {type.toUpperCase()}</span><h1>{title}<i>.</i></h1><p>{brand?.note||story?.category||"DISCOVER BEYOND LABELS"}</p><div className="discover-description">{copy}</div><Link to="/"><ArrowLeft size={15}/> BACK TO THE UNIVERSE</Link></div><div className="discover-hero-image"><img src={image(brand? "photo-1529139574466-a303027c1d8b":collection?"photo-1539109136881-3be0616acf4b":story?"photo-1509631179647-0177331693ae":"photo-1515886657613-9f3515b0c78f")} alt={title}/></div></div>
 {story?<article className="story-content"><span className="eyebrow">{story.category} / ISHTILE JOURNAL</span><h2>{story.title}</h2><p>{story.copy}</p><p>At ISHTILE, we believe style is personal. The most interesting ideas come from the way people interpret, combine and make pieces their own. This is a space for those perspectives.</p><Link to="/">EXPLORE THE STORE <ArrowRight size={15}/></Link></article>:<section className="discover-products"><div className="section-heading"><div><p className="eyebrow">A CURATED SELECTION</p><h2>{brand?"Explore "+brand.name:collection?"Inside the collection": "Explore the edit"}<i>.</i></h2></div><span className="eyebrow">{items.length} PIECES</span></div><div className="discover-product-grid">{items.map(p=><Link key={p.id} to="/products/$slug" params={{slug:p.id}} className="discover-product-card"><div><img src={image(p.image)} alt={p.name}/><span>VIEW PIECE <ArrowUpRight size={14}/></span></div><small>{p.brand}</small><h3>{p.name}</h3><b>{money(p.price)}</b></Link>)}</div>{items.length===0&&<p className="discover-empty">More pieces are being added to this edit. Explore the full store in the meantime.</p>}</section>}
 {brand&&<BrandPager slug={key}/>}
 </main>;
}

function BrandPager({ slug }: { slug: string }) {
 const index = brandOrder.indexOf(slug);
 if (index < 0) return null;
 const previous = brandOrder[(index - 1 + brandOrder.length) % brandOrder.length];
 const next = brandOrder[(index + 1) % brandOrder.length];
 const previousBrand = brands[previous];
 const nextBrand = brands[next];
 return <nav className="brand-pager" aria-label="Browse other brands">
  <Link to="/discover/$type/$slug" params={{type:"brand",slug:previous}} className="brand-pager-link brand-pager-previous"><span>PREVIOUS BRAND</span><strong>← {previousBrand.name}</strong></Link>
  <Link to="/brands" className="brand-pager-all">ALL BRANDS <ArrowUpRight size={15}/></Link>
  <Link to="/discover/$type/$slug" params={{type:"brand",slug:next}} className="brand-pager-link brand-pager-next"><span>NEXT BRAND</span><strong>{nextBrand.name} →</strong></Link>
 </nav>;
}
