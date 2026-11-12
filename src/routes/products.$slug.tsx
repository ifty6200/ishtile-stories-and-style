import { useMemo, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, Heart, Minus, Plus, ShoppingBag } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/products/$slug")({
  head: ({ params }) => ({ meta: [{ title: (catalog.find(p => p.id === params.slug)?.name ?? "Product") + " — ISHTILE" }] }),
  component: ProductPage,
});
const photo = (id: string, width = 1200) => "https://images.unsplash.com/" + id + "?auto=format&fit=crop&w=" + width + "&q=90";
const catalog = [
  { id:"tee",brand:"ISHTILE Essentials",name:"Oversized Logo Tee",price:2490,category:"Men",colour:"Black",material:"100% Cotton",fit:"Relaxed / oversized",description:"A considered everyday essential. Cut with a relaxed silhouette, a clean neckline and a minimal signature mark. Designed to become the piece you reach for without thinking.",images:[photo("photo-1521572163474-6864f9cf17ab"),photo("photo-1527719327859-c6ce80353573"),photo("photo-1503342217505-b0a15ec3261c")],lineup:"Essentials" },
  { id:"shirt",brand:"ONEN",name:"Everyday Essential Shirt",price:3290,category:"Men",colour:"Stone",material:"Cotton blend",fit:"Regular fit",description:"An easy, versatile shirt with a considered cut and understated detailing. Made for everyday rotation and effortless layering.",images:[photo("photo-1598033129183-c4f50c736f10"),photo("photo-1596755094514-f87e34085b2c"),photo("photo-1603252109303-2751441dd157")],lineup:"ONEN essentials" },
  { id:"trouser",brand:"FARAK",name:"Relaxed Fit Trousers",price:3890,category:"Men",colour:"Charcoal",material:"Cotton twill",fit:"Relaxed straight leg",description:"A relaxed profile with a clean fall and room to move. An everyday foundation that works across seasons.",images:[photo("photo-1473966968600-fa801b869a1a"),photo("photo-1515886657613-9f3515b0c78f"),photo("photo-1506629905607-d9c297d7d1e8")],lineup:"FARAK essentials" },
  { id:"bag",brand:"MOCHA",name:"Minimal Crossbody Bag",price:2190,category:"Accessories",colour:"Black",material:"Textured vegan leather",fit:"Adjustable strap",description:"A compact carry-all for the everyday. Clean lines, practical storage and a minimal profile that goes everywhere.",images:[photo("photo-1548036328-c9fa89d128fa"),photo("photo-1584917865442-de89df76afd3"),photo("photo-1553062407-98eeb64c6a62")],lineup:"MOCHA everyday" },
  { id:"sneaker",brand:"PILGRIM",name:"Contemporary Sneakers",price:5490,category:"Footwear",colour:"Red / White",material:"Textile and synthetic upper",fit:"True to size",description:"A contemporary everyday sneaker with a confident silhouette, comfortable feel and versatile styling.",images:[photo("photo-1542291026-7eec264c27ff"),photo("photo-1495555961986-6d4c1ecb7be3"),photo("photo-1542291026-7eec264c27ff")],lineup:"PILGRIM footwear" },
  { id:"cap",brand:"ISHTILE Essentials",name:"Structured Everyday Cap",price:1490,category:"Lifestyle",colour:"Black",material:"Cotton twill",fit:"Adjustable",description:"A clean, structured cap with a subtle signature. An easy finishing touch for everyday looks.",images:[photo("photo-1588850561407-ed78c282e89b"),photo("photo-1521369909029-2afed882baee"),photo("photo-1588850561407-ed78c282e89b")],lineup:"Essentials" },
];
const money = (n:number) => "৳" + n.toLocaleString("en-BD");
const swatches = [{name:"Black",hex:"#171717"},{name:"Off white",hex:"#eeeae2"},{name:"Blue",hex:"#6488ad"},{name:"Stone",hex:"#b9b8b3"}];

