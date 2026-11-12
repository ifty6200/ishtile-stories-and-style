import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight, Check, ChevronDown, Heart, Minus, Plus, Search, ShoppingBag, Sparkle, Star, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ISHTILE — Discover Beyond Labels" },
      { name: "description", content: "Different brands. One universe. Discover independent fashion, emerging labels and contemporary culture." },
    ],
  }),
  component: HomePage,
});

const photo = (id: string, width = 1000) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;
const products = [
  { id: "tee", brand: "ISHTILE Essentials", name: "Oversized Logo Tee", price: 2490, category: "Men", image: photo("photo-1521572163474-6864f9cf17ab"), colour: "Black" },
  { id: "shirt", brand: "ONEN", name: "Everyday Essential Shirt", price: 3290, category: "Men", image: photo("photo-1598033129183-c4f50c736f10"), colour: "Stone" },
  { id: "trouser", brand: "FARAK", name: "Relaxed Fit Trousers", price: 3890, category: "Men", image: photo("photo-1473966968600-fa801b869a1a"), colour: "Charcoal" },
  { id: "bag", brand: "MOCHA", name: "Minimal Crossbody Bag", price: 2190, category: "Accessories", image: photo("photo-1548036328-c9fa89d128fa"), colour: "Black" },
  { id: "sneaker", brand: "PILGRIM", name: "Contemporary Sneakers", price: 5490, category: "Footwear", image: photo("photo-1542291026-7eec264c27ff"), colour: "Red / White" },
  { id: "cap", brand: "ISHTILE Essentials", name: "Structured Everyday Cap", price: 1490, category: "Lifestyle", image: photo("photo-1588850561407-ed78c282e89b"), colour: "Black" },
];
const brands = [
  { name: "ONEN", note: "Quiet forms. Clear identity.", image: photo("photo-1529139574466-a303027c1d8b") },
  { name: "FARAK", note: "A different point of view.", image: photo("photo-1515886657613-9f3515b0c78f") },
  { name: "MOCHA", note: "Objects for everyday life.", image: photo("photo-1539109136881-3be0616acf4b") },
  { name: "PILGRIM", note: "Made to move forward.", image: photo("photo-1503342217505-b0a15ec3261c") },
];
const collections = [
  { name: "Summer Essentials '25", sub: "The pieces you'll keep reaching for.", tone: "lime", image: photo("photo-1523398002811-999ca8dec234") },
  { name: "New Arrivals", sub: "Fresh perspectives, just landed.", tone: "blue", image: photo("photo-1539570515001-5f6c3c3f7b4d") },
  { name: "Urban Archives", sub: "A study in everyday expression.", tone: "violet", image: photo("photo-1529139574466-a303027c1d8b") },
  { name: "Limited Drops", sub: "Here for a moment. Yours to own.", tone: "dark", image: photo("photo-1506794778202-cad84cf45f1d") },
];
const articles = [
  { title: "The New Generation of Fashion", date: "Nov 12, 2024", category: "Perspective", image: photo("photo-1529139574466-a303027c1d8b") },
  { title: "Beyond the Runway", date: "Nov 08, 2024", category: "Culture", image: photo("photo-1509631179647-0177331693ae") },
  { title: "Culture in Contemporary Fashion", date: "Nov 01, 2024", category: "Journal", image: photo("photo-1515886657613-9f3515b0c78f") },
];
type CartItem = { id: string; qty: number; size: string };

