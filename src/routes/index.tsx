import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { EditorialStack } from "@/components/EditorialStack";
import { IntentionBeads } from "@/components/IntentionBeads";
import { PeacockGlyph } from "@/components/BrandMark";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { QuoteSection } from "@/components/QuoteSection";
import { EditorialStory } from "@/components/EditorialStory";
import { EditorialProductGrid } from "@/components/EditorialProductGrid";
import { CraftsmanshipSection } from "@/components/CraftsmanshipSection";
import { collections, intentions } from "@/data/products";
import heroImage from "@/assets/editorial/ritual-ember.jpg";
import tigerClose from "@/assets/editorial/tiger-eye-marble.jpg";
import ritualGold from "@/assets/editorial/ritual-saffron.jpg";
import ritualTemple from "@/assets/editorial/ritual-temple.jpg";
import packTiger from "@/assets/editorial/pack-tiger-eye.jpg";
import packAmethyst from "@/assets/editorial/pack-amethyst.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PASHAN — Himalayan Gemstone Bracelets" },
      {
        name: "description",
        content:
          "Premium natural gemstone bracelets from Haridwar. Rooted in Himalayan calm, made with intention in India.",
      },
      { property: "og:title", content: "PASHAN — Stone · Energy · Intention" },
      {
        property: "og:description",
        content:
          "Natural gemstone bracelets for courage, clarity, grounding, balance, and renewal.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <SiteLayout>
      <Hero />
      <HousePromise />
      <QuoteSection />
      <EditorialStack />
      <EditorialStory />
      <IntentionBeads />
      <EditorialProductGrid />
      <CraftsmanshipSection />
      <IntentionFinder />
      <Presentation />
      <JournalAndCircle />
    </SiteLayout>
  );
}

function Hero() {
  return (
    <section className="premium-hero grain">
      <img
        src={heroImage}
        alt="PASHAN Tiger's Eye bracelet presented in a handcrafted saffron box"
        className="premium-hero-image"
      />
      <div className="premium-hero-overlay" />
      <div className="premium-hero-lines" aria-hidden />
      <div className="container-luxe premium-hero-inner">
        <div className="premium-hero-copy">
          <div className="hero-overline">
            <span /> Himalayan gemstone atelier <span />
          </div>
          <h1>
            Wear the quality
            <br />
            you wish to <em>become.</em>
          </h1>
          <p>
            Natural gemstone bracelets from Haridwar, composed as quiet symbols
            of courage, balance, focus, and renewal.
          </p>
          <div className="hero-actions">
            <Link to="/collections" className="btn-gold">
              Discover the collection <span>↗</span>
            </Link>
            <Link to="/find-your-bracelet" className="text-link">
              Find your stone <span>→</span>
            </Link>
          </div>
        </div>
        <Link
          to="/products/$slug"
          params={{ slug: "tiger-eye" }}
          className="hero-object-card"
        >
          <div className="hero-object-image">
            <img src={tigerClose} alt="Tiger's Eye bracelet close-up" />
          </div>
          <div>
            <span>House signature · 01</span>
            <strong>Tiger's Eye</strong>
            <small>Courage · Focus · Protection</small>
          </div>
        </Link>
        <div className="hero-scroll">
          <span /> Scroll to enter
        </div>
      </div>
    </section>
  );
}

function HousePromise() {
  const promises = [
    [
      "01",
      "Authentic natural stone",
      "Each piece is selected for natural character, tone, and finish.",
    ],
    [
      "02",
      "Handmade with intention",
      "Composed bead by bead in India, in small considered batches.",
    ],
    [
      "03",
      "A complete ritual",
      "Presentation box, stone story, intention card, and authenticity details.",
    ],
  ];
  return (
    <section className="promise-strip">
      <div className="container-luxe promise-grid">
        {promises.map(([number, title, copy], index) => (
          <Reveal key={title} delay={index * 100} className="promise-item">
            <span>{number}</span>
            <div>
              <h2>{title}</h2>
              <p>{copy}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function IntentionFinder() {
  return (
    <section className="intention-section section-space">
      <div className="container-luxe intention-layout">
        <Reveal className="intention-intro">
          <div className="eyebrow">Choose by intention</div>
          <h2 className="h2-large">Begin with a word.</h2>
          <p>
            Sometimes the clearest way to choose a stone is to name what you
            want more of in your days.
          </p>
          <Link to="/find-your-bracelet" className="text-link">
            Take the stone finder <span>→</span>
          </Link>
        </Reveal>
        <div className="intention-list">
          {intentions.map((item, index) => (
            <Reveal key={item.key} staggerIndex={index}>
              <Link to="/products/$slug" params={{ slug: item.slug }}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{item.label}</strong>
                <i>Discover stone</i>
                <b>↗</b>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Presentation() {
  return (
    <section className="presentation-section grain">
      <div className="presentation-collage" aria-hidden>
        <div>
          <img src={ritualGold} alt="" />
        </div>
        <div>
          <img src={ritualTemple} alt="" />
        </div>
        <div>
          <img src={packTiger} alt="" />
        </div>
        <div>
          <img src={packAmethyst} alt="" />
        </div>
      </div>
      <div className="container-luxe presentation-copy">
        <Reveal>
          <div className="eyebrow">The PASHAN presentation</div>
          <h2 className="h2-large">
            The first impression
            <br />
            is part of the piece.
          </h2>
          <p>
            Designed for gifting and keeping: layered packaging, an authenticity
            card, stone details, and a considered unboxing that turns arrival
            into a small ritual.
          </p>
          <ul>
            <li>
              <span>01</span> Premium presentation box
            </li>
            <li>
              <span>02</span> Stone and intention story
            </li>
            <li>
              <span>03</span> Authenticity details
            </li>
            <li>
              <span>04</span> Made and assembled in India
            </li>
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

function JournalAndCircle() {
  return (
    <section className="circle-section section-space">
      <div className="container-luxe circle-grid">
        <Reveal className="circle-manifesto">
          <PeacockGlyph />
          <div className="eyebrow">A quiet house note</div>
          <blockquote>
            “What you wear can be decoration. Or it can be a decision.”
          </blockquote>
          <p>PASHAN · Haridwar, Uttarakhand</p>
        </Reveal>
        <Reveal className="circle-signup" delay={120}>
          <div className="eyebrow">The PASHAN circle</div>
          <h2>Occasional correspondence, thoughtfully sent.</h2>
          <p>
            New stones, atelier stories, care notes, and early access to limited
            batches.
          </p>
          <form onSubmit={(event) => event.preventDefault()}>
            <label>
              <span className="sr-only">Email address</span>
              <input type="email" required placeholder="Your email address" />
            </label>
            <button type="submit">
              Join the circle <span>→</span>
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
