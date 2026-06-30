import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { formatPrice, useCart } from "@/lib/cart";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — PASHAN" },
      { name: "description", content: "Complete your PASHAN order." },
    ],
  }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { lines, subtotal, count, clear } = useCart();
  const navigate = useNavigate();
  const [placed, setPlaced] = useState(false);

  if (lines.length === 0 && !placed) {
    return (
      <SiteLayout>
        <section className="container-luxe py-32 text-center">
          <div className="eyebrow">Checkout</div>
          <h1 className="mt-4 font-serif text-3xl">There is nothing to check out.</h1>
          <Link to="/collections" className="btn-gold mt-8 inline-flex">Browse Collections</Link>
        </section>
      </SiteLayout>
    );
  }

  if (placed) {
    return (
      <SiteLayout>
        <section className="container-luxe py-32 text-center max-w-2xl mx-auto">
          <div className="eyebrow">Order Received</div>
          <h1 className="mt-5 font-serif text-[clamp(2rem,4vw,3.5rem)]">
            Thank you. <span className="italic text-[color:var(--gold)]">Your piece is being prepared.</span>
          </h1>
          <p className="mt-6 text-[color:var(--muted-foreground)] leading-relaxed">
            A confirmation has been sent to your email. Each PASHAN order is composed by
            hand and dispatched with complimentary worldwide shipping and a bottle of
            Ganga Jal.
          </p>
          <Link to="/" className="btn-ghost mt-10 inline-flex">Return Home</Link>
        </section>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <section className="container-luxe py-16 md:py-24">
        <div className="eyebrow">Checkout</div>
        <h1 className="mt-4 font-serif text-[clamp(2.25rem,5vw,4rem)]">Complete your order.</h1>
      </section>

      <section className="container-luxe pb-32">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setPlaced(true);
            clear();
            void navigate;
          }}
          className="grid gap-16 lg:grid-cols-[1.4fr_1fr] lg:gap-20"
        >
          <div className="space-y-12">
            <Section title="Contact">
              <Field label="Email" name="email" type="email" />
              <Field label="Phone" name="phone" type="tel" />
            </Section>

            <Section title="Shipping">
              <div className="grid gap-5 md:grid-cols-2">
                <Field label="First name" name="first" />
                <Field label="Last name" name="last" />
              </div>
              <Field label="Address" name="address" />
              <div className="grid gap-5 md:grid-cols-3">
                <Field label="City" name="city" />
                <Field label="Postal Code" name="postal" />
                <Field label="Country" name="country" />
              </div>
            </Section>

            <Section title="Payment">
              <div className="border border-[color:var(--border)] bg-[color:var(--surface)] p-5 text-sm text-[color:var(--muted-foreground)]">
                Payment is secured at this stage. Card details, Apple Pay, and bank
                transfer will be presented by our concierge partner.
              </div>
              <Field label="Cardholder name" name="card-name" />
              <Field label="Card number" name="card-number" />
              <div className="grid gap-5 md:grid-cols-2">
                <Field label="Expiry (MM/YY)" name="exp" />
                <Field label="CVC" name="cvc" />
              </div>
            </Section>

            <button type="submit" className="btn-gold w-full">Place Order · {formatPrice(subtotal)}</button>
            <p className="text-xs text-[color:var(--muted-foreground)] text-center">
              By placing your order you agree to PASHAN's terms. Your data is handled with
              discretion.
            </p>
          </div>

          <aside className="self-start border border-[color:var(--border)] bg-[color:var(--surface)] p-8">
            <div className="eyebrow">Order Summary</div>
            <ul className="mt-6 divide-y divide-[color:var(--border)]">
              {lines.map((l) => (
                <li key={l.slug} className="flex gap-4 py-4">
                  <img src={l.image} alt={l.name} className="h-20 w-20 object-cover" loading="lazy" />
                  <div className="flex-1">
                    <div className="text-[0.65rem] uppercase tracking-[0.24em] text-[color:var(--gold)]">{l.stone}</div>
                    <div className="font-serif text-base mt-1">{l.name}</div>
                    <div className="text-xs text-[color:var(--muted-foreground)] mt-1">Qty {l.qty}</div>
                  </div>
                  <div className="text-sm">{formatPrice(l.price * l.qty)}</div>
                </li>
              ))}
            </ul>
            <div className="mt-6 space-y-2 text-sm">
              <Row label={`Subtotal · ${count} ${count === 1 ? "piece" : "pieces"}`} value={formatPrice(subtotal)} />
              <Row label="Concierge Shipping" value="Complimentary" gold />
              <Row label="Ganga Jal Inclusion" value="Included" gold />
              <Row label="Stone story & intention cards" value="Included" gold />
            </div>
            <div className="hairline my-6" />
            <div className="flex justify-between items-baseline">
              <span className="eyebrow">Total</span>
              <span className="font-serif text-2xl">{formatPrice(subtotal)}</span>
            </div>
            <div className="mt-6 border border-[color:var(--border)] p-4 text-xs text-[color:var(--muted-foreground)] leading-relaxed">
              Every order arrives with the PASHAN presentation suite — premium packaging, a
              stone story card, an intention card, and a complimentary bottle of Ganga Jal.
            </div>
          </aside>
        </form>
      </section>
    </SiteLayout>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-4">
        <div className="eyebrow">{title}</div>
        <div className="flex-1 h-px bg-[color:var(--border)]" />
      </div>
      {children}
    </div>
  );
}

function Field({ label, name, type = "text" }: { label: string; name: string; type?: string }) {
  return (
    <div>
      <label htmlFor={name} className="block eyebrow mb-2">{label}</label>
      <input id={name} name={name} type={type} required className="w-full bg-transparent border border-[color:var(--border)] px-4 py-3 text-sm focus:border-[color:var(--gold)] outline-none" />
    </div>
  );
}

function Row({ label, value, gold }: { label: string; value: string; gold?: boolean }) {
  return (
    <div className="flex justify-between">
      <span className="text-[color:var(--muted-foreground)]">{label}</span>
      <span className={gold ? "text-[color:var(--gold)]" : ""}>{value}</span>
    </div>
  );
}