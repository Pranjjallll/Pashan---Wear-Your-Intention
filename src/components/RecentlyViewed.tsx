import { useRecentlyViewed } from "@/hooks/use-recently-viewed";
import { collections } from "@/data/products";
import { ProductCard } from "./ProductCard";
import { motion } from "framer-motion";

export const RecentlyViewed = () => {
  const { recentlyViewed } = useRecentlyViewed();
  const products = recentlyViewed
    .map((slug) => collections.find((c) => c.slug === slug))
    .filter((p) => p !== undefined);

  if (products.length === 0) return null;

  return (
    <section className="py-24 container-luxe">
      <h2 className="text-5xl font-serif mb-12">Recently Viewed</h2>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="grid md:grid-cols-4 gap-6"
      >
        {products.map((product, index) => (
          <ProductCard key={product!.slug} product={product!} index={index} />
        ))}
      </motion.div>
    </section>
  );
};
