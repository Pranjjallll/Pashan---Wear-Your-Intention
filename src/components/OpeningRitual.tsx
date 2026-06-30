import { useEffect, useState } from "react";
import { PeacockGlyph } from "./BrandMark";

const SESSION_KEY = "pashan-opening-seen-v3";

export function OpeningRitual() {
  const [visible, setVisible] = useState(true);
  const [leaving, setLeaving] = useState(false);

  const finish = () => {
    try {
      window.sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      // Storage can be unavailable in privacy-restricted browsers.
    }
    setLeaving(true);
    window.setTimeout(() => setVisible(false), 700);
  };

  useEffect(() => {
    let hasSeen = false;
    try {
      hasSeen = window.sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      // Storage can be unavailable in privacy-restricted browsers.
    }
    if (hasSeen) {
      setVisible(false);
      return;
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const exitTimer = window.setTimeout(() => setLeaving(true), reduced ? 450 : 2950);
    const doneTimer = window.setTimeout(() => {
      try {
        window.sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        // Storage can be unavailable in privacy-restricted browsers.
      }
      setVisible(false);
      document.body.style.overflow = previous;
    }, reduced ? 850 : 3650);

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(doneTimer);
      document.body.style.overflow = previous;
    };
  }, []);

  if (!visible) return null;

  return (
    <div className={`opening-ritual ${leaving ? "is-leaving" : ""}`} role="dialog" aria-label="Welcome to PASHAN">
      <div className="ritual-halo" />
      <div className="ritual-stars" aria-hidden />
      <div className="ritual-feather-wrap" aria-hidden>
        <PeacockGlyph className="ritual-feather" />
        <span className="ritual-ring ritual-ring-one" />
        <span className="ritual-ring ritual-ring-two" />
      </div>
      <div className="ritual-copy">
        <span className="ritual-kicker">A ritual in natural stone</span>
        <span className="ritual-word">PASHAN</span>
        <span className="ritual-mantra">शान्ति · ऊर्जा · संकल्प</span>
      </div>
      <button type="button" onClick={finish} className="ritual-skip">Enter atelier</button>
    </div>
  );
}
