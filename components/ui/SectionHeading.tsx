type Props = {
  eyebrow: string;
  title: React.ReactNode;
  sub?: string;
  align?: "left" | "center";
  tone?: "ink" | "light";
};

export default function SectionHeading({ eyebrow, title, sub, align = "center", tone = "ink" }: Props) {
  const centred = align === "center";
  const light = tone === "light";
  return (
    <div className={`${centred ? "mx-auto text-center" : ""} max-w-2xl`}>
      <p className={`inline-flex items-center gap-2 font-display text-sm font-bold uppercase tracking-[0.18em] ${light ? "text-sun" : "text-candy"}`}>
        <span aria-hidden>✦</span>
        {eyebrow}
      </p>
      <h2 className={`mt-3 font-display text-4xl font-extrabold leading-[1.02] tracking-tight text-balance sm:text-5xl ${light ? "text-white" : "text-ink"}`}>
        {title}
      </h2>
      {sub && <p className={`mt-4 text-lg text-pretty ${light ? "text-white/75" : "text-ink-muted"}`}>{sub}</p>}
    </div>
  );
}
