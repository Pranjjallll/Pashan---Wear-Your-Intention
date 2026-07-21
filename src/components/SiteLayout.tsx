import { Link, useRouterState } from "@tanstack/react-router";
import {
  ChevronDown,
  Menu,
  Search,
  ShoppingBag,
  UserRound,
  WandSparkles,
  X,
} from "lucide-react";
import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
} from "react";
import { useCart } from "@/lib/cart";
import { BrandMark, PashanSymbol } from "./BrandMark";
import { CartDrawer } from "./CartDrawer";
import { WhatsAppConcierge } from "./WhatsAppConcierge";
import { WisdomCirclePopup } from "./WisdomCirclePopup";

const WHATSAPP_URL =
  "https://wa.me/447767956428?text=Namaste%20Pashan%2C%20I%20would%20like%20help%20with%20a%20bracelet.";

const PRIMARY_NAV = [
  { to: "/find-your-bracelet", label: "Find your stone" },
  { to: "/contact", label: "Gifts" },
  { to: "/about", label: "Our story" },
] as const;

const SHOP_LINKS = [
  {
    to: "/collections",
    label: "All jewellery",
    note: "The complete collection",
  },
  {
    to: "/find-your-bracelet",
    label: "Shop by intention",
    note: "Courage, calm, focus and more",
  },
  {
    to: "/rashi",
    label: "Shop by Rashi",
    note: "A traditional starting point",
  },
] as const;

const DISCOVER_LINKS = [
  { to: "/track-order", label: "Track your order" },
  { to: "/rituals", label: "Rituals & care" },
  { to: "/journal", label: "Journal" },
  { to: "/contact", label: "Contact us" },
] as const;

