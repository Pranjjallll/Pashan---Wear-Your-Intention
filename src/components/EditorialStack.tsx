import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Reveal } from "./Reveal";

import pyriteAtelier from "@/assets/editorial/pyrite-atelier.jpg";
import packAmethyst from "@/assets/editorial/pack-amethyst.jpg";
import tigerWood from "@/assets/editorial/tiger-eye-wood.jpg";

const slides = [
  {
    title: "The Abundance Collection",
    stones: "Pyrite · Citrine · Green Quartz",
    image: pyriteAtelier,
    href: "/collections",
  },
  {
    title: "The Calm Collection",
    stones: "Amethyst · Green Quartz · 7 Chakra",
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
      className="editorial-stack-section section-space"
      aria-labelledby="editorial-stack-title"
    >
      <div className="container-luxe editorial-stack-layout">
        <div className="editorial-stack-copy">
          <Reveal>
            <div className="eyebrow">The Collection</div>
            <h2 id="editorial-stack-title" className="h2-large">
              You don't choose a stone.<br />
              <em>You recognize yourself in one.</em>
            </h2>
            <p>
              Our collections are curated for moments of stillness, courage, or
              renewal. Explore the mood that calls to your current intention.
            </p>
            <Link to="/collections" className="btn-gold mt-8">
              Explore the Collections <span>→</span>
            </Link>
          </Reveal>
        </div>

        <div className="editorial-card-stack" aria-live="polite">
          {slides.map((slide, index) => {
            const offset = (index - activeIndex + slides.length) % slides.length;
            return (
              <Link
                key={slide.title}
                to={slide.href}
                className={`editorial-slide editorial-slide-${offset}`}
                aria-hidden={offset !== 0}
                tabIndex={offset === 0 ? 0 : -1}
              >
                <img src={slide.image} alt={slide.title} />
                <div className="editorial-slide-shade" />
                <div className="editorial-slide-copy">
                  <h3 className="h3-large">{slide.title}</h3>
                  <p>{slide.stones}</p>
                </div>
              </Link>
            );
          })}
          
          <div className="editorial-controls">
            <button
              type="button"
              className="editorial-arrow editorial-arrow-left"
              onClick={() => move(-1)}
              aria-label="Previous collection"
            >
              ←
            </button>
            <div className="editorial-progress-bar">
                {slides.map((_, index) => (
                    <span key={index} className={index === activeIndex ? "active" : ""}/>
                ))}
            </div>
            <button
              type="button"
              className="editorial-arrow editorial-arrow-right"
              onClick={() => move(1)}
              aria-label="Next collection"
            >
              →
            </button>
          </div>
        </div>
      </div>
      
      <div className="container-luxe mt-16 text-center">
        <Reveal delay={200}>
            <blockquote className="quote-text text-lg italic">
                "The stone does not change your life.<br />
                It simply reminds you who you intended to become."
            </blockquote>
        </Reveal>
      </div>
    </section>
  );
}

