import { Reveal } from "./Reveal";
import { ProductCard } from "./ProductCard";
import { Link } from "@tanstack/react-router";
import { collections } from "@/data/products";

export function EditorialProductGrid() {
  return (
    <section className="collection-edit section-space">
      <div className="container-luxe">
        <Reveal className="section-heading split-heading">
          <div>
            <div className="eyebrow">The complete edit</div>
            <h2 className="h2-large">Objects of <em>intention.</em></h2>
          </div>
          <p>Every bracelet begins with a quality worth carrying. Explore the catalogue by stone, intention, or the colour that catches your eye.</p>
        </Reveal>
        <div className="collection-grid-premium">
          {collections.map((product, index) => (
            <Reveal key={product.slug} staggerIndex={index % 4}>
              <ProductCard product={product} index={index} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
