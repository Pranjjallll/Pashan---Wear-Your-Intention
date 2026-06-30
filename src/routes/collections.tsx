import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { collections } from "@/data/products";
import collectionHero from "@/assets/editorial/ritual-umber.jpg";

export const Route = createFileRoute("/collections")({
  head: () => ({
    meta: [
      { title: "The Bracelet Collection — PASHAN" },
      { name: "description", content: "Explore ten natural gemstone bracelets from PASHAN, handmade in India and organised by stone and intention." },
    ],
  }),
  component: CollectionsPage,
});

function CollectionsPage() {
  return (
    <SiteLayout>
      <section className="catalogue-hero grain">
        <img src={collectionHero} alt="PASHAN Tiger's Eye bracelet in an umber presentation box" />
        <div className="catalogue-hero-overlay" />
        <div className="container-luxe catalogue-hero-copy">
          <div className="eyebrow">The complete catalogue · 2026</div>
          <h1>Ten stones.<br /><em>One considered house.</em></h1>
          <p>Natural gemstone bracelets composed in Haridwar for grounding, courage, clarity, balance, and the private rituals of everyday life.</p>
        </div>
      </section>
      <section className="catalogue-list section-space">
        <div className="container-luxe">
          <div className="catalogue-toolbar">
            <p>{collections.length} pieces · Prices include presentation and authenticity details</p>
            <span>Sort: House order</span>
          </div>
          <div className="collection-grid-premium">
            {collections.map((product, index) => (
              <Reveal key={product.slug} delay={(index % 4) * 70}>
                <ProductCard product={product} index={index} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
