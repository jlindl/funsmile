type Props = { children: React.ReactNode; className?: string; curve?: string };

/** A word underlined with the FunSmile smile curve. */
export default function Highlight({ children, className = "text-candy", curve = "text-sky" }: Props) {
  return (
    <span className={`relative inline-block whitespace-nowrap ${className}`}>
      {children}
      <svg aria-hidden viewBox="0 0 200 24" preserveAspectRatio="none" className={`absolute -bottom-[0.18em] left-[4%] h-[0.32em] w-[92%] ${curve}`}>
        <path d="M5 5 Q100 30 195 5" fill="none" stroke="currentColor" strokeWidth="9" strokeLinecap="round" />
      </svg>
    </span>
  );
}
