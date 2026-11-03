type Props = {
  /** "light" for white foam on colour; any CSS colour for tinted bubbles on white. */
  tint?: "light" | string;
  count?: number;
  className?: string;
};

// Fixed layout so server and client render identically.
const layout = [
  { l: 6, b: -4, s: 34, d: 0, t: 11 },
  { l: 18, b: 8, s: 14, d: 3.5, t: 8 },
  { l: 29, b: -2, s: 22, d: 6, t: 10 },
  { l: 44, b: 4, s: 12, d: 1.5, t: 7 },
  { l: 57, b: -6, s: 40, d: 4.5, t: 12 },
  { l: 68, b: 10, s: 16, d: 7.5, t: 9 },
  { l: 79, b: 0, s: 26, d: 2.5, t: 10 },
  { l: 91, b: 6, s: 12, d: 5.5, t: 8 },
];

/** Foam bubbles that drift upwards. Decorative only. */
export default function Bubbles({ tint = "light", count = 8, className = "" }: Props) {
  const light = tint === "light";
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {layout.slice(0, count).map((b, i) => (
        <span
          key={i}
          className={`absolute animate-rise ${light ? "bubble" : "bubble-ink"}`}
          style={
            {
              left: `${b.l}%`,
              bottom: `${b.b}%`,
              width: b.s,
              height: b.s,
              animationDelay: `${-b.d}s`,
              "--rise-duration": `${b.t}s`,
              "--bubble": light ? undefined : tint,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
