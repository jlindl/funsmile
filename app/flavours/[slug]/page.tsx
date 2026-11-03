import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import PackCard from "@/components/PackCard";
import Waitlist from "@/components/sections/Waitlist";
import { claims, flavours, formulas, getFlavour, LAUNCH_YEAR, NANO_HA, PACK_SIZE, type Formula } from "@/lib/products";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ formula?: string }>;
};

export function generateStaticParams() {
  return flavours.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const f = getFlavour((await params).slug);
  if (!f) return {};
  return {
    title: `${f.name} toothpaste | FunSmile`,
    description: `${f.tagline} FunSmile ${f.name} comes with fluoride, or fluoride-free with nano-hydroxyapatite. Launching ${LAUNCH_YEAR}.`,
  };
}

export default async function FlavourPage({ params, searchParams }: Props) {
  const f = getFlavour((await params).slug);
  if (!f) notFound();
  const requested = (await searchParams).formula;
  const formula: Formula = requested === "fluoride-free" ? "fluoride-free" : "fluoride";
  const others = flavours.filter((x) => x.slug !== f.slug);

  return (
    <>
      <section className="relative overflow-hidden" style={{ background: f.soft }}>
        <div aria-hidden className="absolute -right-32 top-10 h-[30rem] w-[30rem] rounded-full opacity-30 blur-3xl" style={{ background: f.colour }} />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 py-14 sm:px-8 lg:grid-cols-2 lg:py-20">
          <div className="relative flex h-[500px] items-center justify-center sm:h-[600px]">
            <div aria-hidden className="absolute aspect-square h-[80%] max-w-full rounded-full bg-white/80" />
            <div className="animate-float" style={{ "--tilt": "-5deg" } as React.CSSProperties}>
              <Image src={f.image} alt={`FunSmile ${f.name} toothpaste pump pack`} width={320} height={1500} priority className="relative h-[460px] w-auto sm:h-[560px]" />
            </div>
          </div>

          <div>
            <nav aria-label="Breadcrumb" className="text-sm font-semibold text-ink-muted">
              <Link href="/" className="hover:text-ink">Home</Link> / <Link href="/#range" className="hover:text-ink">Flavours</Link> / <span className="text-ink">{f.name}</span>
            </nav>
            <div className="mt-5 flex flex-wrap gap-2">
              <Badge className="text-white" style={{ background: f.colour }}>Coming {LAUNCH_YEAR}</Badge>
              <Badge className="bg-white text-ink">Lab tested</Badge>
              <Badge className="bg-white text-ink">Certified</Badge>
            </div>
            <h1 className="mt-5 font-display text-5xl font-semibold leading-[0.95] tracking-tight sm:text-7xl" style={{ color: f.colour }}>
              {f.name}
            </h1>
            <p className="mt-3 font-display text-2xl font-medium text-ink-soft sm:text-3xl">{f.tagline}</p>
            <p className="mt-5 max-w-lg text-lg text-ink-muted">{f.description}</p>

            <h2 className="mt-8 font-display text-lg font-semibold">Choose your formula</h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {(Object.keys(formulas) as Formula[]).map((key) => {
                const on = key === formula;
                return (
                  <Link
                    key={key}
                    href={`/flavours/${f.slug}?formula=${key}`}
                    scroll={false}
                    aria-current={on ? "true" : undefined}
                    className={`rounded-[1.75rem] p-5 transition ${on ? (key === "fluoride" ? "bg-berry" : "bg-leaf") + " text-white shadow-xl" : "bg-white ring-1 ring-line hover:ring-ink/30"}`}
                  >
                    <span className="font-display text-xl font-semibold">{formulas[key].label}</span>
                    <span className={`mt-1 block text-sm ${on ? "text-white/75" : "text-ink-muted"}`}>{formulas[key].points.join(" · ")}</span>
                  </Link>
                );
              })}
            </div>
            {formula === "fluoride-free" && (
              <div className="mt-3 rounded-[1.5rem] bg-white/80 p-4">
                <p className="font-display font-semibold text-leaf">Powered by {NANO_HA.name.toLowerCase()}</p>
                <p className="mt-1 text-sm text-ink-muted">{NANO_HA.what}</p>
                <p className="mt-2 text-sm font-semibold text-ink-muted">Fluoride-free pack design will be revealed before launch.</p>
              </div>
            )}

            <dl className="mt-8 grid grid-cols-3 gap-3 text-center">
              {[
                ["Size", PACK_SIZE],
                ["Format", "Pump"],
                ["Launch", String(LAUNCH_YEAR)],
              ].map(([k, v]) => (
                <div key={k} className="rounded-[1.5rem] bg-white/80 px-3 py-4">
                  <dt className="text-sm font-bold text-ink-muted">{k}</dt>
                  <dd className="mt-1 font-display text-lg font-semibold">{v}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="#waitlist" variant="candy">Notify me at launch</Button>
              <Button href="/#range" variant="outline">See all flavours</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-mist py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">Tastes like {f.short.toLowerCase()}. Works like toothpaste.</h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {claims.map((c) => (
              <li key={c.title} className="rounded-[2rem] bg-white p-6 shadow-[0_2px_0_0_var(--color-line)]">
                <span className="grid h-10 w-10 place-items-center rounded-full text-white" style={{ background: f.colour }} aria-hidden>
                  <Icon name="check" className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-xl font-semibold">{c.title}</h3>
                <p className="mt-2 text-ink-muted">{c.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="pt-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">More flavours to love</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {others.map((o) => (
              <PackCard key={o.slug} flavour={o} formula={formula} />
            ))}
          </div>
        </div>
      </section>

      <Waitlist />
    </>
  );
}
