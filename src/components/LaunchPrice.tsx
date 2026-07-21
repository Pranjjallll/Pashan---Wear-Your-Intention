import { formatPrice } from "@/lib/cart";

export function LaunchPrice({
  price,
  compareAtPrice,
  compact = false,
}: {
  price: number;
  compareAtPrice?: number;
  compact?: boolean;
}) {
  const saving = Math.max(0, (compareAtPrice ?? price) - price);

  return (
    <div className={`launch-price ${compact ? "is-compact" : ""}`}>
      <strong>{formatPrice(price)}</strong>
      {compareAtPrice && compareAtPrice > price ? (
        <>
          <del>{formatPrice(compareAtPrice)}</del>
          <span>Save {formatPrice(saving)}</span>
        </>
      ) : null}
    </div>
  );
}
