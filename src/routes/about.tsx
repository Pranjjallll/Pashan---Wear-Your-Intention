import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import atmosphere from "@/assets/atmosphere.jpg";
import craft from "@/assets/craft.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "The House — PASHAN" },
      { name: "description", content: "PASHAN is a luxury house creating handcrafted natural gemstone bracelets — wearable symbols of intention." },
      { property: "og:title", content: "The House — PASHAN" },
      { property: "og:description", content: "The philosophy behind PASHAN — intention as a wearable practice." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <SiteLayout>
      <section className="relative h-[70vh] min-h-[480px] overflow-hidden">
        <img src={atmosphere} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-[color:var(--background)]/30 to-[color:var(--background)]" />
        <div className="relative z-10 container-luxe flex h-full items-end pb-16">
          <div>
            <div className="eyebrow">The House</div>
            <h1 className="mt-4 font-serif text-[clamp(2.5rem,6vw,5rem)] leading-[1.02] max-w-3xl">
              We craft <span className="italic text-[color:var(--gold)]">symbols.</span> Not jewelry.
            </h1>
          </div>
        </div>
      </section>

      <section className="container-luxe py-28 grid gap-16 md:grid-cols-[1fr_2fr] md:gap-24">
        <div className="eyebrow">Philosophy</div>
        <div className="space-y-6 text-lg text-[color:var(--muted-foreground)] leading-relaxed max-w-2xl">
          <p>
            PASHAN began with a quiet observation. People do not buy bracelets. People
            choose objects that mean something — small, private declarations of who they
            are becoming.
          </p>
          <p>
            For centuries, natural stones have been associated with the qualities people
            most aspire to embody — confidence, prosperity, focus, balance, resilience.
            These associations are older than commerce, older than language. PASHAN
            honours that lineage, with the restraint and craft a luxury house demands.
          </p>
          <p>
            We make no medical claims. We make no supernatural promises. What we offer is
            simpler and, we believe, more enduring: a quietly considered object that
            carries meaning. A wearable reminder of intention.
          </p>
        </div>
      </section>

      <section className="bg-[color:var(--surface)] py-28">
        <div className="container-luxe grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
          <div className="relative aspect-[4/5] overflow-hidden">
            <img src={craft} alt="Atelier craftsmanship" className="absolute inset-0 h-full w-full object-cover" />
          </div>
          <div>
            <div className="eyebrow">Atelier</div>
            <h2 className="mt-4 font-serif text-[clamp(2rem,4vw,3.25rem)] leading-tight">
              Considered. Composed. <span className="italic text-[color:var(--gold)]">Unhurried.</span>
            </h2>
            <p className="mt-6 text-[color:var(--muted-foreground)] leading-relaxed">
              Every PASHAN piece is composed by hand in small numbers. Stones are chosen
              for natural quality. Finishing is done with the patience luxury work
              requires. We do not pursue scale. We pursue the standard.
            </p>
            <div className="mt-10 grid grid-cols-2 gap-8">
              {[
                ["Natural", "Every stone, sourced for character."],
                ["Handmade", "Composed bead by bead."],
                ["Considered", "Designed, not assembled."],
                ["Enduring", "Built to be kept, not replaced."],
              ].map(([t, s]) => (
                <div key={t}>
                  <div className="font-serif text-2xl text-[color:var(--gold)]">{t}</div>
                  <div className="mt-2 text-sm text-[color:var(--muted-foreground)]">{s}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container-luxe py-28 text-center">
        <div className="eyebrow">An Invitation</div>
        <h2 className="mt-4 font-serif text-[clamp(2rem,4vw,3.25rem)] max-w-2xl mx-auto">
          Wear the quality you wish to become.
        </h2>
        <Link to="/collections" className="btn-gold mt-10 inline-flex">Explore Collections</Link>
      </section>
    </SiteLayout>
  );
}