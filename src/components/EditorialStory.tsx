import { Reveal } from "./Reveal";
import { Link } from "@tanstack/react-router";
import macroStone from "@/assets/editorial/citrine-obsidian.jpg";

export function EditorialStory() {
  return (
    <section className="editorial-story section-space grain">
      <div className="container-luxe editorial-story-layout">
        <Reveal className="editorial-story-image">
          <img src={macroStone} alt="Macro gemstone texture" />
        </Reveal>
        <div className="editorial-story-copy">
          <Reveal delay={150}>
            <div className="eyebrow">The Material</div>
            <h2 className="h2-large">Every stone carries millions of years of Earth's history.</h2>
            <p>We simply help you choose the one that reflects your intention.</p>
            <Link to="/collections" className="btn-gold">
              Discover the Ritual <span>→</span>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
