import { createServerFn } from "@tanstack/react-start";

import {
  createTrustedRazorpayOrder,
  verifyTrustedRazorpayPayment,
  type CreateRazorpayOrderInput,
  type VerifyRazorpayPaymentInput,
} from "./razorpay.server";

export const createRazorpayOrder = createServerFn({ method: "POST" })
  .validator((data: CreateRazorpayOrderInput) => {
    if (!data || !Array.isArray(data.lines)) {
      throw new Error("Invalid checkout cart.");
    }

    return {
      lines: data.lines.map((line) => ({
        slug: String(line.slug),
        qty: Number(line.qty),
      })),
      customer: data.customer,
    };
  })
  .handler(async ({ data }) => createTrustedRazorpayOrder(data));

export const verifyRazorpayPayment = createServerFn({ method: "POST" })
  .validator((data: VerifyRazorpayPaymentInput) => {
    if (!data) {
      throw new Error("Missing Razorpay payment response.");
    }

    return {
      orderId: String(data.orderId),
      razorpay_payment_id: String(data.razorpay_payment_id),
      razorpay_order_id: String(data.razorpay_order_id),
      razorpay_signature: String(data.razorpay_signature),
    };
  })
  .handler(async ({ data }) => verifyTrustedRazorpayPayment(data));
