import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

import pyriteAtelier from "@/assets/editorial/pyrite-atelier.jpg";
import packAmethyst from "@/assets/editorial/pack-amethyst.jpg";
import tigerWood from "@/assets/editorial/tiger-eye-wood.jpg";

const slides = [
  {
    title: "The Abundance Collection",
    stones: "Pyrite · Green Quartz · Dhan Yog",
    image: pyriteAtelier,
    href: "/collections",
  },
  {
    title: "The Calm Collection",
    stones: "Amethyst · Green Quartz · Hematite",
    image: packAmethyst,
    href: "/find-your-bracelet",
  },
  {
    title: "Raw Stone Collection",
    stones: "Tiger's Eye · Lava · Hematite",
    image: tigerWood,
    href: "/collections",
  },
] as const;

export function EditorialStack() {
  const [activeIndex, setActiveIndex] = useState(0);

  const move = (direction: 1 | -1) => {
    setActiveIndex(
      (index) => (index + direction + slides.length) % slides.length,
    );
  };

  return (
    <section
      className="editorial-stack-section"
      aria-labelledby="editorial-stack-title"
    >
      <button
        type="button"
        className="editorial-arrow editorial-arrow-left"
        onClick={() => move(-1)}
        aria-label="Previous collection mood"
      >
        <ChevronLeft aria-hidden size={24} />
      </button>
      <div className="container-luxe editorial-stack-layout">
        <div className="editorial-stack-copy">
          <div className="eyebrow">Mood-led collections</div>
          <h2 id="editorial-stack-title">
            Ancient symbols,
            <br />
            modern desire.
          </h2>
          <p>
            Swipe through moods inspired by the way real visitors shop —
            abundance, calm, raw strength, and the quiet pull of a stone that
            feels like yours.
          </p>
        </div>

        <div className="editorial-card-stack" aria-live="polite">
          {slides.map((slide, index) => {
            const offset =
              (index - activeIndex + slides.length) % slides.length;
            return (
              <Link
                key={slide.title}
                to={slide.href}
                className={`editorial-slide editorial-slide-${offset}`}
                aria-hidden={offset !== 0}
                tabIndex={offset === 0 ? 0 : -1}
              >
                <img src={slide.image} alt="" />
                <div className="editorial-slide-shade" />
                <div className="editorial-slide-copy">
                  <h3>{slide.title}</h3>
                  <p>{slide.stones}</p>
                  <span>Explore</span>
                </div>
              </Link>
            );
          })}
          <div className="editorial-stack-count">
            {activeIndex + 1} of {slides.length}
          </div>
        </div>
      </div>
      <button
        type="button"
        className="editorial-arrow editorial-arrow-right"
        onClick={() => move(1)}
        aria-label="Next collection mood"
      >
        <ChevronRight aria-hidden size={24} />
      </button>
    </section>
  );
}
