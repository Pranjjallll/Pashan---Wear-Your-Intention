import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { Reveal } from "@/components/Reveal";
import { PeacockGlyph } from "@/components/BrandMark";
import { intentions, collections } from "@/data/products";
import heroImage from "@/assets/editorial/ritual-ember.jpg";
import ritualGold from "@/assets/editorial/ritual-saffron.jpg";
import { motion } from "framer-motion";
import { RecentlyViewed } from "@/components/RecentlyViewed";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <SiteLayout>
      <Hero />
      <TrustBar />
      <ShopByStone />
      <BestSellers />
      <ShopByIntention />
      <WhyPashan />
      <PackagingSection />
      <JournalSection />
      <RecentlyViewed />
      <NewsletterSection />
    </SiteLayout>
  );
}

function Hero() {
  return (
    <section className="premium-hero">
      <div className="premium-hero-overlay" />
      <motion.img 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        src={heroImage} 
        alt="PASHAN" 
        className="premium-hero-image" 
      />
      <div className="container-luxe premium-hero-inner">
        <div className="premium-hero-copy">
          <motion.h1 
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="text-6xl md:text-8xl font-serif"
          >
            Jewellery That Carries Meaning.
          </motion.h1>
          <motion.p
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            className="text-xl md:text-2xl mt-4"
          >
            Rooted in nature. Aligned in spirit.
          </motion.p>
          <motion.div 
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
            className="hero-actions mt-8 flex gap-4"
          >
            <Link to="/collections" className="btn-gold">Shop Collection</Link>
            <Link to="/find-your-bracelet" className="btn-outline-light">Find Your Stone</Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function TrustBar() {
  const items = ["Natural Stones", "Authenticity Certificate", "Complimentary Ganga Jal", "Handmade in India", "Secure Checkout"];
  return (
    <section className="bg-surface py-8 border-y border-border">
      <div className="container-luxe flex justify-between flex-wrap gap-4 text-sm text-gold-soft">
        {items.map(item => (
          <div key={item} className="flex items-center gap-2">
            <span>✦</span> {item}
          </div>
        ))}
      </div>
    </section>
  );
}

function ShopByStone() {
  const stones = [
    { name: "Tiger Eye", slug: "tiger-eye" },
    { name: "Pyrite", slug: "pyrite" },
    { name: "Amethyst", slug: "amethyst" },
    { name: "Green Quartz", slug: "green-quartz" }
  ];

  return (
    <section className="py-24 container-luxe">
      <h2 className="text-5xl font-serif mb-12">Shop by Stone</h2>
      <div className="grid md:grid-cols-4 gap-6">
        {stones.map(stone => {
          const product = collections.find(c => c.slug === stone.slug);
          return (
            <motion.div 
              key={stone.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <Link to="/products/$slug" params={{ slug: stone.slug }} className="group cursor-pointer block">
                <div className="aspect-[3/4] bg-surface rounded-lg mb-4 overflow-hidden">
                   <motion.img 
                     whileHover={{ scale: 1.05 }}
                     transition={{ duration: 0.5, ease: "easeOut" }}
                     src={product?.image} 
                     alt={stone.name} 
                     className="w-full h-full object-cover" 
                   />
                </div>
                <h3 className="text-xl font-serif">{stone.name}</h3>
                <p className="text-muted-foreground text-sm mb-2">Shop the {stone.name.toLowerCase()} collection</p>
                <button className="text-gold underline underline-offset-4 text-sm">Shop {stone.name}</button>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

function BestSellers() {
  const products = collections.slice(0, 4); // Take first 4 for best sellers
  return (
    <section className="py-24 container-luxe bg-card rounded-2xl">
      <h2 className="text-5xl font-serif mb-12 text-center">Best Sellers</h2>
      <div className="grid md:grid-cols-4 gap-6">
        {products.map(product => (
          <motion.div 
            key={product.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Link to="/products/$slug" params={{ slug: product.slug }} className="bg-background rounded-xl p-4 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 block">
              <div className="aspect-square bg-surface rounded-lg mb-4 overflow-hidden">
                  <motion.img 
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    src={product.image} 
                    alt={product.title} 
                    className="w-full h-full object-cover" 
                  />
              </div>
              <h3 className="font-serif text-lg">{product.title}</h3>
              <div className="flex justify-between items-center mt-2">
                  <span className="text-gold-soft">${product.price}</span>
                  <button className="btn-gold text-xs px-4 py-2">View</button>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}


function ShopByIntention() {
    return (
        <section className="py-24 container-luxe">
            <h2 className="text-5xl font-serif mb-12">Shop by Intention</h2>
            <div className="grid md:grid-cols-3 gap-6">
                {intentions.slice(0, 3).map(i => (
                    <div key={i.label} className="p-8 bg-surface rounded-xl border border-border">
                        <h3 className="text-2xl font-serif mb-2">{i.label}</h3>
                        <p className="text-muted-foreground text-sm mb-4">Discover stones for {i.label.toLowerCase()}</p>
                        <button className="text-gold">Explore →</button>
                    </div>
                ))}
            </div>
        </section>
    )
}

function WhyPashan() {
    return (
        <section className="py-24 bg-surface">
            <div className="container-luxe grid md:grid-cols-3 gap-8">
                {["Natural Stones", "Authenticity", "Handmade"].map(item => (
                    <div key={item} className="p-6 border border-border rounded-lg">
                        <h3 className="text-lg font-serif mb-2">{item}</h3>
                        <p className="text-sm text-muted-foreground">Premium detail explanation here.</p>
                    </div>
                ))}
            </div>
        </section>
    )
}

function PackagingSection() {
    return (
        <section className="py-24 container-luxe flex items-center gap-12">
            <div className="flex-1 aspect-[4/3] bg-surface rounded-2xl overflow-hidden">
                <img src={ritualGold} alt="Packaging" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
                <h2 className="text-5xl font-serif mb-6">The PASHAN Experience</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                    Designed for gifting and keeping: layered packaging, an authenticity card, stone details, and a considered unboxing that turns arrival into a small ritual.
                </p>
            </div>
        </section>
    )
}

function JournalSection() {
    return (
        <section className="py-24 container-luxe">
             <h2 className="text-5xl font-serif mb-12">From the Journal</h2>
             <div className="grid md:grid-cols-3 gap-8">
                {[1,2,3].map(i => (
                    <div key={i} className="border border-border rounded-lg p-6">
                        <div className="h-48 bg-surface rounded-md mb-4" />
                        <h3 className="font-serif text-xl">Journal Title</h3>
                    </div>
                ))}
             </div>
        </section>
    )
}

function NewsletterSection() {
    return (
        <section className="py-24 bg-card text-center">
            <div className="container-luxe max-w-xl">
                <h2 className="text-4xl font-serif mb-6">Join the Circle</h2>
                <p className="text-muted-foreground mb-8">Occasional correspondence, thoughtfully sent.</p>
                <div className="flex border-b border-border">
                    <input type="email" placeholder="Your email address" className="bg-transparent flex-1 p-4" />
                    <button className="text-gold px-4">Join →</button>
                </div>
            </div>
        </section>
    )
}
