import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { toast } from "sonner";

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

export function CartDrawer({ open, onClose }: { open:boolean; onClose:()=>void }) {
  const [items,setItems] = useState<CartItem[]>([]);
  const [ready,setReady] = useState(false);
  const readCart = () => {
    try {
      const stored = JSON.parse(localStorage.getItem(CART_KEY) || "[]") as CartItem[];
      setItems(Array.isArray(stored) ? stored.filter(item => catalogue.some(p => p.id === item.id) && Number.isFinite(item.qty) && item.qty > 0) : []);
    } catch { setItems([]); }
    setReady(true);
  };
  useEffect(() => { if (open) readCart(); },[open]);
  useEffect(() => {
    if (!open) return;
    const onKey = (event:KeyboardEvent) => { if (event.key === "Escape") onClose(); };
    const onStorage = () => readCart();
    document.addEventListener("keydown",onKey);
    window.addEventListener("storage",onStorage);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown",onKey);
      window.removeEventListener("storage",onStorage);
      document.body.style.overflow = previous;
    };
  },[open,onClose]);
  useEffect(() => { if (ready) localStorage.setItem(CART_KEY,JSON.stringify(items)); },[items,ready]);
  const lines = useMemo(() => items.map(item => ({...item,product:catalogue.find(p=>p.id===item.id)!})),[items]);
  const subtotal = lines.reduce((sum,line)=>sum+line.product.price*line.qty,0);
  const count = items.reduce((sum,item)=>sum+item.qty,0);
  const changeQuantity = (id:string,size:string|undefined,colour:string|undefined,delta:number) => setItems(current=>current.map(item=>item.id===id&&item.size===size&&item.colour===colour?{...item,qty:Math.max(1,Math.min(99,item.qty+delta))}:item));
  const remove = (id:string,size:string|undefined,colour:string|undefined) => {
    setItems(current=>current.filter(item=>!(item.id===id&&item.size===size&&item.colour===colour)));
    toast.success("Item removed from your cart");
  };
  if (!open) return null;
  return <div className="ishtile-cart-overlay" onMouseDown={event=>{if(event.target===event.currentTarget)onClose();}}>
    <aside className="ishtile-cart-drawer" role="dialog" aria-modal="true" aria-label="Your cart">
      <div className="ishtile-cart-topbar"><Link to="/" onClick={onClose} className="ishtile-cart-wordmark">ISHTILE<span>+</span></Link><button aria-label="Close cart" onClick={onClose}><X size={18}/></button></div>
      <div className="ishtile-cart-heading"><h2>Your Cart ({count})</h2></div>
      {lines.length ? <div className="ishtile-cart-items">
        {lines.map(line=><article className="ishtile-cart-item" key={line.id+"-"+line.size+"-"+line.colour}>
          <Link to="/products/$slug" params={{slug:line.id}} onClick={onClose} className="ishtile-cart-thumb"><img src={image(line.product.image)} alt={line.product.name}/></Link>
          <div className="ishtile-cart-item-copy"><span>{line.product.brand}</span><Link to="/products/$slug" params={{slug:line.id}} onClick={onClose}><h3>{line.product.name}</h3></Link>{(line.colour||line.size)&&<small>{[line.colour,line.size&&"Size "+line.size].filter(Boolean).join(" · ")}</small>}<strong>{money(line.product.price)}</strong><div className="ishtile-cart-stepper"><button aria-label="Decrease quantity" onClick={()=>changeQuantity(line.id,line.size,line.colour,-1)}><Minus size={12}/></button><span>{line.qty}</span><button aria-label="Increase quantity" onClick={()=>changeQuantity(line.id,line.size,line.colour,1)}><Plus size={12}/></button></div></div>
          <button className="ishtile-cart-remove" aria-label={"Remove "+line.product.name} onClick={()=>remove(line.id,line.size,line.colour)}><Trash2 size={15}/></button>
        </article>)}
      </div> : <div className="ishtile-cart-empty"><ShoppingBag size={27} strokeWidth={1.3}/><h3>Your cart is empty</h3><p>Find something worth keeping.</p><button onClick={onClose}>Continue Shopping</button></div>}
      <footer className="ishtile-cart-footer"><div className="ishtile-cart-subtotal"><span>Subtotal</span><strong>{money(subtotal)}</strong></div><button className="ishtile-cart-checkout" disabled={!lines.length} onClick={()=>toast.info("Checkout will be available soon.")}>Checkout <ArrowRight size={16}/></button><button className="ishtile-cart-continue" onClick={onClose}>Continue Shopping</button></footer>
    </aside>
  </div>;
}
