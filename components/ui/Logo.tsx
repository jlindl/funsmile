type Props = { className?: string; tone?: "ink" | "light" };

/** Wordmark: "fun" + "smile" with the sparkle and smile swoosh from the packs. */
export default function Logo({ className = "", tone = "ink" }: Props) {
  const fun = tone === "light" ? "text-white" : "text-ink";
  return (
    <span className={`relative inline-flex items-end font-display font-extrabold tracking-tight leading-none ${className}`}>
      <span className={fun}>fun</span>
      <span className="text-candy">smile</span>
      <svg aria-hidden viewBox="0 0 24 24" className="absolute -right-[0.55em] -top-[0.35em] h-[0.6em] w-[0.6em] text-sky">
        <g stroke="currentColor" strokeWidth="3.2" strokeLinecap="round">
          <path d="M4 14 9 12" />
          <path d="M10 8 12 3" />
          <path d="M15 10 20 6" />
        </g>
      </svg>
      <svg aria-hidden viewBox="0 0 100 14" className="absolute -bottom-[0.28em] left-[0.9em] h-[0.3em] w-[3.3em] text-leaf" preserveAspectRatio="none">
        <path d="M2 4 Q50 16 98 2" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
      </svg>
      <span className="sr-only"> home</span>
    </span>
  );
}
