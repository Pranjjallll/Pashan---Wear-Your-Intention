import { Reveal } from "./Reveal";

export function QuoteSection() {
  return (
    <section className="quote-section section-space">
      <div className="container-luxe">
        <Reveal>
          <blockquote className="quote-text">
            "Luxury isn't what you wear.<br />
            It's what you carry with <em>intention</em>."
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}
