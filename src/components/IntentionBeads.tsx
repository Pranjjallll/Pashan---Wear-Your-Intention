import { Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import { collections } from "@/data/products";
import { formatPrice } from "@/lib/cart";

const featuredSlugs = [
  "tiger-eye",
  "pyrite",
  "amethyst",
  "green-quartz",
  "seven-chakra",
  "hematite",
];

export function IntentionBeads() {
  const featured = useMemo(
    () =>
      featuredSlugs
        .map((slug) => collections.find((product) => product.slug === slug))
        .filter(Boolean),
    [],
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const active = featured[activeIndex] ?? featured[0];

  if (!active) return null;

  return (
    <section
      className="bead-oracle-section grain"
      aria-labelledby="bead-oracle-title"
    >
      <div className="container-luxe bead-oracle-grid">
        <div className="bead-oracle-copy">
          <div className="eyebrow">Interactive stone finder</div>
          <h2 id="bead-oracle-title">
            Slide the mala.
            <br />
            <em>Let a quality answer.</em>
          </h2>
          <p>
            Choose a bead below and the house will shift around your intention —
            a small playful ritual before the practical choice.
          </p>

          <div
            className="bead-rail"
            role="tablist"
            aria-label="Choose an intention"
          >
            {featured.map((product, index) => (
              <button
                key={product.slug}
                type="button"
                role="tab"
                aria-selected={activeIndex === index}
                aria-controls="bead-oracle-panel"
                className={`bead-button tone-${product.tone} ${
                  activeIndex === index ? "is-active" : ""
                }`}
                onClick={() => setActiveIndex(index)}
              >
                <span className="sr-only">{product.stone}</span>
              </button>
            ))}
          </div>

          <div
            id="bead-oracle-panel"
            className="bead-oracle-panel"
            role="tabpanel"
          >
            <span>{String(activeIndex + 1).padStart(2, "0")}</span>
            <h3>{active.name}</h3>
            <p>{active.intention}</p>
            <div className="bead-oracle-actions">
              <Link
                to="/products/$slug"
                params={{ slug: active.slug }}
                className="btn-gold"
              >
                Explore {active.stone}
              </Link>
              <span>{formatPrice(active.price)}</span>
            </div>
          </div>
        </div>

        <Link
          to="/products/$slug"
          params={{ slug: active.slug }}
          className="bead-oracle-art"
          aria-label={`View ${active.stone} bracelet`}
        >
          <div className="bead-oracle-disc" aria-hidden />
          <img src={active.image} alt={`${active.stone} bracelet`} />
          <div className="bead-oracle-stamp">
            <span>पाषाण</span>
            <strong>{active.stone}</strong>
            <small>{active.qualities.join(" · ")}</small>
          </div>
        </Link>
      </div>
    </section>
  );
}
