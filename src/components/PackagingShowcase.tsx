import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";
import packagingCardboard from "@/assets/brand/packaging-cardboard.webp";
import packagingOverhead from "@/assets/brand/packaging-overhead.webp";
import packagingRitual from "@/assets/brand/packaging-ritual.webp";
import { Reveal } from "./Reveal";

const SLIDES = [
  {
    image: packagingCardboard,
    alt: "Open kraft PASHAN presentation box with bracelet, intention card, authenticity details and Ganga Jal",
    label: "The complete box",
    title: "Made to feel considered before the bracelet is even worn.",
    copy: "Every bracelet arrives in a gifting-ready box with its stone details, intention ritual, authenticity information and a bottle of Ganga Jal.",
  },
  {
    image: packagingRitual,
    alt: "Angled view of the complete ivory PASHAN bracelet gifting box",
    label: "Everything in its place",
    title: "A thoughtful unboxing, arranged with care.",
    copy: "Your bracelet, stone information, intention card and Ganga Jal arrive together, ready to keep or give.",
  },
  {
    image: packagingOverhead,
    alt: "Overhead view of the complete ivory PASHAN bracelet gifting box",
    label: "Gifting, already prepared",
    title: "A clear view of everything included.",
    copy: "The presentation is designed to be kept, gifted and revisited. No extra wrapping or preparation is needed.",
  },
] as const;

export function PackagingShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = SLIDES[activeIndex];

  const move = (direction: -1 | 1) => {
    setActiveIndex(
      (index) => (index + direction + SLIDES.length) % SLIDES.length,
    );
  };

  return (
    <section
      className="packaging-showcase section-space"
      aria-labelledby="packaging-title"
    >
      <div className="container-luxe packaging-showcase-grid">
        <Reveal className="packaging-showcase-media">
          <img key={active.image} src={active.image} alt={active.alt} />
          <div className="packaging-showcase-controls">
            <span aria-live="polite">
              {String(activeIndex + 1).padStart(2, "0")} /{" "}
              {String(SLIDES.length).padStart(2, "0")}
            </span>
            <div>
              <button
                type="button"
                onClick={() => move(-1)}
                aria-label="Previous packaging image"
              >
                <ArrowLeft aria-hidden size={20} />
              </button>
              <button
                type="button"
                onClick={() => move(1)}
                aria-label="Next packaging image"
              >
                <ArrowRight aria-hidden size={20} />
              </button>
            </div>
          </div>
        </Reveal>

        <Reveal className="packaging-showcase-copy" delay={100}>
          <div className="eyebrow">Included with every bracelet</div>
          <h2 id="packaging-title">The PASHAN presentation.</h2>
          <div className="packaging-active-copy" key={active.title}>
            <span>{active.label}</span>
            <h3>{active.title}</h3>
            <p>{active.copy}</p>
          </div>
          <div className="packaging-tabs" aria-label="Choose packaging view">
            {SLIDES.map((slide, index) => (
              <button
                key={slide.label}
                type="button"
                className={activeIndex === index ? "is-active" : ""}
                onClick={() => setActiveIndex(index)}
                aria-pressed={activeIndex === index}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                {slide.label}
              </button>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
