import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

export function Reveal({ children, className = "", delay = 0, staggerIndex }: { children: ReactNode; className?: string; delay?: number; staggerIndex?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  
  // Calculate total delay: base delay + stagger (if provided)
  const totalDelay = delay + (staggerIndex !== undefined ? staggerIndex * 150 : 0);

  useEffect(() => {
    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setShown(true);
      return;
    }

    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -5%", threshold: 0.05 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal-block ${shown ? "is-visible" : ""} ${className}`}
      style={{ "--reveal-delay": `${totalDelay}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}
