import { Buffer } from "node:buffer";
import { createHmac, randomUUID, timingSafeEqual } from "node:crypto";

import { collections } from "@/data/products";

const CURRENCY = "INR";
const RAZORPAY_ORDERS_URL = "https://api.razorpay.com/v1/orders";
const MINIMUM_INR_SUBUNITS = 100;
const MAX_QTY_PER_LINE = 20;

export interface CheckoutLineInput {
  slug: string;
  qty: number;
}

export interface CheckoutCustomerInput {
  name?: string;
  email?: string;
  contact?: string;
}

export interface CreateRazorpayOrderInput {
  lines: CheckoutLineInput[];
  customer?: CheckoutCustomerInput;
}

export interface VerifyRazorpayPaymentInput {
  orderId: string;
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface RazorpayOrderResponse {
  id: string;
  amount: number;
  currency: string;
}

interface TrustedCheckoutItem {
  slug: string;
  name: string;
  stone: string;
  qty: number;
  unitAmount: number;
  lineAmount: number;
}

const productBySlug = new Map(
  collections.map((product) => [product.slug, product]),
);

function getRazorpayKeys() {
  /**
   * Render environment variables:
   * - RAZORPAY_KEY_ID: use rzp_test_xxxxx while testing, then rzp_live_xxxxx for production.
   * - RAZORPAY_KEY_SECRET: private secret from the same Razorpay mode.
   *
   * Never commit real keys and never expose RAZORPAY_KEY_SECRET to client code.
   * Do not prefix these with VITE_; VITE_ variables are browser-visible.
   */
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    throw new Error(
      "Razorpay keys are missing. Add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in your server environment.",
    );
  }

  return { keyId, keySecret };
}

function normalizeCheckoutLines(lines: CheckoutLineInput[]) {
  if (!Array.isArray(lines) || lines.length === 0) {
    throw new Error("Your cart is empty.");
  }

  const merged = new Map<string, number>();

  for (const line of lines) {
    if (!line || typeof line.slug !== "string") {
      throw new Error("Invalid cart item.");
    }

    const qty = Number(line.qty);
    if (!Number.isInteger(qty) || qty < 1 || qty > MAX_QTY_PER_LINE) {
      throw new Error("Invalid item quantity.");
    }

    merged.set(line.slug, (merged.get(line.slug) ?? 0) + qty);
  }

  return [...merged.entries()].map(([slug, qty]) => ({ slug, qty }));
}

function buildTrustedCheckout(lines: CheckoutLineInput[]) {
  const items: TrustedCheckoutItem[] = normalizeCheckoutLines(lines).map(
    ({ slug, qty }) => {
      const product = productBySlug.get(slug);

      if (!product) {
        throw new Error(
          "One of the items in your cart is no longer available.",
        );
      }

      const unitAmount = product.price;
      return {
        slug: product.slug,
        name: product.title,
        stone: product.stone,
        qty,
        unitAmount,
        lineAmount: unitAmount * qty,
      };
    },
  );

  const totalInRupees = items.reduce(
    (total, item) => total + item.lineAmount,
    0,
  );
  const amount = totalInRupees * 100;

  if (!Number.isInteger(amount) || amount < MINIMUM_INR_SUBUNITS) {
    throw new Error("The order amount is invalid.");
  }

  return {
    amount,
    currency: CURRENCY,
    items,
    totalInRupees,
    count: items.reduce((total, item) => total + item.qty, 0),
  };
}

function createBasicAuthHeader(keyId: string, keySecret: string) {
  return `Basic ${Buffer.from(`${keyId}:${keySecret}`, "utf8").toString("base64")}`;
}

function createReceiptId() {
  return `pashan_${Date.now().toString(36)}_${randomUUID().slice(0, 8)}`;
}

function safeCustomer(customer?: CheckoutCustomerInput) {
  return {
    name: customer?.name?.slice(0, 80) ?? "",
    email: customer?.email?.slice(0, 120) ?? "",
    contact: customer?.contact?.slice(0, 30) ?? "",
  };
}

export async function createTrustedRazorpayOrder(
  input: CreateRazorpayOrderInput,
) {
  const { keyId, keySecret } = getRazorpayKeys();
  const checkout = buildTrustedCheckout(input.lines);
  const customer = safeCustomer(input.customer);

  const response = await fetch(RAZORPAY_ORDERS_URL, {
    method: "POST",
    headers: {
      Authorization: createBasicAuthHeader(keyId, keySecret),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: checkout.amount,
      currency: checkout.currency,
      receipt: createReceiptId(),
      notes: {
        brand: "PASHAN",
        source: "website_checkout",
        customer_email: customer.email,
        items: checkout.items
          .map((item) => `${item.slug}x${item.qty}`)
          .join(","),
      },
    }),
  });

  if (!response.ok) {
    throw new Error(
      "Razorpay could not create the payment order. Please try again.",
    );
  }

  const order = (await response.json()) as RazorpayOrderResponse;

  if (
    !order.id ||
    order.amount !== checkout.amount ||
    order.currency !== checkout.currency
  ) {
    throw new Error("Razorpay returned an unexpected order response.");
  }

  return {
    keyId,
    orderId: order.id,
    amount: checkout.amount,
    currency: checkout.currency,
    display: {
      count: checkout.count,
      totalInRupees: checkout.totalInRupees,
      items: checkout.items,
    },
  };
}

export function verifyTrustedRazorpayPayment(
  input: VerifyRazorpayPaymentInput,
) {
  const { keySecret } = getRazorpayKeys();

  if (input.orderId !== input.razorpay_order_id) {
    throw new Error(
      "The Razorpay order id did not match this checkout session.",
    );
  }

  if (
    !/^order_[A-Za-z0-9]+$/.test(input.orderId) ||
    !/^pay_[A-Za-z0-9]+$/.test(input.razorpay_payment_id) ||
    !/^[a-f0-9]{64}$/i.test(input.razorpay_signature)
  ) {
    throw new Error("Razorpay returned an invalid payment response.");
  }

  const generatedSignature = createHmac("sha256", keySecret)
    .update(`${input.orderId}|${input.razorpay_payment_id}`)
    .digest("hex");

  const generated = Buffer.from(generatedSignature, "hex");
  const received = Buffer.from(input.razorpay_signature, "hex");
  const verified =
    generated.length === received.length &&
    timingSafeEqual(generated, received);

  if (!verified) {
    throw new Error(
      "Payment verification failed. The order has not been confirmed.",
    );
  }

  return {
    verified: true,
    paymentId: input.razorpay_payment_id,
    orderId: input.orderId,
  };
}
