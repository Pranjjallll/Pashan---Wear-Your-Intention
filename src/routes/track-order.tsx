import { createFileRoute, Link } from "@tanstack/react-router";
import {
  CheckCircle2,
  MapPin,
  MessageCircle,
  PackageCheck,
  Search,
  Truck,
} from "lucide-react";
import { useState, type FormEvent } from "react";
import { SiteLayout } from "@/components/SiteLayout";

const WHATSAPP_NUMBER = "447767956428";

export const Route = createFileRoute("/track-order")({
  head: () => ({
    meta: [
      { title: "Track Your Order — PASHAN" },
      {
        name: "description",
        content:
          "Enter your PASHAN order or tracking number and get help with the latest delivery update.",
      },
      { property: "og:title", content: "Track Your Order — PASHAN" },
    ],
  }),
  component: TrackOrderPage,
});

function TrackOrderPage() {
  const [reference, setReference] = useState("");
  const [submittedReference, setSubmittedReference] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmittedReference(reference.trim().toUpperCase());
  };

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Namaste Pashan, please help me check order or tracking reference ${submittedReference || reference.trim()}.`,
  )}`;

  return (
    <SiteLayout>
      <section className="tracking-page">
        <div className="container-luxe tracking-hero">
          <div className="tracking-intro">
            <span className="eyebrow">Delivery support</span>
            <h1>
              Track your order.
              <br />
              <em>Stay in the loop.</em>
            </h1>
            <p>
              Enter the order number from your confirmation message or the
              tracking number shared after dispatch.
            </p>

            <form className="tracking-form" onSubmit={handleSubmit}>
              <label htmlFor="tracking-reference">
                Order or tracking number
              </label>
              <div>
                <input
                  id="tracking-reference"
                  value={reference}
                  onChange={(event) => setReference(event.target.value)}
                  placeholder="For example: PSH-2026-1042"
                  minLength={5}
                  maxLength={40}
                  pattern="[A-Za-z0-9-]+"
                  title="Use letters, numbers, and hyphens only"
                  autoComplete="off"
                  required
                />
                <button type="submit">
                  <Search aria-hidden size={18} />
                  Check update
                </button>
              </div>
            </form>
          </div>

          <div className="tracking-journey" aria-hidden>
            <div className="tracking-orbit" />
            <div className="tracking-node is-packed">
              <PackageCheck size={28} />
              <span>Packed with care</span>
            </div>
            <div className="tracking-route">
              <i />
              <span className="tracking-moving-truck">
                <Truck size={31} />
              </span>
            </div>
            <div className="tracking-node is-arrival">
              <MapPin size={28} />
              <span>On its way to you</span>
            </div>
          </div>
        </div>

        <div className="container-luxe tracking-support-band">
          {submittedReference ? (
            <div className="tracking-result" aria-live="polite">
              <CheckCircle2 aria-hidden size={28} />
              <div>
                <span>Reference received</span>
                <h2>{submittedReference}</h2>
                <p>
                  Live courier tracking is being prepared while we confirm our
                  delivery partner. Our support team can check the latest update
                  for you now.
                </p>
              </div>
              <a href={whatsappUrl} target="_blank" rel="noreferrer">
                <MessageCircle aria-hidden size={18} />
                Ask our team on WhatsApp
              </a>
            </div>
          ) : (
            <div className="tracking-help-copy">
              <span>Need a person?</span>
              <p>
                We stay available after your order is placed. Reach out with
                your name or order number and our team will help.
              </p>
              <Link to="/contact">Contact customer support</Link>
            </div>
          )}
        </div>

        <div className="container-luxe tracking-steps">
          {[
            [
              "01",
              "Order confirmed",
              "We confirm your bracelet and delivery details.",
            ],
            [
              "02",
              "Prepared with care",
              "Your bracelet and presentation are checked before dispatch.",
            ],
            [
              "03",
              "Tracking shared",
              "We send the courier reference as soon as the parcel is collected.",
            ],
            [
              "04",
              "Support until arrival",
              "Questions on the way? Our team remains easy to reach.",
            ],
          ].map(([number, title, copy]) => (
            <div key={number}>
              <span>{number}</span>
              <h2>{title}</h2>
              <p>{copy}</p>
            </div>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
