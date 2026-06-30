import { Link } from "@tanstack/react-router";
import type { Collection } from "@/data/products";
import { formatPrice } from "@/lib/cart";

export function ProductCard({ product, index = 0 }: { product: Collection; index?: number }) {
  const secondary = product.images[1] ?? product.image;
  return (
    <Link to="/products/$slug" params={{ slug: product.slug }} className="product-card group">
      <div className="product-card-media">
        <img src={product.image} alt={`${product.stone} bracelet`} loading={index < 4 ? "eager" : "lazy"} className="product-card-primary" />
        <img src={secondary} alt="" loading="lazy" aria-hidden className="product-card-secondary" />
        <div className="product-card-shade" />
        <div className="product-card-index">No. {String(index + 1).padStart(2, "0")}</div>
        {product.badge && <div className="product-card-badge">{product.badge}</div>}
        <div className="product-card-view">View piece <span>↗</span></div>
      </div>
      <div className="product-card-copy">
        <div>
          <div className="product-card-collection">{product.name}</div>
          <h3>{product.stone}</h3>
          <p>{product.qualities.slice(0, 3).join(" · ")}</p>
        </div>
        <span className="product-card-price">{formatPrice(product.price)}</span>
      </div>
    </Link>
  );
}
