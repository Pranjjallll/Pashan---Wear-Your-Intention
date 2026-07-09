import { Link } from "@tanstack/react-router";

export function PeacockGlyph({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 52 72"
      aria-hidden="true"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M26 67C16 52 10 39 12 25C13.8 12.5 20.2 5 26 3C31.8 5 38.2 12.5 40 25C42 39 36 52 26 67Z"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M26 66C23 46 23.2 27 26 8C28.8 27 29 46 26 66Z"
        stroke="currentColor"
        strokeWidth="1"
      />
      <path
        d="M25.8 14C19.5 19 17.4 25.2 19 32C21 40.4 26 44 26 44C26 44 31 40.4 33 32C34.6 25.2 32.5 19 26.2 14"
        stroke="currentColor"
        strokeWidth="1"
      />
      <ellipse
        cx="26"
        cy="29"
        rx="5.2"
        ry="8"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <circle cx="26" cy="29" r="2.3" fill="currentColor" />
      <path
        d="M13 31C18 34 21 37 24 42M39 31C34 34 31 37 28 42M16 43C20 45 23 49 25 55M36 43C32 45 29 49 27 55"
        stroke="currentColor"
        strokeWidth="0.9"
      />
    </svg>
  );
}

export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className="brand-mark" aria-label="PASHAN home">
      <PeacockGlyph className={compact ? "h-8 w-6" : "h-10 w-7"} />
      <span>
        <span className="brand-word">Pashan</span>
        {!compact && (
          <span className="brand-subline">
            <span lang="hi">पाषाण</span> · Stone · Energy · Intention
          </span>
        )}
      </span>
    </Link>
  );
}
