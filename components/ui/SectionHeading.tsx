import Icon from "@/components/ui/Icon";

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
      <p
        className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 font-display text-sm font-semibold ${
          light ? "bg-white/15 text-white" : "bg-candy-soft text-candy-deep"
        }`}
      >
        <Icon name="sparkle" className="h-4 w-4" />
        {eyebrow}
      </p>
      <h2
        className={`mt-4 font-display text-[2.35rem] font-semibold leading-[1.05] tracking-tight text-balance sm:text-[3.4rem] ${
          light ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {sub && <p className={`mt-4 text-lg text-pretty ${light ? "text-white/80" : "text-ink-muted"}`}>{sub}</p>}
    </div>
  );
}
