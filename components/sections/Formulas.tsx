import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Icon from "@/components/ui/Icon";
import { formulas } from "@/lib/products";

const cards = [
  {
    key: "fluoride" as const,
    icon: "shield" as const,
    bg: "bg-berry",
    soft: "bg-berry-soft",
    text: "text-berry",
    who: "For everyday cavity protection.",
  },
  {
    key: "fluoride-free" as const,
    icon: "leaf" as const,
    bg: "bg-leaf",
    soft: "bg-leaf-soft",
    text: "text-leaf",
    who: "Fluoride-free, powered by nano‑HA.",
  },
];

export default function Formulas() {
  return (
    <section id="formulas" className="scroll-mt-28 py-16 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Two formulas"
            title={<>Fluoride or <span className="whitespace-nowrap">fluoride-free?</span> You choose.</>}
            sub="Same flavours, same pump, same fun. The only difference is the active ingredient: fluoride, or nano-hydroxyapatite."
          />
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {cards.map((c, i) => {
            const f = formulas[c.key];
            return (
              <Reveal key={c.key} delay={i * 0.1}>
                <article className={`relative h-full overflow-hidden rounded-[2rem] p-6 sm:rounded-[2.25rem] sm:p-10 ${c.soft}`}>
                  <span aria-hidden className={`absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-15 ${c.bg}`} />
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className={`grid h-16 w-16 place-items-center rounded-2xl text-white ${c.bg}`}>
                      <Icon name={c.icon} className="h-8 w-8" />
                    </span>
                    <span className={`relative whitespace-nowrap rounded-full bg-white px-4 py-1.5 font-display font-semibold ${c.text}`}>
                      Active: {f.active}
                    </span>
                  </div>
                  <h3 className="mt-6 font-display text-[1.75rem] font-semibold sm:text-3xl">{f.title}</h3>
                  <p className={`mt-1 font-display text-lg font-medium ${c.text}`}>{c.who}</p>
                  <p className="mt-4 text-lg text-ink-muted">{f.blurb}</p>
                  <ul className="mt-6 space-y-3">
                    {f.points.map((p) => (
                      <li key={p} className="flex items-center gap-3 font-semibold text-ink-soft">
                        <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-white ${c.bg}`}>
                          <Icon name="check" className="h-4 w-4" />
                        </span>
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
