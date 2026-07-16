import { Reveal } from "./Reveal";
import craftImage from "@/assets/craft.jpg";

export function CraftsmanshipSection() {
  return (
    <section className="craftsmanship-section section-space">
      <div className="container-luxe">
        <div className="eyebrow">The Atelier</div>
        <h2 className="section-title">Crafted in Haridwar.</h2>
        <div className="craft-layout">
            <Reveal className="craft-image">
                <img src={craftImage} alt="Artisan crafting PASHAN bracelets" />
            </Reveal>
            <div className="craft-grid">
              <Reveal className="craft-item" delay={100}>
                <h3>01. Selection</h3>
                <p>Raw, authentic stones chosen for their unique mineral character.</p>
              </Reveal>
              <Reveal className="craft-item" delay={200}>
                <h3>02. Stringing</h3>
                <p>Composed bead-by-bead with conscious precision.</p>
              </Reveal>
              <Reveal className="craft-item" delay={300}>
                <h3>03. Ritual</h3>
                <p>Blessing the intention before sealing in the box.</p>
              </Reveal>
            </div>
        </div>
      </div>
    </section>
  );
}
