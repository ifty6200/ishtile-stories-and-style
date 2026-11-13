import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

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
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const submitNewsletter = async (e: FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { toast.error("Enter a valid email address."); return; }
    const { error } = await supabase.from("newsletter_subscribers").insert({ email: email.trim().toLowerCase() });
    if (error && error.code !== "23505") { toast.error("We could not save your subscription. Please try again."); return; }
    setSubscribed(true);
    toast.success("You are on the list. Welcome to ISHTILE.");
  };
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
      {tiles.map((tile,i)=><Link key={tile.kind} to="/shop" className={`collection-tile collection-${tile.kind}`} aria-label={tile.aria}>
        {(tile.kind==="women"||tile.kind==="men")&&<span className="collection-image" aria-hidden="true"/>}
        {tile.title&&<span className="collection-tile-title">{tile.title}</span>}
        <span className="collection-tile-star" aria-hidden="true">✦</span>
        <span className="collection-tile-index">0{i+1}</span>
        <ArrowUpRight className="collection-tile-arrow" size={17}/>
      </Link>)}
    </section>
    <section className="newsletter collection-newsletter">
      <div className="newsletter-star"><span className="star-mark">✦</span></div>
      <div><p className="eyebrow">A GOOD THING, OCCASIONALLY.</p><h2>Stay in the loop<span>.</span></h2><p>Get the latest drops, stories and things worth knowing.</p></div>
      <form onSubmit={submitNewsletter}>
        <label className="sr-only" htmlFor="collection-newsletter-email">Your email address</label>
        <input id="collection-newsletter-email" type="email" required placeholder="Your email address" value={email} onChange={e=>setEmail(e.target.value)}/>
        <button type="submit" disabled={subscribed}>{subscribed?<><Check size={15}/> SUBSCRIBED</>:"SUBSCRIBE"} <ArrowRight size={15}/></button>
        <small>By subscribing, you agree to receive ISHTILE updates. Unsubscribe anytime.</small>
      </form>
    </section>
    <footer className="site-footer"><div className="footer-top"><div className="footer-brand"><Link className="wordmark" to="/"><span>ISHTILE</span><span>✦</span></Link><p>Different brands.<br/>One universe.</p><span className="footer-tag">DISCOVER BEYOND LABELS.</span></div><div className="footer-col"><h4>EXPLORE</h4><Link to="/shop">Shop all</Link><Link to="/#brands">Our brands</Link><Link to="/collection">Collections</Link><Link to="/editorial">Editorial</Link></div><div className="footer-col"><h4>INFORMATION</h4><Link to="/discover/page/about">About ISHTILE</Link><Link to="/discover/page/contact">Contact</Link><Link to="/discover/page/shipping-returns">Shipping &amp; returns</Link><Link to="/discover/page/faq">FAQ</Link></div><div className="footer-col"><h4>FOLLOW ALONG</h4><a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram <ArrowUpRight size={13}/></a><a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook <ArrowUpRight size={13}/></a><a href="https://pinterest.com" target="_blank" rel="noreferrer">Pinterest <ArrowUpRight size={13}/></a><a href="https://tiktok.com" target="_blank" rel="noreferrer">TikTok <ArrowUpRight size={13}/></a></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} ISHTILE. ALL RIGHTS RESERVED.</span><span>MADE FOR THE CURIOUS <span className="star-mark">✦</span></span><a href="#top">BACK TO TOP ↑</a></div></footer>  </main>;
}
