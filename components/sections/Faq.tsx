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
    a: "Our fluoride formula helps protect against cavities and strengthen enamel. Our fluoride-free formula uses nano-hydroxyapatite instead, to help strengthen and remineralise enamel without fluoride. Both come in every flavour and both freshen breath.",
  },
  {
    q: "What is nano-hydroxyapatite?",
    a: "Hydroxyapatite is the mineral your tooth enamel is mostly made of. Nano-hydroxyapatite (nano-HA) is a super-fine form of it that helps fill in tiny weak spots on the surface of your teeth and strengthen enamel. It's the active ingredient in our fluoride-free formula.",
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
            <details key={f.q} className="group rounded-[1.75rem] bg-mist px-6 transition-colors open:bg-white open:shadow-[0_0_0_2px_var(--color-candy-soft),0_16px_40px_-24px_rgba(30,27,75,0.3)] [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-display text-xl font-semibold">
                {f.q}
                <span aria-hidden className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white text-2xl text-candy transition duration-300 group-open:rotate-45 group-open:bg-candy group-open:text-white">
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
