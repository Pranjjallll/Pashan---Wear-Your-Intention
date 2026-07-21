export const WELCOME_OFFER_CODE = "PASHAN10";
export const BASKET_OFFER_CODE = "PASHAN200";
export const BASKET_OFFER_MINIMUM = 3500;
export const BASKET_OFFER_DISCOUNT = 200;

export type OfferCode = typeof WELCOME_OFFER_CODE | typeof BASKET_OFFER_CODE;

export function normalizeOfferCode(value?: string | null): OfferCode | null {
  const code = value?.trim().toUpperCase();
  if (code === WELCOME_OFFER_CODE || code === BASKET_OFFER_CODE) return code;
  return null;
}

export function calculateOfferDiscount(
  subtotal: number,
  offerCode?: string | null,
) {
  const code = normalizeOfferCode(offerCode);
  if (code === WELCOME_OFFER_CODE) return Math.round(subtotal * 0.1);
  if (code === BASKET_OFFER_CODE && subtotal >= BASKET_OFFER_MINIMUM) {
    return BASKET_OFFER_DISCOUNT;
  }
  return 0;
}
