import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { rashiGuide, collections } from "@/data/products";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/rashi")({
  head: () => ({
    meta: [
      { title: "Shop by Rashi — PASHAN" },
      { name: "description", content: "An interactive guide to traditional gemstone associations by zodiac sign." },
    ],
  }),
  component: RashiPage,
});

function RashiPage() {
  return (
    <SiteLayout>
      <section className="container-luxe pt-32 pb-16">
        <Reveal>
          <div className="eyebrow">Shop by Rashi</div>
          <h1 className="mt-5 font-serif text-[clamp(2.5rem,6vw,5rem)] leading-[1.02]">
            Traditional <span className="italic text-[color:var(--gold)]">Associations.</span>
          </h1>
          <p className="mt-6 text-xl text-[color:var(--muted-foreground)] max-w-2xl">
            Choose your sign to find the gemstones traditionally associated with your temperament and aspirations.
          </p>
        </Reveal>
      </section>

      <section className="container-luxe pb-32">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rashiGuide.map((r, index) => {
            const recommended = collections.filter((product) =>
              r.stones.split(", ").some((stone) => product.stone.includes(stone))
            );
            
            return (
              <Reveal key={r.sign} staggerIndex={index}>
                <div className="border border-[color:var(--border)] p-8 h-full flex flex-col bg-[color:var(--surface)]/50 hover:border-[color:var(--gold-soft)] transition-colors">
                  <div className="font-serif text-3xl mb-4 text-[color:var(--gold)]">{r.sign}</div>
                  <div className="text-sm uppercase tracking-widest text-[color:var(--muted-foreground)] mb-6">{r.stones}</div>
                  <p className="text-[color:var(--muted-foreground)] leading-relaxed mb-8 flex-grow">{r.note}</p>
                  
                  <div className="space-y-3">
                    {recommended.map(product => (
                      <Link 
                        key={product.slug} 
                        to="/products/$slug" 
                        params={{ slug: product.slug }}
                        className="block w-full text-center border border-[color:var(--border)] py-3 text-xs tracking-widest uppercase hover:border-[color:var(--gold)] transition-colors"
                      >
                        Explore {product.stone}
                      </Link>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>
    </SiteLayout>
  );
}
