import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
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
  const [selected, setSelected] = useState(rashiGuide[0]);

  // Find recommended products based on the Rashi's associated stones
  const recommendations = collections.filter((product) =>
    selected.stones.split(", ").some((stone) => product.stone.includes(stone))
  );

  return (
    <SiteLayout>
      <section className="container-luxe pt-32 pb-16">
        <Reveal>
          <div className="eyebrow">Shop by Rashi</div>
          <h1 className="mt-5 font-serif text-[clamp(2.5rem,6vw,5rem)] leading-[1.02]">
            Traditional <span className="italic text-[color:var(--gold)]">Associations.</span>
          </h1>
        </Reveal>
      </section>

      <section className="container-luxe pb-32">
        <div className="grid lg:grid-cols-[280px_1fr] gap-16 lg:gap-24 items-start">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-1 gap-3">
            {rashiGuide.map((r, index) => (
              <button
                key={r.sign}
                onClick={() => setSelected(r)}
                className={`p-6 border text-left transition-all duration-500 ease-out group relative overflow-hidden ${
                  selected.sign === r.sign 
                    ? "border-[color:var(--gold)] bg-[color:var(--surface)]" 
                    : "border-[color:var(--border)] hover:border-[color:var(--gold-soft)] hover:bg-[color:var(--surface)]/50"
                }`}
              >
                <span className={`relative z-10 transition-colors duration-300 font-serif text-lg ${selected.sign === r.sign ? "text-[color:var(--gold)]" : "group-hover:text-[color:var(--gold-soft)]"}`}>
                  {r.sign}
                </span>
              </button>
            ))}
          </div>

          <div className="min-h-[500px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={selected.sign}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <div className="eyebrow tracking-[0.4em] mb-4">{selected.sign}</div>
                <h2 className="font-serif text-5xl md:text-6xl text-[color:var(--gold-soft)] mb-8">{selected.stones}</h2>
                <p className="text-xl text-[color:var(--foreground)] leading-relaxed opacity-90 max-w-2xl mb-12">{selected.note}</p>
                
                <div className="grid md:grid-cols-2 gap-8">
                  {recommendations.map((product, index) => (
                    <Reveal key={product.slug} staggerIndex={index}>
                      <div className="bg-[color:var(--surface)] border border-[color:var(--border)] p-6 group">
                        <div className="aspect-square overflow-hidden mb-6 bg-[color:var(--background)]">
                          <img src={product.image} alt={product.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        </div>
                        <h3 className="font-serif text-2xl mb-2">{product.stone}</h3>
                        <p className="text-[color:var(--muted-foreground)] text-sm mb-4">{product.subtitle}</p>
                        <p className="text-xs italic mb-8 opacity-80">Traditionally recommended for {selected.sign} due to its energy of {product.qualities[0].toLowerCase()}.</p>
                        
                        <div className="flex flex-col gap-3">
                          <Link to="/products/$slug" params={{ slug: product.slug }} className="w-full text-center border border-[color:var(--border)] py-3 text-xs tracking-widest uppercase hover:border-[color:var(--gold)] transition-colors">
                            View Bracelet
                          </Link>
                          <Link to="/checkout" className="w-full text-center bg-[color:var(--gold)] text-[color:var(--background)] py-3 text-xs tracking-widest uppercase font-semibold hover:bg-[color:var(--gold-soft)] transition-colors">
                            Buy Now
                          </Link>
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
