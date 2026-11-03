import Marquee from "@/components/ui/Marquee";
import { flavours, LAUNCH_YEAR } from "@/lib/products";

export default function FlavourMarquee() {
  const names = flavours.flatMap((f) => [f.name, f.name]);
  return (
    <section aria-label="Flavours" className="relative -rotate-1 bg-ink py-6">
      <p className="sr-only">3 flavours, 2 formulas, launching {LAUNCH_YEAR}.</p>
      <Marquee
        items={flavours.map((f) => f.name).concat(["Fluoride", "Fluoride-free"])}
        duration="28s"
        className="font-display text-4xl font-extrabold text-white sm:text-6xl"
        separator={<span className="text-sun">✦</span>}
      />
      <Marquee
        reverse
        items={names.map((n, i) => (i % 2 ? "Lab tested" : n))}
        duration="36s"
        className="mt-3 font-serif text-2xl italic text-sky sm:text-3xl"
        separator={<span className="text-candy">•</span>}
      />
    </section>
  );
}
