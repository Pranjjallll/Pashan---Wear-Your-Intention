import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { collections, intentions, getCollection } from "@/data/products";

export const Route = createFileRoute("/find-your-bracelet")({
  head: () => ({
    meta: [
      { title: "Find Your Bracelet — PASHAN" },
      { name: "description", content: "A guided experience to discover the PASHAN collection aligned to the quality you seek." },
      { property: "og:title", content: "Find Your Bracelet — PASHAN" },
      { property: "og:description", content: "Tell us what you are seeking. We will recommend the right collection." },
    ],
  }),
  component: FindPage,
});

function FindPage() {
  const [choice, setChoice] = useState<string | null>(null);
  const recommended = choice ? getCollection(intentions.find((i) => i.key === choice)!.slug) : null;
  const alts = recommended ? collections.filter((c) => c.slug !== recommended.slug).slice(0, 2) : [];

  return (
    <SiteLayout>
      <section className="container-luxe py-20 md:py-28">
        <div className="text-center max-w-2xl mx-auto">
          <div className="eyebrow">The Concierge</div>
          <h1 className="mt-5 font-serif text-[clamp(2.25rem,5vw,4rem)] leading-[1.05]">
            What are you seeking <span className="italic text-[color:var(--gold)]">to embody?</span>
          </h1>
          <p className="mt-6 text-[color:var(--muted-foreground)] leading-relaxed">
            Choose the quality most present in your life right now. We will suggest the
            collection most aligned to it.
          </p>
        </div>

        <div className="mt-14 grid gap-px bg-[color:var(--border)] sm:grid-cols-2 lg:grid-cols-3">
          {intentions.map((i) => {
            const active = choice === i.key;
            return (
              <button
                key={i.key}
                onClick={() => setChoice(i.key)}
                className={`relative text-left bg-[color:var(--background)] p-8 md:p-10 transition-colors duration-500 ${
                  active ? "bg-[color:var(--elevated)]" : "hover:bg-[color:var(--surface)]"
                }`}
              >
                <div className={`eyebrow ${active ? "" : "opacity-60"}`}>I am seeking</div>
                <div className="mt-4 font-serif text-3xl">{i.label}</div>
                {active && <div className="mt-6 text-[0.7rem] uppercase tracking-[0.24em] text-[color:var(--gold)]">Selected ·</div>}
              </button>
            );
          })}
        </div>

        {recommended && (
          <div className="mt-20 border border-[color:var(--border)] bg-[color:var(--surface)] p-8 md:p-12">
            <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16 items-center">
              <div className="relative aspect-[4/5] overflow-hidden bg-[color:var(--background)]">
                <img src={recommended.image} alt={recommended.stone} className="absolute inset-0 h-full w-full object-cover" />
              </div>
              <div>
                <div className="eyebrow">Recommended</div>
                <h2 className="mt-4 font-serif text-[clamp(2rem,4vw,3.25rem)] leading-tight">
                  {recommended.title}
                </h2>
                <p className="mt-3 text-[color:var(--gold)] italic">{recommended.intention}</p>
                <p className="mt-6 text-[color:var(--muted-foreground)] leading-relaxed">{recommended.story}</p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link to="/collections/$slug" params={{ slug: recommended.slug }} className="btn-gold">
                    View the Collection
                  </Link>
                  <Link to="/products/$slug" params={{ slug: recommended.slug }} className="btn-ghost">
                    Product Details
                  </Link>
                </div>
              </div>
            </div>
            {alts.length > 0 && (
              <div className="mt-12 border-t border-[color:var(--border)] pt-8">
                <div className="eyebrow mb-5">You may also consider</div>
                <div className="grid gap-6 sm:grid-cols-2">
                  {alts.map((a) => (
                    <Link
                      key={a.slug}
                      to="/collections/$slug"
                      params={{ slug: a.slug }}
                      className="flex items-center gap-5 group"
                    >
                      <img src={a.image} alt="" className="h-20 w-20 object-cover" loading="lazy" />
                      <div>
                        <div className="text-[0.65rem] uppercase tracking-[0.24em] text-[color:var(--gold)]">{a.name}</div>
                        <div className="font-serif text-lg mt-1 group-hover:text-[color:var(--gold)] transition-colors">{a.stone}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </section>
    </SiteLayout>
  );
}