function ProductPage() {
  const {slug}=Route.useParams();
  const navigate=useNavigate();
  const product=catalog.find(p=>p.id===slug);
  const [imageIndex,setImageIndex]=useState(0);
  const [size,setSize]=useState("M");
  const [colour,setColour]=useState(product?.colour ?? "Black");
  const [quantity,setQuantity]=useState(1);
  const [wish,setWish]=useState(false);
  const [activeTab,setActiveTab]=useState("Details");
  const similar=useMemo(()=>product?catalog.filter(p=>p.id!==product.id&&(p.brand===product.brand||p.lineup===product.lineup||p.category===product.category)).slice(0,4):[],[product]);
  const addToBag=()=>{if(!product)return;try{const stored=JSON.parse(localStorage.getItem("ishtile-cart-v2")||"[]") as {id:string;qty:number;size:string;colour?:string}[];const exists=stored.find(x=>x.id===product.id&&x.size===size&&x.colour===colour);const next=exists?stored.map(x=>x.id===product.id&&x.size===size&&x.colour===colour?{...x,qty:Math.min(99,x.qty+quantity)}:x):[...stored,{id:product.id,qty:quantity,size,colour}];localStorage.setItem("ishtile-cart-v2",JSON.stringify(next));toast.success("Added to your bag");navigate({to:"/"});}catch{toast.error("Your bag could not be updated. Please try again.");}};
  if(!product)return <main className="product-not-found"><span className="eyebrow">THE ISHTILE EDIT</span><h1>This piece has moved on.</h1><p>We couldn't find that product. Explore the latest edit instead.</p><Link to="/">BACK TO THE STORE <ArrowRight size={15}/></Link></main>;

  const tabContent = activeTab==="Details"
    ? <><p>{product.description}</p><ul><li>{product.material}</li><li>{product.fit}</li><li>Machine wash cold</li></ul></>
    : activeTab==="Size Guide"
      ? <p>Choose your usual size for the intended fit. S · M · L · XL. For a more relaxed fit, consider sizing up.</p>
      : <p>Delivery is available across Bangladesh. Eligible items can be returned in accordance with the ISHTILE returns policy. Orders are carefully packed before dispatch.</p>;

  return <main className="product-page product-view">
    <div className="product-breadcrumb"><Link to="/">SHOP</Link><span>/</span><Link to="/">{product.category}</Link><span>/</span><span>{product.name.toUpperCase()}</span></div>
    <div className="product-detail-layout">
      <div className="product-gallery">
        <div className="product-thumbnails">{product.images.map((src,i)=><button key={src+i} className={imageIndex===i?"selected":""} onClick={()=>setImageIndex(i)} aria-label={"View image "+(i+1)}><img src={src.replace("w=1200","w=180")} alt=""/></button>)}</div>
        <div className="product-main-image"><img src={product.images[imageIndex]} alt={product.name}/><span className="product-image-count">{String(imageIndex+1).padStart(2,"0")} / {String(product.images.length).padStart(2,"0")}</span></div>
      </div>
      <section className="product-information">
        <div className="product-heading-line"><span className="eyebrow">{product.brand}</span><span className="product-category">{product.category} / {product.lineup}</span></div>
        <h1>{product.name}</h1>
        <strong className="product-detail-price">{money(product.price)}</strong>
        <div className="product-description-scroll" tabIndex={0}><p>{product.description}</p></div>
        <div className="product-choice-block">
          <div className="product-choice-heading"><span>Colour</span><b>{colour}</b></div>
          <div className="product-colour-options">{swatches.map(s=><button key={s.name} className={colour===s.name?"selected":""} style={{"--swatch":s.hex} as React.CSSProperties} onClick={()=>setColour(s.name)} aria-label={"Select "+s.name} title={s.name}/>)}</div>
        </div>
        <div className="product-choice-block product-size-block">
          <div className="product-choice-heading"><span>Size</span><button className="size-guide" onClick={()=>setActiveTab("Size Guide")}>Size guide</button></div>
          <div className="size-options">{["S","M","L","XL"].map(s=><button key={s} className={size===s?"selected":""} onClick={()=>setSize(s)}>{s}</button>)}</div>
        </div>
        <div className="product-action-row"><button className="product-add-button" onClick={addToBag}>ADD TO CART <span>{money(product.price*quantity)}</span></button><button className={wish?"product-wish-button saved":"product-wish-button"} aria-label="Save to wishlist" onClick={()=>setWish(!wish)}><Heart size={18} fill={wish?"currentColor":"none"}/></button></div>
        <div className="product-quantity-row"><span>Quantity</span><div className="quantity-control"><button aria-label="Decrease quantity" onClick={()=>setQuantity(q=>Math.max(1,q-1))}><Minus size={12}/></button><span>{quantity}</span><button aria-label="Increase quantity" onClick={()=>setQuantity(q=>Math.min(10,q+1))}><Plus size={12}/></button></div></div>
      </section>
    </div>
    <div className="product-service-strip"><div><span className="service-symbol">◉</span><span>Premium Fabric</span></div><div><span className="service-symbol">↻</span><span>Easy Returns</span></div><div><span className="service-symbol">⌂</span><span>Fast Delivery</span></div></div>
    <section className="product-tabs-panel">
      <div className="product-tabs" role="tablist" aria-label="Product information">{["Details","Size Guide","Shipping & Returns"].map(tab=><button key={tab} role="tab" aria-selected={activeTab===tab} className={activeTab===tab?"active":""} onClick={()=>setActiveTab(tab)}>{tab}</button>)}</div>
      <div className="product-tab-content" role="tabpanel" key={activeTab}>{tabContent}</div>
      <span className="product-tab-star" aria-hidden="true">✦</span>
    </section>
    <section className="similar-products"><div className="section-heading"><div><p className="eyebrow">MORE TO DISCOVER</p><h2>More from <i>{product.lineup}.</i></h2><p className="section-intro">A few more pieces from this corner of the ISHTILE universe.</p></div><Link className="text-link" to="/">EXPLORE THE STORE <ArrowRight size={14}/></Link></div><div className="similar-grid">{(similar.length?similar:catalog.filter(p=>p.id!==product.id).slice(0,4)).map(p=><Link key={p.id} to="/products/$slug" params={{slug:p.id}} className="similar-card"><div><img src={p.images[0]} alt={p.name}/><span>DISCOVER PIECE <ArrowRight size={14}/></span></div><small>{p.brand}</small><h3>{p.name}</h3><b>{money(p.price)}</b></Link>)}</div></section>
    <div className="product-back-link"><Link to="/"><ArrowLeft size={15}/> BACK TO THE ISHTILE UNIVERSE</Link></div>
  </main>;
}
