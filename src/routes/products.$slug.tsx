import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { PeacockGlyph } from "@/components/BrandMark";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { collections, getCollection } from "@/data/products";
import { formatPrice, useCart } from "@/lib/cart";
import presentationImage from "@/assets/editorial/ritual-red-certificate.jpg";
import { DeliveryStrip } from "@/components/DeliveryStrip";
import { RecentlyViewed } from "@/components/RecentlyViewed";
import { useRecentlyViewed } from "@/hooks/use-recently-viewed";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const product = getCollection(params.slug);
    if (!product) throw notFound();
    return product;
  },
  head: ({ loaderData }) => ({
    meta: loaderData ? [
      { title: `${loaderData.stone} Bracelet — PASHAN` },
      { name: "description", content: `${loaderData.subtitle}. ${loaderData.intention}` },
      { property: "og:title", content: `${loaderData.stone} Bracelet — PASHAN` },
      { property: "og:description", content: loaderData.intention },
      { property: "og:image", content: loaderData.image },
    ] : [{ title: "Product — PASHAN" }],
  }),
  notFoundComponent: () => (
    <SiteLayout><div className="container-luxe empty-page"><div className="eyebrow">Not found</div><h1>This stone has moved.</h1><Link to="/collections" className="btn-gold">Return to the collection</Link></div></SiteLayout>
  ),
  component: ProductPage,
});

function ProductPage() {
  const product = Route.useLoaderData();
  const { add } = useCart();
  const { addView } = useRecentlyViewed();
  const [selectedImage, setSelectedImage] = useState(0);
  const [size, setSize] = useState("7.5 in");
  const [qty, setQty] = useState(1);
  const [openPanel, setOpenPanel] = useState<"story" | "details" | "care" | null>("story");
  const related = collections.filter((item) => item.slug !== product.slug).slice(0, 3);

  useEffect(() => {
    addView(product.slug);
  }, [product.slug, addView]);

  const addToBag = () => add({ slug: product.slug, name: product.title, stone: `${product.stone} · ${size}`, price: product.price, image: product.image }, qty);

  return (
    <SiteLayout>
      <section className="product-breadcrumb container-luxe">
        <Link to="/">Home</Link><span>/</span><Link to="/collections">Bracelets</Link><span>/</span><strong>{product.stone}</strong>
      </section>

      <section className="product-stage container-luxe">
        <div className="product-gallery">
          <div className="product-gallery-main grain">
            <img src={product.images[selectedImage]} alt={`${product.stone} bracelet view ${selectedImage + 1}`} />
            <span className="product-gallery-count">{String(selectedImage + 1).padStart(2, "0")} / {String(product.images.length).padStart(2, "0")}</span>
          </div>
          <div className="product-thumbnails" aria-label="Product images">
            {product.images.map((image, index) => (
              <button key={image} onClick={() => setSelectedImage(index)} className={selectedImage === index ? "is-active" : ""} aria-label={`Show image ${index + 1}`}>
                <img src={image} alt="" />
              </button>
            ))}
          </div>
        </div>

        <aside className="product-purchase">
          <div className="eyebrow">{product.name} · Natural gemstone</div>
          <h1>{product.stone}<br /><em>Bracelet</em></h1>
          <p className="product-subtitle">{product.subtitle}</p>
          <div className="product-price-line"><strong>{formatPrice(product.price)}</strong><span>Inclusive of taxes</span></div>
          <div className="product-divider" />

          <div className="product-option">
            <div className="product-option-title"><span>Wrist size</span><button type="button">Size guide ↗</button></div>
            <div className="size-options">
              {["7 in", "7.5 in", "8 in"].map((option) => (
                <button key={option} onClick={() => setSize(option)} className={size === option ? "is-active" : ""}>{option}</button>
              ))}
            </div>
          </div>

          <div className="purchase-row">
            <div className="quantity-stepper">
              <button onClick={() => setQty((value) => Math.max(1, value - 1))} aria-label="Decrease quantity">−</button>
              <span>{qty}</span>
              <button onClick={() => setQty((value) => value + 1)} aria-label="Increase quantity">+</button>
            </div>
            <button onClick={addToBag} className="btn-gold purchase-button">Add to bag <span>· {formatPrice(product.price * qty)}</span></button>
          </div>
          <button onClick={addToBag} className="buy-now-button">Reserve with concierge</button>

          <DeliveryStrip />

          <div className="product-panels">
            {[
              ["story", "The stone story"], ["details", "Materials & details"], ["care", "Care & delivery"],
            ].map(([key, label]) => (
              <div key={key} className={openPanel === key ? "is-open" : ""}>
                <button onClick={() => setOpenPanel(openPanel === key ? null : key as typeof openPanel)}><span>{label}</span><b>+</b></button>
                <div className="product-panel-body">
                  {key === "story" && <p>{product.story}</p>}
                  {key === "details" && <dl><div><dt>Stone</dt><dd>{product.stone}</dd></div><div><dt>Bead size</dt><dd>{product.beadSize}</dd></div><div><dt>Finish</dt><dd>{product.finish}</dd></div><div><dt>Origin</dt><dd>{product.origin}</dd></div></dl>}
                  {key === "care" && <p>Keep away from perfume, oils, harsh chemicals, and prolonged water exposure. Wipe with a soft dry cloth and store in the presentation box.</p>}
                </div>
              </div>
            ))}
          </div>
        </aside>
      </section>

      <section className="product-intention-band">
        <div className="container-luxe">
          <PeacockGlyph />
          <div><div className="eyebrow">The intention</div><blockquote>“{product.intention}”</blockquote><p>{product.ritual}</p></div>
          <div className="intention-qualities">{product.qualities.map((quality, index) => <span key={quality}><b>0{index + 1}</b>{quality}</span>)}</div>
        </div>
      </section>

      <section className="product-presentation container-luxe section-space">
        <Reveal className="product-presentation-image"><img src={presentationImage} alt="PASHAN premium presentation with bracelet and authenticity card" /></Reveal>
        <Reveal className="product-presentation-copy" delay={120}>
          <div className="eyebrow">Included with every piece</div>
          <h2>Designed to arrive<br /><em>like an offering.</em></h2>
          <p>The bracelet is only one part of the experience. Each order is presented with a considered box, stone story, intention card, and authenticity details.</p>
          <ul><li>Premium keepsake box</li><li>Stone and intention card</li><li>Authenticity details</li><li>Care guidance</li></ul>
        </Reveal>
      </section>

      <section className="related-products section-space">
        <div className="container-luxe">
          <div className="section-heading"><div className="eyebrow">Continue exploring</div><h2>Three more intentions.</h2></div>
          <div className="related-grid">{related.map((item, index) => <ProductCard key={item.slug} product={item} index={index} />)}</div>
        </div>
      </section>
      
      <RecentlyViewed />
    </SiteLayout>
  );
}
