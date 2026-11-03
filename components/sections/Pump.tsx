import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Bubbles from "@/components/ui/Bubbles";
import Wave from "@/components/ui/Wave";
import { flavours } from "@/lib/products";

const steps = [
  { n: "1", title: "Pop the cap", body: "The clear cap keeps the nozzle clean between brushes.", bg: "bg-candy" },
  { n: "2", title: "Press the pump", body: "One press gives a neat, measured amount. No squeezing, no waste.", bg: "bg-sky" },
  { n: "3", title: "Brush & smile", body: "Two minutes of flavour, twice a day. The easy bit.", bg: "bg-berry" },
];

export default function Pump() {
  return (
    <section id="pump" className="scroll-mt-28">
      <Wave fill="var(--color-blush)" />
      <div className="overflow-hidden bg-blush py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2">
          <Reveal className="relative order-2 flex h-[400px] items-center justify-center sm:h-[480px] lg:order-1">
            <div aria-hidden className="absolute aspect-square w-[min(92%,400px)] rounded-full bg-gradient-to-br from-candy-soft to-sky-soft" />
            <Bubbles tint="#ff3d97" count={7} />
            <Image
              src={flavours[2].image}
              alt="FunSmile Blue Raspberry toothpaste pump pack"
              width={320}
              height={1500}
              className="relative h-[340px] w-auto rotate-6 drop-shadow-[0_24px_24px_rgba(30,27,75,0.2)] sm:h-[440px]"
            />
            <span className="absolute left-[10%] top-[14%] -rotate-6 rounded-full bg-white px-4 py-2 font-display text-lg font-semibold text-berry shadow-lg">
              60g pump
            </span>
            <span className="absolute bottom-[16%] right-[8%] rotate-6 rounded-full bg-candy px-4 py-2 font-display text-lg font-semibold text-white shadow-lg">
              No mess!
            </span>
          </Reveal>

          <div className="order-1 lg:order-2">
            <Reveal>
              <SectionHeading
                align="left"
                eyebrow="The pump"
                title={<>Goodbye, <span className="whitespace-nowrap">squeezed-flat</span> tubes.</>}
                sub="FunSmile comes in a stand-up 60g pump that looks great by the sink and dispenses right to the last brush."
              />
            </Reveal>
            <ol className="mt-10 space-y-4">
              {steps.map((s, i) => (
                <Reveal key={s.n} delay={i * 0.08}>
                  <li className="flex items-center gap-4 rounded-[1.75rem] bg-white p-4 sm:gap-5 sm:p-5 shadow-[0_2px_0_0_var(--color-line)]">
                    <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-full font-display text-xl sm:h-14 sm:w-14 sm:text-2xl font-semibold text-white ${s.bg}`}>{s.n}</span>
                    <div>
                      <h3 className="font-display text-xl font-semibold">{s.title}</h3>
                      <p className="mt-0.5 text-ink-muted">{s.body}</p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </div>
      <Wave fill="var(--color-blush)" flip />
    </section>
  );
}
