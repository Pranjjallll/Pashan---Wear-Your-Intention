import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { SiteLayout } from "@/components/SiteLayout";
import { rashiGuide } from "@/data/products";

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

  return (
    <SiteLayout>
      <section className="container-luxe pt-20 pb-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <div className="eyebrow">Shop by Rashi</div>
          <h1 className="mt-5 font-serif text-[clamp(2.5rem,6vw,5rem)] leading-[1.02]">
            Traditional <span className="italic text-[color:var(--gold)]">Associations.</span>
          </h1>
        </motion.div>
      </section>

      <section className="container-luxe pb-32">
        <div className="grid lg:grid-cols-[1fr_1.8fr] gap-16 lg:gap-24 items-start">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-3"
          >
            {rashiGuide.map((r) => (
              <button
                key={r.sign}
                onClick={() => setSelected(r)}
                className={`p-6 border text-left transition-all duration-500 ease-out group relative overflow-hidden ${
                  selected.sign === r.sign 
                    ? "border-[color:var(--gold)] bg-[color:var(--surface)]" 
                    : "border-[color:var(--border)] hover:border-[color:var(--gold-soft)] hover:bg-[color:var(--surface)]/50"
                }`}
              >
                <span className="font-serif text-lg relative z-10 transition-colors duration-300 group-hover:text-[color:var(--gold)]">
                  {r.sign}
                </span>
                <div className={`absolute bottom-0 left-0 h-[1px] bg-[color:var(--gold)] transition-all duration-500 ${selected.sign === r.sign ? "w-full" : "w-0 group-hover:w-full"}`} />
              </button>
            ))}
          </motion.div>

          <div className="bg-[color:var(--surface)]/50 p-12 md:p-16 min-h-[450px] relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={selected.sign}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <div className="eyebrow tracking-[0.4em]">{selected.sign}</div>
                <h2 className="mt-6 font-serif text-5xl md:text-6xl text-[color:var(--gold-soft)]">{selected.stones}</h2>
                <div className="w-24 h-[1px] bg-[color:var(--gold)] my-10" />
                <p className="text-xl text-[color:var(--foreground)] leading-relaxed opacity-90">{selected.note}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
