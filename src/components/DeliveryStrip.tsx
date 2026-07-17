import { Box, Gem, Droplet } from "lucide-react";
import { motion } from "framer-motion";

export const DeliveryStrip = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="border-t border-[color:var(--border)] mt-6 pt-6"
    >
      <h4 className="text-sm font-serif text-[color:var(--gold)] mb-4 uppercase tracking-widest">Your Ritual Begins Here</h4>
      <div className="grid grid-cols-1 gap-3">
        <div className="flex items-center gap-3 text-sm text-[color:var(--muted-foreground)]">
          <Box className="w-4 h-4 text-[color:var(--gold)]" /> Handmade in India
        </div>
        <div className="flex items-center gap-3 text-sm text-[color:var(--muted-foreground)]">
          <Gem className="w-4 h-4 text-[color:var(--gold)]" /> Certified Natural Gemstone
        </div>
        <div className="flex items-center gap-3 text-sm text-[color:var(--muted-foreground)]">
          <Droplet className="w-4 h-4 text-[color:var(--gold)]" /> Complimentary Ganga Jal Included
        </div>
      </div>
    </motion.div>
  );
};
