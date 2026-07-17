import { useState, useEffect } from "react";

export const useRecentlyViewed = () => {
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("recently-viewed");
    if (saved) {
      setRecentlyViewed(JSON.parse(saved));
    }
  }, []);

  const addView = (slug: string) => {
    setRecentlyViewed((prev) => {
      const updated = [slug, ...prev.filter((item) => item !== slug)].slice(0, 4);
      localStorage.setItem("recently-viewed", JSON.stringify(updated));
      return updated;
    });
  };

  return { recentlyViewed, addView };
};
