import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Concierge — PASHAN" },
      { name: "description", content: "PASHAN Concierge — quiet, considered, and direct support from the atelier." },
      { property: "og:title", content: "Concierge — PASHAN" },
      { property: "og:description", content: "Speak with the PASHAN atelier." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <SiteLayout>
      <section className="container-luxe pt-16 pb-12">
        <div className="max-w-3xl">
          <div className="eyebrow">Concierge</div>
          <h1 className="mt-5 font-serif text-[clamp(2.5rem,6vw,5rem)] leading-[1.02]">
            Speak with the <span className="italic text-[color:var(--gold)]">atelier.</span>
          </h1>
          <p className="mt-8 text-lg text-[color:var(--muted-foreground)] leading-relaxed max-w-xl">
            For sizing, gifting, custom orders, or anything else — write to us. Replies
            are sent personally and considered.
          </p>
        </div>
      </section>

      <section className="container-luxe pb-32">
        <div className="grid gap-16 md:grid-cols-[1fr_1.4fr] md:gap-20">
          <div className="space-y-8">
            <div>
              <div className="eyebrow">Email</div>
              <a href="mailto:atelier@pashan.house" className="block mt-2 text-lg hover:text-[color:var(--gold)]">atelier@pashan.house</a>
            </div>
            <div>
              <div className="eyebrow">Concierge Hours</div>
              <p className="mt-2 text-[color:var(--muted-foreground)]">Mon — Sat · 09:00 — 19:00 IST</p>
            </div>
            <div>
              <div className="eyebrow">Atelier</div>
              <p className="mt-2 text-[color:var(--muted-foreground)]">By appointment only.</p>
            </div>
            <div>
              <div className="eyebrow">Shipping & Returns</div>
              <p className="mt-2 text-[color:var(--muted-foreground)] leading-relaxed">
                Complimentary worldwide concierge shipping. Returns accepted within 14 days
                on unworn pieces, in original presentation.
              </p>
            </div>
          </div>

          <form
            onSubmit={(e) => { e.preventDefault(); setSent(true); }}
            className="space-y-5 border border-[color:var(--border)] bg-[color:var(--surface)] p-8 md:p-12"
          >
            <div className="eyebrow">Write to the atelier</div>
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Your name" name="name" />
              <Field label="Email" name="email" type="email" />
            </div>
            <Field label="Subject" name="subject" />
            <div>
              <label className="block eyebrow mb-2">Message</label>
              <textarea required rows={6} className="w-full bg-transparent border border-[color:var(--border)] px-4 py-3 text-sm focus:border-[color:var(--gold)] outline-none" />
            </div>
            <button type="submit" className="btn-gold w-full">Send Message</button>
            {sent && <p className="text-sm text-[color:var(--gold)] mt-2">Thank you — we will reply personally.</p>}
          </form>
        </div>
      </section>
    </SiteLayout>
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