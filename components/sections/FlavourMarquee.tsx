import Image from "next/image";
import Marquee from "@/components/ui/Marquee";
import Icon from "@/components/ui/Icon";
import { flavours } from "@/lib/products";

const extras = [
  { label: "Fluoride", icon: "shield" as const },
  { label: "Fluoride-free with nano-HA", icon: "leaf" as const },
  { label: "Lab tested", icon: "flask" as const },
  { label: "No-mess pump", icon: "pump" as const },
];

export default function FlavourMarquee() {
  return (
    <section aria-label="Flavours and formulas" className="bg-mist pb-4 pt-2">
      <Marquee duration="45s">
        {flavours.map((f) => (
          <span
            key={f.slug}
            className="flex items-center gap-3 rounded-full py-2 pl-2 pr-6 font-display text-2xl font-semibold text-white sm:text-3xl"
            style={{ background: f.colour }}
          >
            <span className="grid h-11 w-11 place-items-center overflow-hidden rounded-full bg-white/90 sm:h-12 sm:w-12">
              <Image src={f.image} alt="" width={40} height={180} className="h-10 w-auto rotate-12" />
            </span>
            {f.name}
          </span>
        ))}
        {extras.map((x) => (
          <span key={x.label} className="flex items-center gap-2 rounded-full bg-white px-5 py-3 font-display text-lg font-semibold text-ink-soft ring-1 ring-line">
            <Icon name={x.icon} className="h-5 w-5 text-berry" />
            {x.label}
          </span>
        ))}
      </Marquee>
    </section>
  );
}
