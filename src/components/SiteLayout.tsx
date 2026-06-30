import { Link } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { useCart } from "@/lib/cart";
import { CartDrawer } from "./CartDrawer";
import { BrandMark, PeacockGlyph } from "./BrandMark";
import { OpeningRitual } from "./OpeningRitual";

const NAV = [
  { to: "/collections", label: "Bracelets" },
  { to: "/find-your-bracelet", label: "Stone finder" },
  { to: "/rituals", label: "Rituals" },
  { to: "/rashi", label: "Rashi" },
  { to: "/journal", label: "Journal" },
  { to: "/about", label: "Our house" },
] as const;

function Header() {
  const { count, setOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="announcement-bar">
        <span>Haridwar · Himalayan inspired · Handmade in India</span>
        <span className="hidden md:inline">Complimentary authenticity card with every piece</span>
      </div>
      <div className="container-luxe header-inner">
        <BrandMark />
        <nav className="header-nav" aria-label="Main navigation">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="header-link"
              activeProps={{ className: "is-active" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <Link to="/contact" className="header-concierge">Concierge</Link>
          <button onClick={() => setOpen(true)} className="cart-trigger" aria-label={`Open cart with ${count} items`}>
            Bag <span>{String(count).padStart(2, "0")}</span>
          </button>
          <button
            onClick={() => setMobileOpen((value) => !value)}
            className={`menu-trigger ${mobileOpen ? "is-open" : ""}`}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            <span /><span />
          </button>
        </div>
      </div>
      <div className={`mobile-menu ${mobileOpen ? "is-open" : ""}`}>
        <div className="mobile-feather"><PeacockGlyph /></div>
        <nav className="container-luxe mobile-nav" aria-label="Mobile navigation">
          {NAV.map((item, index) => (
            <Link key={item.to} to={item.to} onClick={() => setMobileOpen(false)}>
              <span>{String(index + 1).padStart(2, "0")}</span>{item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
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
      <OpeningRitual />
      <Header />
      <main className="site-main">{children}</main>
      <Footer />
      <CartDrawer />
    </div>
  );
}
