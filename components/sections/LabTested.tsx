import { Fragment } from "react";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Highlight from "@/components/ui/Highlight";
import Bubbles from "@/components/ui/Bubbles";
import Icon from "@/components/ui/Icon";
import Wave from "@/components/ui/Wave";
import { claims } from "@/lib/products";

// One icon and colour per claim, in the order they appear in lib/products.ts.
const looks = [
  { icon: "flask" as const, bg: "bg-sky", soft: "bg-sky-soft" },
  { icon: "shield" as const, bg: "bg-berry", soft: "bg-berry-soft" },
  { icon: "leaf" as const, bg: "bg-leaf", soft: "bg-leaf-soft" },
  { icon: "pump" as const, bg: "bg-candy", soft: "bg-candy-soft" },
];

export default function LabTested() {
  return (
    <section id="lab" className="relative scroll-mt-28">
      <Wave fill="var(--color-sky-soft)" />
      <div className="relative overflow-hidden bg-sky-soft py-20 sm:py-24">
        <Bubbles tint="#2346d8" count={6} className="opacity-60" />
        <div className="relative mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[1fr_1.25fr] lg:items-center">
          <Reveal>
            <SectionHeading
              align="left"
              eyebrow="Lab tested & certified"
              title={
                <>
                  Fun on the outside. <Highlight className="text-berry" curve="text-candy">Serious</Highlight> on the inside.
                </>
              }
              sub="The flavours are the fun part. The formula is the serious part. Every FunSmile toothpaste is tested and certified before it gets anywhere near your brush."
            />
            <Seal />
          </Reveal>

          <ul className="grid gap-5 sm:grid-cols-2">
            {claims.map((c, i) => {
              const look = looks[i % looks.length];
              return (
                <Reveal key={c.title} delay={i * 0.08}>
                  <li className="h-full rounded-[2rem] bg-white p-7 shadow-[0_2px_0_0_var(--color-line),0_18px_40px_-28px_rgba(30,27,75,0.35)] transition duration-300 hover:-translate-y-1">
                    <span className={`grid h-14 w-14 place-items-center rounded-2xl ${look.soft}`}>
                      <span className={`grid h-10 w-10 place-items-center rounded-xl text-white ${look.bg}`}>
                        <Icon name={look.icon} className="h-6 w-6" />
                      </span>
                    </span>
                    <h3 className="mt-5 font-display text-2xl font-semibold text-balance">
                      {/* Keep hyphenated words like "fluoride-free" on one line. */}
                      {c.title.split(" ").map((w, j) => (
                        <Fragment key={j}>
                          {j > 0 && " "}
                          <span className="whitespace-nowrap">{w}</span>
                        </Fragment>
                      ))}
                    </h3>
                    <p className="mt-2 text-ink-muted">{c.body}</p>
                  </li>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </div>
      <Wave fill="var(--color-sky-soft)" flip />
    </section>
  );
}

/** Round "quality checked" seal with text on a circle. */
function Seal() {
  return (
    <div className="relative mt-10 h-36 w-36 animate-wiggle">
      <svg viewBox="0 0 120 120" className="absolute inset-0" aria-hidden>
        <defs>
          <path id="seal-ring" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
        </defs>
        <circle cx="60" cy="60" r="58" className="fill-candy" />
        <circle cx="60" cy="60" r="33" className="fill-white" />
        {/* textLength = ring circumference (2π·44), so the words meet without overlapping. */}
        <text className="fill-white font-display text-[10px] font-semibold">
          <textPath href="#seal-ring" textLength="274" lengthAdjust="spacing">
            LAB TESTED • CERTIFIED • LAB TESTED • CERTIFIED •
          </textPath>
        </text>
      </svg>
      <span className="absolute inset-0 grid place-items-center text-candy">
        <Icon name="smile" className="h-11 w-11" />
      </span>
      <span className="sr-only">Lab tested and certified</span>
    </div>
  );
}