function Header() {
  const { count, setOpen } = useCart();
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const shopRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setShopOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    const previousOverflow = document.body.style.overflow;
    const menuButton = menuButtonRef.current;
    document.body.style.overflow = "hidden";
    const menu = mobileMenuRef.current;
    const focusable = Array.from(
      menu?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ??
        [],
    );
    focusable[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
        return;
      }
      if (event.key !== "Tab" || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      menuButton?.focus();
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!shopOpen) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!shopRef.current?.contains(event.target as Node)) setShopOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setShopOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [shopOpen]);

  const handleMobileKeys = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") setMobileOpen(false);
  };

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="announcement-bar">
        <span>Opening offer: ₹899 · was ₹1,500 · save ₹601</span>
        <Link to="/track-order" className="announcement-track-link">
          Track your order
        </Link>
      </div>
      <div className="container-luxe header-inner">
        <BrandMark />
        <nav className="header-nav" aria-label="Main navigation">
          <div className="header-shop" ref={shopRef}>
            <button
              type="button"
              className={`header-link header-shop-trigger ${shopOpen ? "is-active" : ""}`}
              aria-expanded={shopOpen}
              aria-controls="desktop-shop-menu"
              onClick={() => setShopOpen((value) => !value)}
            >
              Shop <ChevronDown aria-hidden size={14} />
            </button>
            {shopOpen && (
              <div id="desktop-shop-menu" className="shop-menu-panel">
                <div>
                  <span className="shop-menu-label">Shop PASHAN</span>
                  {SHOP_LINKS.map((item) => (
                    <Link
                      key={item.to + item.label}
                      to={item.to}
                      onClick={() => setShopOpen(false)}
                    >
                      <strong>{item.label}</strong>
                      <small>{item.note}</small>
                    </Link>
                  ))}
                </div>
                <div className="shop-menu-note">
                  <BrandMark compact />
                  <p>
                    Natural-stone jewellery, handmade in India and prepared for
                    gifting.
                  </p>
                </div>
              </div>
            )}
          </div>
          <Link
            to="/products/$slug"
            params={{ slug: "make-your-own" }}
            className="personalise-nav-cta"
            activeProps={{ className: "is-active" }}
          >
            <WandSparkles aria-hidden size={15} />
            Create yours
          </Link>
          {PRIMARY_NAV.map((item) => (
            <Link
              key={item.to + item.label}
              to={item.to}
              className="header-link"
              activeProps={{ className: "is-active" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <Link
            to="/collections"
            className="icon-action"
            aria-label="Search and browse the collection"
          >
            <Search aria-hidden size={19} />
          </Link>
          <Link
            to="/contact"
            className="icon-action account-action"
            aria-label="Client care"
          >
            <UserRound aria-hidden size={19} />
          </Link>
          <button
            onClick={() => setOpen(true)}
            className="icon-action cart-trigger"
            aria-label={`Open bag with ${count} ${count === 1 ? "item" : "items"}`}
          >
            <ShoppingBag aria-hidden size={19} />
            {count > 0 && <span>{count}</span>}
          </button>
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMobileOpen(true)}
            className="menu-trigger"
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
          >
            <Menu aria-hidden size={22} />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <>
          <button
            className="mobile-menu-overlay"
            type="button"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu backdrop"
          />
          <div
            id="mobile-navigation"
            ref={mobileMenuRef}
            className="mobile-menu is-open"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            onKeyDown={handleMobileKeys}
          >
            <div className="mobile-menu-head">
              <BrandMark compact />
              <button
                type="button"
                className="icon-action"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
              >
                <X aria-hidden size={22} />
              </button>
            </div>
            <nav className="mobile-nav" aria-label="Mobile navigation">
              <Link
                to="/products/$slug"
                params={{ slug: "make-your-own" }}
                className="mobile-personalise-link"
              >
                <WandSparkles aria-hidden size={18} />
                Create your own bracelet
              </Link>
              <div className="mobile-nav-group">
                <span>Shop</span>
                {SHOP_LINKS.map((item) => (
                  <Link
                    key={item.to + item.label}
                    to={item.to}
                    activeProps={{ className: "is-active" }}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              <div className="mobile-nav-group">
                <span>Explore PASHAN</span>
                {PRIMARY_NAV.map((item) => (
                  <Link
                    key={item.to + item.label}
                    to={item.to}
                    activeProps={{ className: "is-active" }}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              <div className="mobile-nav-group">
                <span>Help & discover</span>
                {DISCOVER_LINKS.map((item) => (
                  <Link
                    key={item.to + item.label}
                    to={item.to}
                    activeProps={{ className: "is-active" }}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </nav>
            <div className="mobile-menu-foot">
              <p>Wear Your Intention</p>
              <small>Haridwar crafted · Natural stone · Gifting ready</small>
            </div>
          </div>
        </>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-aura" aria-hidden>
        <PashanSymbol />
      </div>
      <div className="container-luxe footer-grid">
        <div className="footer-house">
          <BrandMark />
          <p>
            Natural-stone jewellery shaped by Himalayan calm, Indian craft, and
            the intentions we choose to carry.
          </p>
          <div className="footer-mantra">
            Himalayan inspired. Handmade in India.
          </div>
          <a
            className="footer-whatsapp"
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp: 07767 956428
          </a>
        </div>
        {[
          [
            "Discover",
            [
              ["Seven stones + custom", "/collections"],
              ["Create your own bracelet", "/products/make-your-own"],
              ["Stone finder", "/find-your-bracelet"],
              ["Shop by Rashi", "/rashi"],
              ["Rituals", "/rituals"],
            ],
          ],
          [
            "The house",
            [
              ["Our story", "/about"],
              ["Journal", "/journal"],
              ["Contact us", "/contact"],
            ],
          ],
          [
            "Client care",
            [
              ["Your bag", "/cart"],
              ["Track your order", "/track-order"],
              ["Delivery help", "/contact"],
              ["Care guide", "/rituals"],
              ["Returns", "/contact"],
            ],
          ],
        ].map(([title, links]) => (
          <div key={title as string} className="footer-column">
            <div className="eyebrow">{title as string}</div>
            <ul>
              {(links as string[][]).map(([label, to]) => (
                <li key={label}>
                  <Link to={to}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="container-luxe footer-bottom">
        <p>© {new Date().getFullYear()} PASHAN · Haridwar, Uttarakhand</p>
        <p>
          Natural stones, described by traditional associations. No medical
          claims.
        </p>
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
      <WhatsAppConcierge />
      <WisdomCirclePopup />
    </div>
  );
}
