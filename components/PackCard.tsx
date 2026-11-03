import Image from "next/image";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import Icon from "@/components/ui/Icon";
import { formulas, LAUNCH_YEAR, PACK_SIZE, type Flavour, type Formula } from "@/lib/products";

type Props = { flavour: Flavour; formula: Formula };

export default function PackCard({ flavour, formula }: Props) {
  const info = formulas[formula];
  const free = formula === "fluoride-free";
  const href = `/flavours/${flavour.slug}?formula=${formula}`;

  return (
    <article className="group relative flex h-full flex-col rounded-[2.25rem] bg-white p-3 shadow-[0_2px_0_0_var(--color-line),0_18px_40px_-24px_rgba(30,27,75,0.25)] ring-1 ring-line transition duration-500 ease-out-expo hover:-translate-y-2 hover:shadow-[0_2px_0_0_var(--color-line),0_30px_60px_-28px_rgba(30,27,75,0.4)]">
      <div className="relative flex h-72 items-center justify-center overflow-hidden rounded-[1.75rem] sm:h-80" style={{ background: flavour.soft }}>
        {/* Foam puddle under the pack */}
        <div aria-hidden className="absolute bottom-6 h-10 w-44 rounded-[50%] bg-white/70 blur-md" />
        <span aria-hidden className="bubble-ink absolute left-[18%] top-[30%] h-6 w-6 transition duration-700 group-hover:-translate-y-6" style={{ "--bubble": flavour.colour } as React.CSSProperties} />
        <span aria-hidden className="bubble-ink absolute right-[20%] top-[55%] h-10 w-10 transition duration-700 group-hover:-translate-y-8" style={{ "--bubble": flavour.pop } as React.CSSProperties} />
        <span aria-hidden className="bubble-ink absolute right-[30%] top-[18%] h-4 w-4 transition duration-700 group-hover:-translate-y-4" style={{ "--bubble": flavour.colour } as React.CSSProperties} />
        <Image
          src={flavour.image}
          alt={`FunSmile ${flavour.name} toothpaste pump pack`}
          width={320}
          height={1500}
          className="relative h-64 w-auto -rotate-6 sm:h-72 transition duration-700 ease-spring group-hover:rotate-6 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          <Badge className="bg-white text-ink shadow-sm">{info.label}</Badge>
        </div>
        <Badge className="absolute right-3 top-3 text-white" style={{ background: flavour.colour }}>
          {LAUNCH_YEAR}
        </Badge>
        {free && (
          <p className="absolute bottom-3 left-3 right-3 rounded-2xl bg-white/90 px-3 py-2 text-center font-display text-sm font-semibold text-ink backdrop-blur">
            Fluoride-free pack design coming soon
          </p>
        )}
      </div>

      <div className="flex flex-1 flex-col px-4 pb-4 pt-5">
        <p className="text-sm font-bold" style={{ color: flavour.colour }}>
          {info.title} · {PACK_SIZE}
        </p>
        <h3 className="mt-1 font-display text-[1.75rem] font-semibold leading-tight">
          <Link href={href} className="after:absolute after:inset-0">
            {flavour.name}
          </Link>
        </h3>
        <p className="mt-1 text-ink-muted">{flavour.tagline}</p>
        <ul className="mt-4 space-y-1.5">
          {info.points.map((p) => (
            <li key={p} className="flex items-center gap-2 font-semibold text-ink-soft">
              <span className="grid h-5 w-5 place-items-center rounded-full text-white" style={{ background: flavour.colour }}>
                <Icon name="check" className="h-3 w-3" />
              </span>
              {p}
            </li>
          ))}
        </ul>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-x-3 gap-y-2 pt-6">
          <span className="text-sm font-semibold text-ink-muted">Price at launch</span>
          <span
            className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-4 py-2 font-display font-semibold text-white transition group-hover:gap-2.5"
            style={{ background: flavour.colour }}
          >
            Take a look <Icon name="arrow" className="h-4 w-4" />
          </span>
        </div>
      </div>
    </article>
  );
}
