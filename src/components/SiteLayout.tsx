import { useCart } from "@/lib/cart";
import { Link } from "@tanstack/react-router";
import { motion, useAnimation, useMotionValueEvent, useScroll, useSpring, useTransform } from "framer-motion";
import { useState } from "react";
import { BrandMark, PeacockGlyph } from "./BrandMark";
import { CartDrawer } from "./CartDrawer";
import { OpeningRitual } from "./OpeningRitual";

const NAV = [
  { to: "/collections", label: "Bracelets" },
  { to: "/find-your-bracelet", label: "Stone finder" },
  { to: "/rituals", label: "Rituals" },
  { to: "/rashi", label: "Rashi" },
  { to: "/journal", label: "Journal" },
  { to: "/about", label: "Our house" },
] as const;

function Marquee() {
  return (
    <div className="announcement-marquee">
      <style>{`
        .announcement-marquee {
          overflow: hidden;
          display: flex;
        }
        .announcement-container {
          display: flex;
          width: max-content;
          animation: marquee-scroll 40s linear infinite;
        }
        .announcement-container:hover {
          animation-play-state: paused;
        }
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
      <div className="announcement-container">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="announcement-item">
            <span>Haridwar · Himalayan inspired · Handmade in India · Complimentary authenticity card with every piece</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Header() {
  const { count, setOpen } = useCart();
  const { scrollY } = useScroll();
  const scrolled = useTransform(scrollY, [20, 100], [0, 1]);
  const blur = useSpring(useTransform(scrolled, [0, 1], [0, 12]), { damping: 20 });
  const [mobileOpen, setMobileOpen] = useState(false);
  const controls = useAnimation();

  useMotionValueEvent(blur, "change", (latest) => {
    document.documentElement.style.setProperty("--header-blur", `${latest}px`);
  });

  return (
    <header className="site-header">
      <Marquee />
      <motion.div 
        className="header-wrapper"
        style={{ backdropFilter: `blur(var(--header-blur))` }}
      >
        <div className="container-luxe header-inner">
          <BrandMark />
          <nav className="header-nav">
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
            <button onClick={() => setOpen(true)} className="cart-trigger">
              Bag <span>{String(count).padStart(2, "0")}</span>
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`menu-trigger ${mobileOpen ? "is-open" : ""}`}
            >
              <span /><span />
            </button>
          </div>
        </div>
      </motion.div>
      <motion.div 
        className={`mobile-menu ${mobileOpen ? "is-open" : ""}`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: mobileOpen ? 1 : 0, y: mobileOpen ? 0 : -20 }}
      >
        <div className="mobile-feather"><PeacockGlyph /></div>
        <nav className="container-luxe mobile-nav">
          {NAV.map((item, index) => (
            <Link key={item.to} to={item.to} onClick={() => setMobileOpen(false)}>
              <span>{String(index + 1).padStart(2, "0")}</span>{item.label}
            </Link>
          ))}
        </nav>
      </motion.div>
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
