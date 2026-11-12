import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Your Cart — ISHTILE" }] }),
  component: CartPage,
});

type CartItem = { id: string; qty: number; size?: string; colour?: string };
const CART_KEY = "ishtile-cart-v2";
const catalogue = [
  { id:"tee", brand:"ISHTILE Essentials", name:"Logo Tee", price:2490, image:"photo-1521572163474-6864f9cf17ab" },
  { id:"shirt", brand:"ONEN", name:"Everyday Essential Shirt", price:3290, image:"photo-1598033129183-c4f50c736f10" },
  { id:"trouser", brand:"FARAK", name:"Relaxed Fit Trousers", price:3890, image:"photo-1473966968600-fa801b869a1a" },
  { id:"bag", brand:"MOCHA", name:"Minimal Crossbody Bag", price:2190, image:"photo-1548036328-c9fa89d128fa" },
  { id:"sneaker", brand:"PILGRIM", name:"Contemporary Sneakers", price:5490, image:"photo-1542291026-7eec264c27ff" },
  { id:"cap", brand:"ISHTILE Essentials", name:"Logo Cap", price:1990, image:"photo-1588850561407-ed78c282e89b" },
];
const money = (n:number) => "৳ " + n.toLocaleString("en-BD");
const image = (id:string) => "https://images.unsplash.com/" + id + "?auto=format&fit=crop&w=360&q=85";

function CartPage() {
  const [items,setItems] = useState<CartItem[]>([]);
  const [ready,setReady] = useState(false);
  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(CART_KEY) || "[]") as CartItem[];
      setItems(Array.isArray(stored) ? stored.filter(item => catalogue.some(p => p.id === item.id) && Number.isFinite(item.qty) && item.qty > 0) : []);
    } catch {
      setItems([]);
    }
    setReady(true);
  },[]);
  useEffect(() => {
    if (ready) localStorage.setItem(CART_KEY,JSON.stringify(items));
  },[items,ready]);
  const lines = useMemo(() => items.map(item => ({...item,product:catalogue.find(p=>p.id===item.id)!})),[items]);
  const subtotal = lines.reduce((sum,line)=>sum+line.product.price*line.qty,0);
  const count = items.reduce((sum,item)=>sum+item.qty,0);
  const changeQuantity = (id:string,size:string|undefined,colour:string|undefined,delta:number) => {
    setItems(current=>current.map(item=>item.id===id&&item.size===size&&item.colour===colour?{...item,qty:Math.max(1,Math.min(99,item.qty+delta))}:item));
  };
  const remove = (id:string,size:string|undefined,colour:string|undefined) => {
    setItems(current=>current.filter(item=>!(item.id===id&&item.size===size&&item.colour===colour)));
    toast.success("Item removed from your cart");
  };

  return <main className="cart-page">
    <div className="cart-page-heading">
      <div><p className="eyebrow">THE ISHTILE EDIT / YOUR SELECTION</p><h1>Your Cart <span>({count})</span></h1></div>
      <span className="cart-heading-note">A FEW GOOD THINGS, ALMOST YOURS.</span>
    </div>
    {lines.length ? <>
      <section className="cart-page-lines" aria-label="Cart items">
        {lines.map(line=><article className="cart-page-line" key={line.id+"-"+line.size+"-"+line.colour}>
          <Link to="/products/$slug" params={{slug:line.id}} className="cart-page-image"><img src={image(line.product.image)} alt={line.product.name}/></Link>
          <div className="cart-page-item-info">
            <span>{line.product.brand}</span>
            <Link to="/products/$slug" params={{slug:line.id}}><h2>{line.product.name}</h2></Link>
            {(line.size||line.colour)&&<small>{[line.colour,line.size&&"Size "+line.size].filter(Boolean).join(" · ")}</small>}
            <strong>{money(line.product.price)}</strong>
            <div className="cart-page-quantity">
              <button aria-label="Decrease quantity" onClick={()=>changeQuantity(line.id,line.size,line.colour,-1)}><Minus size={12}/></button>
              <span>{line.qty}</span>
              <button aria-label="Increase quantity" onClick={()=>changeQuantity(line.id,line.size,line.colour,1)}><Plus size={12}/></button>
            </div>
          </div>
          <button className="cart-page-remove" aria-label={"Remove "+line.product.name} onClick={()=>remove(line.id,line.size,line.colour)}><Trash2 size={16}/></button>
        </article>)}
      </section>
      <aside className="cart-page-summary">
        <div className="cart-page-subtotal"><span>Subtotal</span><strong>{money(subtotal)}</strong></div>
        <p>Shipping and any applicable charges are calculated at checkout.</p>
        <button className="cart-page-checkout" onClick={()=>toast.info("Checkout will be available soon.")}>Checkout <ArrowRight size={16}/></button>
        <Link className="cart-page-continue" to="/shop">Continue Shopping</Link>
      </aside>
    </> : <section className="cart-page-empty">
      <ShoppingBag size={30} strokeWidth={1.3}/>
      <h2>Your cart is waiting.</h2>
      <p>Good things are worth finding. Explore the ISHTILE edit and add a piece you love.</p>
      <Link to="/shop">DISCOVER THE COLLECTION <ArrowRight size={15}/></Link>
    </section>}
  </main>;
}
