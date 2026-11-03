import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { LAUNCH_YEAR } from "@/lib/products";

export const faqs = [
  {
    q: "When does FunSmile launch?",
    a: `FunSmile launches in ${LAUNCH_YEAR}. Join the launch list and you'll be the first to hear the date, and the first to get your hands on a pump.`,
  },
  {
    q: "What's the difference between fluoride and fluoride-free?",
    a: "Our fluoride formula helps protect against cavities and strengthen enamel. Our fluoride-free formula is for anyone who prefers to skip fluoride. Both come in every flavour and both freshen breath.",
  },
  {
    q: "Is FunSmile lab tested?",
    a: "Yes. Every formula is independently lab tested and certified to UK and EU cosmetic regulations before launch.",
  },
  {
    q: "Which flavours are there?",
    a: "Three to start with: Watermelon Fresh, Cotton Candy and Blue Raspberry. Got an idea for the next one? Tell us when you join the launch list.",
  },
  {
    q: "Who is FunSmile for?",
    a: "Anyone who thinks brushing could be more fun. Age and usage guidance will be printed clearly on every pack, and your dentist is always the best person to ask.",
  },
  {
    q: "Where will I be able to buy it?",
    a: "We'll announce where to buy FunSmile before launch. Launch list members hear first.",
  },
];

export default function Faq() {
  return (
    <section id="faq" className="scroll-mt-28 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading eyebrow="FAQ" title="Questions? Ask away." />
        </Reveal>
        <div className="mt-12 space-y-3">
          {faqs.map((f) => (
            <details key={f.q} className="group rounded-3xl bg-white px-6 ring-1 ring-line open:ring-ink/20 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-display text-lg font-bold">
                {f.q}
                <span aria-hidden className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-cream text-xl transition duration-300 group-open:rotate-45 group-open:bg-sun">
                  +
                </span>
              </summary>
              <p className="pb-6 text-ink-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