function StarMark({ className = "" }: { className?: string }) {
  return <span aria-hidden="true" className={`star-mark ${className}`}>✦</span>;
}
function HomePage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeProduct, setActiveProduct] = useState<(typeof products)[number] | null>(null);
  const [selectedSize, setSelectedSize] = useState("M");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [category, setCategory] = useState("All");
  useEffect(() => {
    try {
      const c = localStorage.getItem("ishtile-cart-v2");
      const w = localStorage.getItem("ishtile-wishlist-v2");
      if (c) setCart(JSON.parse(c));
      if (w) setWishlist(JSON.parse(w));
    } catch { localStorage.removeItem("ishtile-cart-v2"); localStorage.removeItem("ishtile-wishlist-v2"); }
  }, []);
  useEffect(() => { localStorage.setItem("ishtile-cart-v2", JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem("ishtile-wishlist-v2", JSON.stringify(wishlist)); }, [wishlist]);
  const count = cart.reduce((n, item) => n + item.qty, 0);
  const total = cart.reduce((n, item) => n + (products.find(p => p.id === item.id)?.price ?? 0) * item.qty, 0);
  const filteredProducts = useMemo(() => products.filter(p => (category === "All" || p.category === category) && (query.trim() === "" || `${p.name} ${p.brand} ${p.category}`.toLowerCase().includes(query.toLowerCase()))), [category, query]);
  const add = (id: string, size = "M") => {
    setCart(old => {
      const found = old.find(x => x.id === id && x.size === size);
      return found ? old.map(x => x.id === id && x.size === size ? { ...x, qty: Math.min(99, x.qty + 1) } : x) : [...old, { id, qty: 1, size }];
    });
    toast.success("Added to your bag");
    setActiveProduct(null);
    setCartOpen(true);
  };
  const toggleWish = (id: string) => setWishlist(old => old.includes(id) ? old.filter(x => x !== id) : [...old, id]);
  const submitNewsletter = async (e: FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { toast.error("Enter a valid email address."); return; }
    const { error } = await supabase.from("newsletter_subscribers").insert({ email: email.trim().toLowerCase() });
    if (error && error.code !== "23505") { toast.error("We could not save your subscription. Please try again."); return; }
    setSubscribed(true);
    toast.success("You're on the list. Welcome to ISHTILE.");
  };
  const money = (n: number) => `৳${n.toLocaleString("en-BD")}`;
  return <main className="ishtile">
    {searchOpen && <div className="overlay" onMouseDown={e=>{if(e.target===e.currentTarget)setSearchOpen(false)}}><section className="search-panel"><div className="panel-top"><span>SEARCH ISHTILE</span><button aria-label="Close search" onClick={()=>setSearchOpen(false)}><X/></button></div><div className="search-input"><Search/><input autoFocus placeholder="What are you looking for?" value={query} onChange={e=>setQuery(e.target.value)}/></div><p className="eyebrow">POPULAR RIGHT NOW</p><div className="search-suggestions">{["Oversized tee","New arrivals","Accessories","PILGRIM"].map(x=><button key={x} onClick={()=>setQuery(x)}>{x}<ArrowUpRight size={14}/></button>)}</div><a className="text-link" href="#shop" onClick={()=>setSearchOpen(false)}>VIEW MATCHING PRODUCTS <ArrowRight size={14}/></a></section></div>}
    <section className="hero film-grain" id="top">
      <div className="hero-photo" />
      <div className="hero-copy"><p className="eyebrow light">A NEW KIND OF FASHION UNIVERSE <StarMark/></p><h1>MORE<br/>FASHION.<br/><em>MORE YOU.</em></h1><p className="hero-tagline">Discover Beyond Labels<span className="lime-scribble">〰〰</span></p><a className="hero-circle" href="#brands"><span>EXPLORE<br/>BRANDS</span><ArrowDown size={18}/></a></div>
      <div className="hero-side-note">INDEPENDENT LABELS · ONE DESTINATION</div><span className="hero-crown">♕</span><StarMark className="hero-star"/>
      <div className="hero-index"><span>01</span><span className="index-line"/><span>04</span></div>
    </section>
    <section className="ecosystem section-pad" id="about">
      <div className="ecosystem-copy"><p className="eyebrow">THE ISHTILE UNIVERSE</p><h2>Different Brands.<br/>One <i>Universe.</i></h2><p>A curated fashion ecosystem bringing together independent brands, emerging designers and contemporary culture. One place to find the labels you'll make your own.</p><a className="text-link" href="/discover/brand/onen">EXPLORE ALL BRANDS <ArrowRight size={15}/></a></div>
      <div className="brand-collage">{brands.slice(0,3).map((b,i)=><a key={b.name} href={"/discover/brand/"+b.name.toLowerCase().replaceAll(" ","-")} className={`collage-tile tile-${i+1}`}><img src={b.image} alt={`${b.name} campaign`}/><span>{b.name}</span></a>)}<div className="collage-label">INDEPENDENT<br/>BY NATURE.</div><StarMark className="collage-star"/></div>
    </section>
    <section className="featured-products section-pad" id="featured"><div className="section-heading"><div><p className="eyebrow">THE PIECES TO KNOW</p><h2>Featured <i>products.</i></h2><p className="section-intro">A closer look at a few favourites from across our labels.</p></div><a className="text-link" href="/shop">VIEW ALL PIECES <ArrowRight size={14}/></a></div><div className="featured-product-grid">{products.slice(0,4).map((p,i)=><a href={"/products/"+p.id} className="featured-product-card" key={p.id}><div><img src={p.image} alt={p.name}/><span>0{i+1} / FEATURED</span><b><ArrowUpRight size={17}/></b></div><small>{p.brand}</small><h3>{p.name}</h3><strong>{money(p.price)}</strong></a>)}</div></section>
    <section className="category-section section-pad"><div className="section-heading"><div><p className="eyebrow">FIND YOUR FORM</p><h2>Shop by category<span>.</span></h2></div><a className="text-link" href="/shop">VIEW ALL <ArrowRight size={14}/></a></div><div className="category-grid">{[{n:"Men",im:"photo-1516257984-b1b4d707412e"},{n:"Women",im:"photo-1539109136881-3be0616acf4b"},{n:"Accessories",im:"photo-1548036328-c9fa89d128fa"},{n:"Footwear",im:"photo-1542291026-7eec264c27ff"},{n:"Lifestyle",im:"photo-1588850561407-ed78c282e89b"},{n:"More",im:"photo-1529139574466-a303027c1d8b"}].map((c,i)=><button key={c.n} className="category-card" onClick={()=>{window.location.href="/shop"}}><img src={photo(c.im,500)} alt={c.n}/><span>{c.n}</span><ArrowUpRight size={17}/></button>)}</div></section>
    <section className="collections-section section-pad film-grain" id="collections"><div className="section-heading"><div><p className="eyebrow">CURATED FOR YOU</p><h2>Find your next <i>chapter.</i></h2></div><a className="text-link" href="/collection">VIEW COLLECTION <ArrowRight size={14}/></a></div><div className="collection-grid">{collections.map((c,i)=><a href={"/discover/collection/"+c.name.toLowerCase().replaceAll(" ","-").replaceAll("'","")} className={`collection-card ${c.tone}`} key={c.name}><img src={c.image} alt=""/><div className="collection-shade"/><div className="collection-copy"><span>0{i+1} / COLLECTION</span><h3>{c.name}</h3><p>{c.sub}</p><b>DISCOVER <ArrowUpRight size={15}/></b></div><StarMark/></a>)}</div></section>
    <section className="newsletter"><div className="newsletter-star"><StarMark/></div><div><p className="eyebrow">A GOOD THING, OCCASIONALLY.</p><h2>Stay in the loop<span>.</span></h2><p>Get the latest drops, stories and things worth knowing.</p></div><form onSubmit={submitNewsletter}><label className="sr-only" htmlFor="newsletter-email">Your email address</label><input id="newsletter-email" type="email" required placeholder="Your email address" value={email} onChange={e=>setEmail(e.target.value)}/><button type="submit" disabled={subscribed}>{subscribed?<><Check size={15}/> SUBSCRIBED</>:"SUBSCRIBE"} <ArrowRight size={15}/></button><small>By subscribing, you agree to receive ISHTILE updates. Unsubscribe anytime.</small></form></section>
    <section className="brands-section section-pad" id="brands"><div className="brands-intro"><p className="eyebrow">THE EDIT / 001</p><h2>Considered<br/><i>Essentials.</i></h2><p>A considered selection of pieces and labels with a point of view. Different perspectives, brought together in one edit.</p><a className="text-link" href="#brands-grid">EXPLORE THE EDIT <ArrowRight size={14}/></a></div><div className="brands-showcase" id="brands-grid">{brands.map((b,i)=><a href={"/discover/brand/"+b.name.toLowerCase().replaceAll(" ","-")} key={b.name} className={`brand-card brand-card-${i}`}><img src={b.image} alt={b.name}/><div><span>INDEPENDENT LABEL</span><h3>{b.name}</h3><p>{b.note}</p><ArrowUpRight size={18}/></div></a>)}</div></section>
    <footer className="site-footer"><div className="footer-top"><div className="footer-brand"><a className="wordmark" href="#top">ISHTILE<span>✦</span></a><p>Different brands.<br/>One universe.</p><span className="footer-tag">DISCOVER BEYOND LABELS.</span></div><div className="footer-col"><h4>EXPLORE</h4><a href="/shop">Shop all</a><a href="#brands">Our brands</a><a href="#collections">Collections</a><a href="/editorial">Editorial</a></div><div className="footer-col"><h4>INFORMATION</h4><a href="/discover/page/about">About ISHTILE</a><a href="/discover/page/contact">Contact</a><a href="/discover/page/shipping-returns">Shipping & returns</a><a href="/discover/page/faq">FAQ</a></div><div className="footer-col"><h4>FOLLOW ALONG</h4><a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram <ArrowUpRight size={13}/></a><a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook <ArrowUpRight size={13}/></a><a href="https://pinterest.com" target="_blank" rel="noreferrer">Pinterest <ArrowUpRight size={13}/></a><a href="https://tiktok.com" target="_blank" rel="noreferrer">TikTok <ArrowUpRight size={13}/></a></div></div><div className="footer-bottom"><span>© 2026 ISHTILE. ALL RIGHTS RESERVED.</span><span>MADE FOR THE CURIOUS <StarMark/></span><a href="#top">BACK TO TOP ↑</a></div></footer>
    {cartOpen && <div className="drawer-backdrop" onMouseDown={e=>e.target===e.currentTarget&&setCartOpen(false)}><aside className="cart-drawer"><div className="drawer-head"><div><span className="eyebrow">YOUR SELECTION</span><h2>Your Bag <i>({count})</i></h2></div><button aria-label="Close bag" onClick={()=>setCartOpen(false)}><X/></button></div>{cart.length===0?<div className="empty-cart"><ShoppingBag size={34}/><h3>Your bag is taking a breather.</h3><p>Find something that feels like you.</p><button onClick={()=>setCartOpen(false)}>CONTINUE EXPLORING <ArrowRight size={14}/></button></div>:<><div className="cart-lines">{cart.map(item=>{const p=products.find(x=>x.id===item.id)!;return <div className="cart-line" key={item.id+item.size}><img src={p.image} alt=""/><div className="cart-line-info"><span>{p.brand}</span><h3>{p.name}</h3><small>Size: {item.size} · {p.colour}</small><b>{money(p.price)}</b><div className="quantity-control"><button aria-label="Decrease quantity" onClick={()=>setCart(old=>old.map(x=>x.id===item.id&&x.size===item.size?{...x,qty:Math.max(1,x.qty-1)}:x))}><Minus size={12}/></button><span>{item.qty}</span><button aria-label="Increase quantity" onClick={()=>setCart(old=>old.map(x=>x.id===item.id&&x.size===item.size?{...x,qty:Math.min(99,x.qty+1)}:x))}><Plus size={12}/></button></div></div><button className="remove-line" aria-label="Remove item" onClick={()=>setCart(old=>old.filter(x=>!(x.id===item.id&&x.size===item.size)))}><Trash2 size={15}/></button></div>})}</div><div className="cart-summary"><div><span>Subtotal</span><b>{money(total)}</b></div><p>Shipping and taxes calculated at checkout.</p><button onClick={()=>toast.info("Checkout will be enabled when payment and delivery integrations are configured.")}>CONTINUE TO CHECKOUT <ArrowRight size={15}/></button><button className="continue-shopping" onClick={()=>setCartOpen(false)}>CONTINUE SHOPPING</button></div></>}</aside></div>}

  </main>;
}
