import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { flavours } from "@/lib/products";

const steps = [
  { n: "1", title: "Pop the cap", body: "The clear cap keeps the nozzle clean between brushes." },
  { n: "2", title: "Press the pump", body: "One press gives a neat, measured amount. No squeezing, no waste." },
  { n: "3", title: "Brush & smile", body: "Two minutes of flavour, twice a day. The easy bit." },
];

export default function Pump() {
  return (
    <section id="pump" className="scroll-mt-28 overflow-hidden py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2">
        <Reveal className="relative order-2 flex h-[480px] items-center justify-center lg:order-1">
          <div aria-hidden className="absolute h-[420px] w-[420px] rounded-[38%] bg-sky-soft animate-wiggle" />
          <div aria-hidden className="absolute h-[300px] w-[300px] translate-x-24 translate-y-16 rounded-full bg-candy-soft" />
          <Image
            src={flavours[2].image}
            alt="FunSmile Blue Raspberry toothpaste pump pack"
            width={320}
            height={1500}
            className="relative h-[440px] w-auto rotate-6"
          />
          <span className="absolute left-[12%] top-[12%] rotate-[-8deg] rounded-2xl bg-white px-4 py-2 font-display font-bold shadow-xl">
            60g pump ✦
          </span>
          <span className="absolute bottom-[14%] right-[10%] rotate-6 rounded-2xl bg-ink px-4 py-2 font-display font-bold text-white shadow-xl">
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
                <li className="flex gap-5 rounded-3xl bg-white p-5 ring-1 ring-line">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-sun font-display text-xl font-extrabold">{s.n}</span>
                  <div>
                    <h3 className="font-display text-xl font-extrabold">{s.title}</h3>
                    <p className="mt-1 text-ink-muted">{s.body}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
