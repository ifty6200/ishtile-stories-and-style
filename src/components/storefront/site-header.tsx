import { useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { Heart, Menu, Search, ShoppingBag, X } from "lucide-react";

export function SiteHeader() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const [menuOpen, setMenuOpen] = useState(false);
  const links = [
    { label: "Shop", href: "/#shop" },
    { label: "Brands", href: "/#brands" },
    { label: "Editorial", href: "/editorial" },
    { label: "Culture", href: "/#collections" },
    { label: "About", href: "/#about" },
  ];

  return (
    <>
      <div className="announcement">
        <span>DISCOVER BEYOND LABELS.</span>
        <span className="announcement-center">FREE DELIVERY ON ORDERS OVER ৳5,000</span>
        <span>EST. FOR THE CURIOUS <span className="star-mark">✦</span></span>
      </div>
      <header className={`site-header${isHome ? " home-overlay" : ""}`} aria-label="ISHTILE main header">
        <Link className="wordmark" to="/" aria-label="ISHTILE home">ISHTILE<span>✦</span></Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map(link => <a key={link.label} href={link.href}>{link.label}</a>)}
        </nav>
        <div className="header-actions">
          <a aria-label="Search products" href="/#shop"><Search size={18}/></a>
          <a aria-label="Wishlist" href="/#shop"><Heart size={18}/></a>
          <a aria-label="Shopping bag" href="/#shop"><ShoppingBag size={19}/></a>
          <button className="mobile-menu-toggle" aria-label={menuOpen ? "Close menu" : "Open menu"} onClick={() => setMenuOpen(open => !open)}>
            {menuOpen ? <X/> : <Menu/>}
          </button>
        </div>
      </header>
      {menuOpen && (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          {links.map(link => <a key={link.label} href={link.href} onClick={() => setMenuOpen(false)}>{link.label}</a>)}
        </nav>
      )}
    </>
  );
}
