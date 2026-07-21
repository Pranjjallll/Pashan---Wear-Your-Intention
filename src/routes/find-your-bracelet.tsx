import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Rotate3D,
  Sparkles,
} from "lucide-react";
import { useState, type CSSProperties, type PointerEvent } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { collections } from "@/data/products";
import { LaunchPrice } from "@/components/LaunchPrice";

export const Route = createFileRoute("/find-your-bracelet")({
  head: () => ({
    meta: [
      { title: "Virtual Bracelet Studio - PASHAN" },
      {
        name: "description",
        content:
          "Explore seven PASHAN natural-stone bracelets in an interactive virtual studio.",
      },
      { property: "og:title", content: "Virtual Bracelet Studio - PASHAN" },
      {
        property: "og:description",
        content:
          "Move through the seven PASHAN stones and discover the qualities traditionally associated with each one.",
      },
    ],
  }),
  component: FindPage,
});

const bracelets = collections.filter((collection) => !collection.isCustom);
const orbitBeads = Array.from({ length: 18 }, (_, index) => index);

function FindPage() {
  const [activeIndex, setActiveIndex] = useState(1);
  const [view, setView] = useState<"live" | "detail">("live");
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const active = bracelets[activeIndex] ?? bracelets[0];

  if (!active) return null;

  const previewImage =
    view === "live" ? (active.images[1] ?? active.image) : active.image;

  const chooseIndex = (index: number) => {
    setActiveIndex(index);
    setTilt({ x: 0, y: 0 });
  };

  const moveSelection = (direction: -1 | 1) => {
    chooseIndex(
      (activeIndex + direction + bracelets.length) % bracelets.length,
    );
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    setTilt({
      x: ((event.clientY - bounds.top) / bounds.height - 0.5) * -8,
      y: ((event.clientX - bounds.left) / bounds.width - 0.5) * 10,
    });
  };

  const previewStyle = {
    "--studio-tilt-x": `${tilt.x}deg`,
    "--studio-tilt-y": `${tilt.y}deg`,
  } as CSSProperties;

  return (
    <SiteLayout>
      <section className="virtual-finder">
        <div className="container-luxe virtual-finder-intro">
          <div>
            <span className="finder-kicker">The Pashan Stone Quest</span>
            <h1>
              Meet all seven.
              <br />
              <em>Notice what calls you.</em>
            </h1>
          </div>
          <div className="finder-intro-copy">
            <p>
              Select a bracelet, move the live view, and reveal the qualities
              traditionally associated with its natural stone.
            </p>
            <span>
              <Sparkles size={15} aria-hidden /> Seven stones / one intention
            </span>
          </div>
        </div>

        <div className="container-luxe virtual-studio-shell">
          <nav
            className="stone-selector"
            aria-label="Choose a bracelet to preview"
            role="tablist"
          >
            {bracelets.map((bracelet, index) => (
              <button
                key={bracelet.slug}
                type="button"
                role="tab"
                aria-selected={index === activeIndex}
                aria-controls="virtual-bracelet-stage"
                className={index === activeIndex ? "is-active" : ""}
                onClick={() => chooseIndex(index)}
              >
                <span className="stone-selector-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="stone-selector-thumb">
                  <img src={bracelet.image} alt="" />
                </span>
                <span>
                  <strong>{bracelet.stone}</strong>
                  <small>{bracelet.name}</small>
                </span>
              </button>
            ))}
          </nav>

          <div className="virtual-studio-main">
            <div className="studio-toolbar">
              <div>
                <i aria-hidden />
                Live bracelet view
              </div>
              <div className="studio-view-toggle" aria-label="Preview mode">
                <button
                  type="button"
                  className={view === "live" ? "is-active" : ""}
                  onClick={() => setView("live")}
                  aria-pressed={view === "live"}
                >
                  Live view
                </button>
                <button
                  type="button"
                  className={view === "detail" ? "is-active" : ""}
                  onClick={() => setView("detail")}
                  aria-pressed={view === "detail"}
                >
                  Stone detail
                </button>
              </div>
            </div>

            <div
              id="virtual-bracelet-stage"
              className={`virtual-bracelet-stage tone-${active.tone}`}
              role="tabpanel"
              onPointerMove={handlePointerMove}
              onPointerLeave={() => setTilt({ x: 0, y: 0 })}
              style={previewStyle}
            >
              <div className="studio-halo" aria-hidden />
              <div className="studio-orbit" aria-hidden>
                {orbitBeads.map((bead) => (
                  <i key={bead} style={{ "--bead": bead } as CSSProperties} />
                ))}
              </div>
              <div className="studio-wrist" aria-hidden />
              <div
                className="studio-product-frame"
                key={`${active.slug}-${view}`}
              >
                <img
                  src={previewImage}
                  alt={`${active.stone} bracelet ${view === "live" ? "live preview" : "stone detail"}`}
                />
              </div>

              <div className="studio-benefits" key={active.slug}>
                {active.qualities.map((quality, index) => (
                  <span
                    key={quality}
                    style={{ animationDelay: `${160 + index * 130}ms` }}
                  >
                    <i>{String(index + 1).padStart(2, "0")}</i>
                    {quality}
                  </span>
                ))}
              </div>

              <div className="studio-move-hint">
                <Rotate3D size={17} aria-hidden />
                Move across the image
              </div>
            </div>

            <div className="studio-discovery">
              <div className="studio-progress-copy">
                <span>
                  Stone {String(activeIndex + 1).padStart(2, "0")} of{" "}
                  {String(bracelets.length).padStart(2, "0")}
                </span>
                <div className="studio-progress-track" aria-hidden>
                  <i
                    style={{
                      width: `${((activeIndex + 1) / bracelets.length) * 100}%`,
                    }}
                  />
                </div>
              </div>

              <div className="studio-story" key={`story-${active.slug}`}>
                <span>{active.name}</span>
                <h2>{active.stone}</h2>
                <p>{active.story}</p>
                <div className="studio-meta">
                  <span>{active.fit}</span>
                  <LaunchPrice
                    price={active.price}
                    compareAtPrice={active.compareAtPrice}
                    compact
                  />
                </div>
              </div>

              <div className="studio-actions">
                <div className="studio-stepper">
                  <button
                    type="button"
                    onClick={() => moveSelection(-1)}
                    aria-label="View previous bracelet"
                  >
                    <ChevronLeft aria-hidden size={20} />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveSelection(1)}
                    aria-label="View next bracelet"
                  >
                    <ChevronRight aria-hidden size={20} />
                  </button>
                </div>
                <Link
                  to="/products/$slug"
                  params={{ slug: active.slug }}
                  className="studio-product-link"
                >
                  Choose {active.stone}
                  <ArrowRight aria-hidden size={18} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="container-luxe finder-footnote">
          <p>
            Natural stones are described through traditional associations, not
            medical claims. The best choice is the one you will enjoy wearing.
          </p>
          <Link to="/collections">See all seven together</Link>
        </div>
      </section>
    </SiteLayout>
  );
}
