import Image from "next/image";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import { formulas, LAUNCH_YEAR, PACK_SIZE, type Flavour, type Formula } from "@/lib/products";

type Props = { flavour: Flavour; formula: Formula };

export default function PackCard({ flavour, formula }: Props) {
  const info = formulas[formula];
  const free = formula === "fluoride-free";
  const href = `/flavours/${flavour.slug}?formula=${formula}`;

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-[2rem] bg-white ring-1 ring-line transition duration-500 ease-out-expo hover:-translate-y-1.5 hover:shadow-[0_24px_60px_-24px_rgba(16,38,92,0.35)]">
      <div className="relative flex h-80 items-center justify-center overflow-hidden" style={{ background: flavour.soft }}>
        <div aria-hidden className="absolute h-56 w-56 rounded-full opacity-40 blur-2xl transition duration-700 group-hover:scale-125" style={{ background: flavour.colour }} />
        <Image
          src={flavour.image}
          alt={`FunSmile ${flavour.name} toothpaste pump pack`}
          width={320}
          height={1500}
          className="relative h-72 w-auto -rotate-6 transition duration-700 ease-spring group-hover:rotate-3 group-hover:scale-105"
        />
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          <Badge className="bg-white text-ink">{info.label}</Badge>
          <Badge className="bg-sun text-ink-deep">Coming {LAUNCH_YEAR}</Badge>
        </div>
        {free && (
          <p className="absolute bottom-4 right-4 rotate-3 rounded-xl bg-ink px-3 py-1.5 font-display text-xs font-bold text-white shadow-lg">
            Fluoride-free pack reveal soon
          </p>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="font-display text-xs font-bold uppercase tracking-[0.18em]" style={{ color: flavour.colour }}>
          {info.title} · {PACK_SIZE}
        </p>
        <h3 className="mt-2 font-display text-2xl font-extrabold leading-tight">
          <Link href={href} className="after:absolute after:inset-0">
            {flavour.name}
          </Link>
        </h3>
        <p className="mt-1 text-ink-muted">{flavour.tagline}</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {info.points.map((p) => (
            <li key={p} className="rounded-full bg-cream px-3 py-1 text-sm font-semibold text-ink/80">
              ✓ {p}
            </li>
          ))}
        </ul>
        <div className="mt-auto flex items-center justify-between pt-6">
          <span className="text-sm font-semibold text-ink-muted">Price revealed at launch</span>
          <span className="inline-flex items-center gap-1 rounded-full bg-ink px-4 py-2 font-display text-sm font-bold text-white transition group-hover:bg-candy">
            View flavour →
          </span>
        </div>
      </div>
    </article>
  );
}
