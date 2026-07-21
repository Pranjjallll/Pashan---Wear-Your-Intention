import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { journal } from "@/data/products";
import atmosphere from "@/assets/atmosphere.jpg";
import craft from "@/assets/craft.jpg";
import hero from "@/assets/hero.jpg";

export const Route = createFileRoute("/journal")({
  head: () => ({
    meta: [
      { title: "The Journal — PASHAN" },
      {
        name: "description",
        content:
          "Luxury editorial writing on confidence, leadership, focus, and the wisdom of natural stone.",
      },
      { property: "og:title", content: "The Journal — PASHAN" },
      {
        property: "og:description",
        content: "Stories and practical guidance from the PASHAN team.",
      },
    ],
  }),
  component: JournalPage,
});

const covers = [hero, craft, atmosphere];

function JournalPage() {
  return (
    <SiteLayout>
      <section className="container-luxe pt-16 pb-12">
        <div className="max-w-3xl">
          <div className="eyebrow">The Journal</div>
          <h1 className="mt-5 font-serif text-[clamp(2.5rem,6vw,5rem)] leading-[1.02]">
            Considered writing.
            <br />
            <span className="italic text-[color:var(--gold)]">
              Quiet thinking.
            </span>
          </h1>
        </div>
      </section>

      <section className="container-luxe pb-12">
        <a
          href="#"
          className="group grid gap-10 lg:grid-cols-2 lg:gap-16 border-t border-[color:var(--border)] pt-12"
        >
          <div className="relative aspect-[5/4] overflow-hidden bg-[color:var(--surface)]">
            <img
              src={covers[0]}
              alt=""
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1500ms] group-hover:scale-105"
            />
          </div>
          <div className="lg:py-8">
            <div className="text-[0.65rem] uppercase tracking-[0.28em] text-[color:var(--gold)]">
              {journal[0].category} · Featured
            </div>
            <h2 className="mt-4 font-serif text-[clamp(2rem,4vw,3.25rem)] leading-tight group-hover:text-[color:var(--gold)] transition-colors">
              {journal[0].title}
            </h2>
            <p className="mt-6 text-[color:var(--muted-foreground)] leading-relaxed max-w-xl">
              {journal[0].excerpt}
            </p>
            <div className="mt-8 text-[0.7rem] uppercase tracking-[0.24em] text-[color:var(--muted-foreground)]">
              Read the entry →
            </div>
          </div>
        </a>
      </section>

      <section className="container-luxe pb-32">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {journal.slice(1).map((j, i) => (
            <a
              href="#"
              key={j.slug}
              className="group block border-t border-[color:var(--border)] pt-8"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[color:var(--surface)] mb-6">
                <img
                  src={covers[i % covers.length]}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1500ms] group-hover:scale-105 opacity-90"
                />
              </div>
              <div className="text-[0.65rem] uppercase tracking-[0.28em] text-[color:var(--gold)]">
                {j.category}
              </div>
              <h3 className="mt-3 font-serif text-2xl group-hover:text-[color:var(--gold)] transition-colors">
                {j.title}
              </h3>
              <p className="mt-3 text-sm text-[color:var(--muted-foreground)] leading-relaxed">
                {j.excerpt}
              </p>
            </a>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
