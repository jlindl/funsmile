import { Fragment } from "react";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { claims } from "@/lib/products";

const accents = ["bg-melon", "bg-sky", "bg-leaf", "bg-sun"];

export default function LabTested() {
  return (
    <section id="lab" className="scroll-mt-28 bg-ink-deep py-24 text-white sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[1fr_1.3fr] lg:items-center">
        <Reveal>
          <SectionHeading
            align="left"
            tone="light"
            eyebrow="Lab tested & certified"
            title={
              <>
                Fun on the outside.{" "}
                <span className="font-serif font-normal italic text-sky">Serious</span> on the inside.
              </>
            }
            sub="The flavours are the fun part. The formula is the serious part. Every FunSmile toothpaste is tested and certified before it goes anywhere near your brush."
          />
          <Stamp />
        </Reveal>

        <ol className="grid gap-5 sm:grid-cols-2">
          {claims.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.08}>
              <li className="h-full rounded-[1.75rem] bg-white/[0.06] p-7 ring-1 ring-white/10 transition hover:bg-white/10">
                <div className="flex items-center justify-between">
                  <span className={`h-3 w-3 rounded-full ${accents[i % accents.length]}`} aria-hidden />
                  <span className="font-display text-sm font-bold text-white/50">
                    0{i + 1} / 0{claims.length}
                  </span>
                </div>
                <h3 className="mt-6 font-display text-2xl font-extrabold text-balance">
                  {/* Keep hyphenated words like "fluoride-free" on one line. */}
                  {c.title.split(" ").map((w, j) => (
                    <Fragment key={j}>
                      {j > 0 && " "}
                      <span className="whitespace-nowrap">{w}</span>
                    </Fragment>
                  ))}
                </h3>
                <p className="mt-3 text-white/70">{c.body}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Stamp() {
  return (
    <div className="mt-10 inline-flex -rotate-6 items-center gap-4 rounded-3xl border-4 border-dashed border-sun px-6 py-4">
      <span className="grid h-14 w-14 place-items-center rounded-full bg-sun font-display text-2xl font-extrabold text-ink-deep" aria-hidden>
        ✓
      </span>
      <span className="font-display font-extrabold uppercase leading-tight tracking-wider text-sun">
        Lab tested
        <br />
        <span className="text-white">&amp; certified</span>
      </span>
    </div>
  );
}
