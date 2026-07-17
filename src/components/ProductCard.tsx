import { Link } from "@tanstack/react-router";
import type { Collection } from "@/data/products";
import { formatPrice } from "@/lib/cart";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";

const IncludedItems = () => (
  <div className="w-[260px] p-2">
    <h4 className="text-gold font-serif text-lg mb-3">What's Included</h4>
    <ul className="space-y-2 text-foreground/90 text-sm">
      <li className="flex items-center gap-2">✓ Authenticity Certificate</li>
      <li className="flex items-center gap-2">✓ Complimentary Ganga Jal</li>
      <li className="flex items-center gap-2">✓ Ritual Intention Card</li>
      <li className="flex items-center gap-2">✓ Premium Gift Packaging</li>
    </ul>
  </div>
);

export function ProductCard({ product, index = 0 }: { product: Collection; index?: number }) {
  const isMobile = useIsMobile();
  const ref = useRef<HTMLDivElement>(null);
  const secondary = product.images[1] ?? product.image;

  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);
  const springX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 20 });
  const glow = useMotionTemplate`radial-gradient(200px circle at ${springX}px ${springY}px, rgba(184, 134, 11, 0.06), transparent 80%)`;

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const { left, top } = ref.current.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  }

  const cardContent = (
    <motion.div
      ref={ref}
      onMouseMove={!isMobile ? handleMouseMove : undefined}
      onMouseEnter={() => !isMobile && (mouseX.set(-200), mouseY.set(-200))}
      whileHover={!isMobile ? { y: -4, scale: 1.02, filter: "brightness(103%)" } : undefined}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="product-card group block"
    >
      <Link to="/products/$slug" params={{ slug: product.slug }} className="block">
        <div className="product-card-media relative">
          <img src={product.image} alt={`${product.stone} bracelet`} loading={index < 4 ? "eager" : "lazy"} className="product-card-primary" />
          <img src={secondary} alt="" loading="lazy" aria-hidden className="product-card-secondary" />
          
          <motion.div
            className="absolute inset-0 pointer-events-none z-10 glow-container"
            style={{ background: glow, opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />

          <div className="product-card-shade" />
          <div className="product-card-index">No. {String(index + 1).padStart(2, "0")}</div>
          {product.badge && <div className="product-card-badge">{product.badge}</div>}
          <div className="product-card-view">View piece <span>↗</span></div>
        </div>
        <div className="product-card-copy">
          <div>
            <div className="product-card-collection">{product.name}</div>
            <h3>{product.stone}</h3>
            <p>{product.qualities.slice(0, 3).join(" · ")}</p>
          </div>
          <span className="product-card-price">{formatPrice(product.price)}</span>
        </div>
      </Link>
    </motion.div>
  );

  if (isMobile) {
    return (
      <Drawer>
        <div className="relative">
          {cardContent}
          <DrawerTrigger asChild>
            <button className="absolute bottom-4 right-4 bg-gold/20 text-gold p-2 rounded-full backdrop-blur-sm">
              ℹ
            </button>
          </DrawerTrigger>
        </div>
        <DrawerContent className="p-6">
          <IncludedItems />
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>{cardContent}</TooltipTrigger>
        <TooltipContent side="top" align="center" className="max-w-[260px] p-4">
          <IncludedItems />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
