import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { formulas } from "@/lib/products";

const cards = [
  {
    key: "fluoride" as const,
    emoji: "🛡️",
    bg: "bg-berry",
    ring: "ring-berry/20",
    who: "For everyday cavity protection.",
  },
  {
    key: "fluoride-free" as const,
    emoji: "🌿",
    bg: "bg-leaf",
    ring: "ring-leaf/20",
    who: "For anyone who prefers to skip fluoride.",
  },
];

export default function Formulas() {
  return (
    <section id="formulas" className="scroll-mt-28 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Two formulas"
            title={<>Fluoride or <span className="whitespace-nowrap">fluoride-free?</span> You choose.</>}
            sub="Same flavours, same pump, same fun. The only difference is what's inside."
          />
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {cards.map((c, i) => {
            const f = formulas[c.key];
            return (
              <Reveal key={c.key} delay={i * 0.1}>
                <article className={`h-full rounded-[2rem] bg-white p-8 ring-1 ${c.ring} sm:p-10`}>
                  <div className={`grid h-16 w-16 place-items-center rounded-2xl text-3xl ${c.bg}`} aria-hidden>
                    {c.emoji}
                  </div>
                  <h3 className="mt-6 font-display text-3xl font-extrabold">{f.title}</h3>
                  <p className="mt-2 font-display font-bold text-candy">{c.who}</p>
                  <p className="mt-4 text-lg text-ink-muted">{f.blurb}</p>
                  <ul className="mt-6 space-y-3">
                    {f.points.map((p) => (
                      <li key={p} className="flex items-center gap-3 font-semibold">
                        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-sun text-sm text-ink-deep">✓</span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            );
          })}
        </div>
        <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-ink-muted">
          Not sure which is right for you or your family? Ask your dentist. Usage and age guidance will be printed on every pack.
        </p>
      </div>
    </section>
  );
}
