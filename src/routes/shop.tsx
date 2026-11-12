import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Search, SlidersHorizontal, X } from "lucide-react";

export const Route = createFileRoute("/shop")({
  head: () => ({ meta: [
    { title: "Shop All — ISHTILE" },
    { name: "description", content: "Explore the ISHTILE collection for men and women. Filter by category and discover independent labels." },
  ]}),
  component: ShopPage,
});

const photo = (id: string) => "https://images.unsplash.com/" + id + "?auto=format&fit=crop&w=900&q=85";
const products = [
  { id:"tee", brand:"ISHTILE Essentials", name:"Oversized Logo Tee", price:2490, gender:"Men", category:"Everyday", image:photo("photo-1521572163474-6864f9cf17ab"), colour:"Black" },
  { id:"shirt", brand:"ONEN", name:"Everyday Essential Shirt", price:3290, gender:"Men", category:"Everyday", image:photo("photo-1598033129183-c4f50c736f10"), colour:"Stone" },
  { id:"trouser", brand:"FARAK", name:"Relaxed Fit Trousers", price:3890, gender:"Men", category:"Trousers", image:photo("photo-1473966968600-fa801b869a1a"), colour:"Charcoal" },
  { id:"bag", brand:"MOCHA", name:"Minimal Crossbody Bag", price:2190, gender:"Accessories", category:"Accessories", image:photo("photo-1548036328-c9fa89d128fa"), colour:"Black" },
  { id:"sneaker", brand:"PILGRIM", name:"Contemporary Sneakers", price:5490, gender:"Accessories", category:"Footwear", image:photo("photo-1542291026-7eec264c27ff"), colour:"Red / White" },
  { id:"cap", brand:"ISHTILE Essentials", name:"Structured Everyday Cap", price:1490, gender:"Accessories", category:"Lifestyle", image:photo("photo-1588850561407-ed78c282e89b"), colour:"Black" },
];
const menCategories = ["Trousers", "Jeans", "Formal Pants", "Panjabee"];
const womenCategories = ["Casual Wear", "Formal Wear", "Upper Wear", "Lower Wear", "Traditional Clothing", "Saree", "Salwaar"];
const money = (n:number) => "৳" + n.toLocaleString("en-BD");

function ShopPage() {
  const [gender,setGender] = useState("All");
  const [category,setCategory] = useState("All");
  const [query,setQuery] = useState("");
  const [sort,setSort] = useState("featured");
  const [filtersOpen,setFiltersOpen] = useState(false);
  const categories = gender === "Men" ? menCategories : gender === "Women" ? womenCategories : [];
  const filtered = useMemo(() => {
    let result = products.filter(p => {
      const genderMatch = gender === "All" || (gender === "Men" ? p.gender === "Men" : p.gender === "Women");
      const categoryMatch = category === "All" || p.category.toLowerCase() === category.toLowerCase();
      const searchMatch = !query.trim() || (p.name + " " + p.brand + " " + p.category).toLowerCase().includes(query.toLowerCase());
      return genderMatch && categoryMatch && searchMatch;
    });
    if(sort === "price-low") result = [...result].sort((a,b)=>a.price-b.price);
    if(sort === "price-high") result = [...result].sort((a,b)=>b.price-a.price);
    if(sort === "name") result = [...result].sort((a,b)=>a.name.localeCompare(b.name));
    return result;
  },[gender,category,query,sort]);
  const setDepartment = (value:string) => { setGender(value); setCategory("All"); };

  return <main className="shop-page">
    <section className="shop-intro">
      <div><p className="eyebrow">THE ISHTILE EDIT / SHOP</p><h1>Find your<br/><i>everyday.</i></h1><p className="shop-intro-copy">A considered collection of independent labels, everyday essentials and pieces that feel like you.</p></div>
      <div className="shop-intro-note"><span>DISCOVER BEYOND LABELS.</span><span>MEN · WOMEN · INDEPENDENT LABELS</span></div>
    </section>
    <section className="shop-catalog" aria-label="Product catalogue">
      <div className="shop-departments" role="tablist" aria-label="Shop department">
        {["All","Men","Women"].map(item=><button key={item} role="tab" aria-selected={gender===item} className={gender===item?"active":""} onClick={()=>setDepartment(item)}>{item}</button>)}
      </div>
      <div className="shop-toolbar">
        <div className="shop-category-filters">
          {gender !== "All" && <button className={category==="All"?"active":""} onClick={()=>setCategory("All")}>All {gender}</button>}
          {categories.map(item=><button key={item} className={category===item?"active":""} onClick={()=>setCategory(item)}>{item}</button>)}
        </div>
        <div className="shop-tools">
          <label className="shop-search"><Search size={15}/><input aria-label="Search products" placeholder="Search pieces" value={query} onChange={e=>setQuery(e.target.value)}/>{query&&<button aria-label="Clear search" onClick={()=>setQuery("")}><X size={13}/></button>}</label>
          <label className="shop-sort"><span>Sort</span><select value={sort} onChange={e=>setSort(e.target.value)} aria-label="Sort products"><option value="featured">Featured</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option><option value="name">Name</option></select></label>
          <button className="shop-filter-toggle" onClick={()=>setFiltersOpen(!filtersOpen)}><SlidersHorizontal size={15}/> Filters</button>
        </div>
      </div>
      {filtersOpen&&<div className="shop-filter-panel"><span>DEPARTMENT</span>{["All","Men","Women"].map(item=><button key={item} onClick={()=>{setDepartment(item);setFiltersOpen(false)}}>{item}</button>)}</div>}
      <div className="shop-results-line"><span>{gender==="All"?"ALL PIECES":gender.toUpperCase()+" / "+(category==="All"?"ALL CATEGORIES":category.toUpperCase())}</span><span>{filtered.length} {filtered.length===1?"PIECE":"PIECES"}</span></div>
      {filtered.length ? <div className="shop-product-grid">{filtered.map(p=><Link key={p.id} to="/products/$slug" params={{slug:p.id}} className="shop-product-card"><div className="shop-product-image"><img src={p.image} alt={p.name}/><span>VIEW PIECE <ArrowUpRight size={14}/></span></div><div className="shop-product-meta"><small>{p.brand}</small><small>{p.colour}</small></div><h2>{p.name}</h2><strong>{money(p.price)}</strong></Link>)}</div> : <div className="shop-empty"><span className="eyebrow">A NEW EDIT IS ON ITS WAY</span><h2>{gender==="Women"?"The women’s collection is coming soon.":"No pieces in this category just yet."}</h2><p>{gender==="Women"?"We’re preparing the women’s edit. Check back soon for casual, formal, traditional and everyday pieces.":"Try another category or browse all available pieces from the ISHTILE universe."}</p><button onClick={()=>{setGender("All");setCategory("All");setQuery("");}}>VIEW ALL PRODUCTS <ArrowRight size={14}/></button></div>}
    </section>
    <footer className="shop-page-footer"><span>ISHTILE — DISCOVER BEYOND LABELS.</span><Link to="/">BACK TO HOME <ArrowRight size={14}/></Link></footer>
  </main>;
}
