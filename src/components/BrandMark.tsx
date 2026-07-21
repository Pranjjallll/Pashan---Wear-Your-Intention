import { Link } from "@tanstack/react-router";
import logoImage from "@/assets/brand/pashan-logo.jpeg";

type LogoTone = "inherit" | "light" | "dark";

interface LogoProps {
  className?: string;
  title?: string;
}

export function PashanSymbol({
  className = "",
  title = "PASHAN peacock lettermark",
}: LogoProps) {
  return (
    <span
      role="img"
      aria-label={title}
      className={`pashan-symbol-crop ${className}`}
    >
      <img src={logoImage} alt="" aria-hidden />
    </span>
  );
}

export function PeacockGlyph({ className = "" }: { className?: string }) {
  return <PashanSymbol className={className} title="PASHAN symbol" />;
}

export function BrandMark({
  compact = false,
  tone = "inherit",
}: {
  compact?: boolean;
  tone?: LogoTone;
}) {
  return (
    <Link
      to="/"
      className={`brand-mark brand-mark-${tone} ${compact ? "is-compact" : ""}`}
      aria-label="PASHAN home"
    >
      <span className="brand-logo-window">
        <img src={logoImage} alt="" aria-hidden />
      </span>
      <span className="sr-only">
        PASHAN{!compact && " - Wear Your Intention"}
      </span>
    </Link>
  );
}
