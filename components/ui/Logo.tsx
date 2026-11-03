type Props = { className?: string; tone?: "ink" | "light" };

/** Wordmark: "fun" + "smile" with the shine dashes and smile swoosh from the packs. */
export default function Logo({ className = "", tone = "ink" }: Props) {
  const fun = tone === "light" ? "text-white" : "text-ink";
  return (
    <span className={`relative inline-flex items-end font-display font-semibold tracking-tight leading-none ${className}`}>
      <span className={fun}>fun</span>
      <span className="text-candy">smile</span>
      <svg aria-hidden viewBox="0 0 24 24" className="absolute -right-[0.6em] -top-[0.4em] h-[0.62em] w-[0.62em] text-sky">
        <g stroke="currentColor" strokeWidth="3.2" strokeLinecap="round">
          <path d="M4 14 9 12" />
          <path d="M10 8 12 3" />
          <path d="M15 10 20 6" />
        </g>
      </svg>
      <svg aria-hidden viewBox="0 0 100 14" className="absolute -bottom-[0.3em] left-[0.95em] h-[0.3em] w-[3.1em] text-leaf" preserveAspectRatio="none">
        <path d="M2 4 Q50 16 98 2" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
      </svg>
    </span>
  );
}
