import { Check, Tag, X } from "lucide-react";
import { useState, type FormEvent } from "react";
import { formatPrice, useCart } from "@/lib/cart";
import { BASKET_OFFER_CODE, BASKET_OFFER_MINIMUM } from "@/lib/offers";

export function OfferCodeEntry({ compact = false }: { compact?: boolean }) {
  const { subtotal, discount, offerCode, applyOffer, clearOffer } = useCart();
  const [value, setValue] = useState("");
  const [message, setMessage] = useState("");

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = applyOffer(value);
    setMessage(result.message);
    if (result.success) setValue("");
  };

  const remaining = Math.max(0, BASKET_OFFER_MINIMUM - subtotal);

  return (
    <div className={`offer-entry ${compact ? "is-compact" : ""}`}>
      {offerCode ? (
        <div className="offer-entry-active">
          <Check aria-hidden size={16} />
          <div>
            <b>{offerCode}</b>
            <span>
              {discount > 0
                ? `${formatPrice(discount)} saved`
                : offerCode === BASKET_OFFER_CODE
                  ? `Add ${formatPrice(remaining)} more to unlock ₹200 off`
                  : "Offer active"}
            </span>
          </div>
          <button
            type="button"
            onClick={clearOffer}
            aria-label={`Remove offer ${offerCode}`}
            title="Remove offer"
          >
            <X aria-hidden size={15} />
          </button>
        </div>
      ) : (
        <form onSubmit={submit}>
          <label htmlFor={compact ? "drawer-offer" : "cart-offer"}>
            <Tag aria-hidden size={15} /> Offer code
          </label>
          <div>
            <input
              id={compact ? "drawer-offer" : "cart-offer"}
              value={value}
              onChange={(event) => setValue(event.target.value)}
              placeholder="PASHAN10 or PASHAN200"
              autoCapitalize="characters"
              required
            />
            <button type="submit">Apply</button>
          </div>
          {message ? <p role="status">{message}</p> : null}
        </form>
      )}
    </div>
  );
}
