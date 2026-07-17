import { useCart } from "@/lib/cart";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState, ReactNode, useEffect } from "react";
import { BrandMark, PeacockGlyph } from "./BrandMark";
import { CartDrawer } from "./CartDrawer";

const SHOP_CATEGORIES = [
  {
    label: "By Stone",
    links: ["Tiger Eye", "Pyrite", "Amethyst", "Green Quartz", "Citrine", "Lava", "Hematite", "Black Onyx"]
  },
  {
    label: "By Intention",
    links: ["Leadership", "Prosperity", "Growth", "Focus", "Protection", "Balance", "Healing"]
  },
  {
    label: "Featured",
    links: ["Best Sellers", "Gift Sets", "New Arrivals"]
  }
];

function Header() {
  const { count, setOpen } = useCart();
  const [shopOpen, setShopOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`site-header ${isScrolled ? 'is-scrolled' : ''} ${shopOpen ? 'is-open' : ''}`}
      >
        <div className="header-wrapper">
          <div className="container-luxe header-inner">
            <BrandMark />
            <nav className="header-nav">
              <div 
                className="nav-item" 
                onMouseEnter={() => setShopOpen(true)} 
                onMouseLeave={() => setShopOpen(false)}
              >
                <Link to="/collections" className="header-link">Shop</Link>
                <AnimatePresence>
                  {shopOpen && (
                    <motion.div 
                      className="mega-menu"
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.98 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                    >
                      {SHOP_CATEGORIES.map(cat => (
                        <div key={cat.label} className="mega-column">
                          <h4>{cat.label}</h4>
                          {cat.links.map(link => (
                            <Link key={link} to={`/collections/${link.toLowerCase().replace(' ', '-')}`}>
                              {link}
                            </Link>
                          ))}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <Link to="/find-your-bracelet" className="header-link">Stone Finder</Link>
              <Link to="/collections" className="header-link">Collections</Link>
              <Link to="/journal" className="header-link">Journal</Link>
              <Link to="/rashi" className="header-link">Rashi</Link>
              <Link to="/about" className="header-link">About</Link>
            </nav>
            <div className="header-actions">
              <button className="header-icon">Search</button>
              <button onClick={() => setOpen(true)} className="cart-trigger">
                Bag ({String(count).padStart(2, "0")})
              </button>
            </div>
          </div>
        </div>
      </motion.header>
      {shopOpen && <div className="header-overlay" />}
    </>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-aura" aria-hidden><PeacockGlyph /></div>
      <div className="container-luxe footer-grid">
        <div className="footer-house">
          <BrandMark />
          <p>Contemporary gemstone bracelets shaped by Himalayan calm, Indian craft, and the intentions we choose to carry.</p>
          <div className="footer-mantra">धर्य · शान्ति · ऊर्जा · संतुलन</div>
        </div>
        {[
          ["Discover", [["The collection", "/collections"], ["Stone finder", "/find-your-bracelet"], ["Shop by Rashi", "/rashi"], ["Rituals", "/rituals"]]],
          ["The house", [["Our story", "/about"], ["Journal", "/journal"], ["Concierge", "/contact"]]],
          ["Client care", [["Your bag", "/cart"], ["Shipping", "/contact"], ["Care guide", "/rituals"], ["Returns", "/contact"]]],
        ].map(([title, links]) => (
          <div key={title as string} className="footer-column">
            <div className="eyebrow">{title as string}</div>
            <ul>
              {(links as string[][]).map(([label, to]) => (
                <li key={label}><Link to={to}>{label}</Link></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="container-luxe footer-bottom">
        <p>© {new Date().getFullYear()} PASHAN · Haridwar, Uttarakhand</p>
        <p>@paash_an · Natural stones, described by traditional associations. No medical claims.</p>
      </div>
    </footer>
  );
}

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="site-shell">
      <Header />
      <main className="site-main">{children}</main>
      <Footer />
      <CartDrawer />
    </div>
  );
}
