import Link from "next/link";
import Logo from "@/components/ui/Logo";
import { flavours, LAUNCH_YEAR } from "@/lib/products";

export default function Footer() {
  return (
    <footer className="bg-ink-night text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Logo tone="light" className="text-4xl" />
          <p className="mt-6 max-w-xs text-white/70">
            Flavoured toothpaste that makes brushing the best two minutes of the day. Launching {LAUNCH_YEAR}.
          </p>
          <Link href="/#waitlist" className="mt-6 inline-flex rounded-full bg-sun px-5 py-3 font-display font-bold text-ink-deep transition hover:bg-white">
            Join the launch list
          </Link>
        </div>
        <FooterCol title="Flavours" links={flavours.map((f) => ({ href: `/flavours/${f.slug}`, label: f.name }))} />
        <FooterCol
          title="Learn"
          links={[
            { href: "/#formulas", label: "Fluoride vs fluoride-free" },
            { href: "/#lab", label: "Lab tested & certified" },
            { href: "/#pump", label: "Why a pump?" },
            { href: "/#faq", label: "FAQ" },
          ]}
        />
        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-[0.18em] text-sun">Our promise</h3>
          <ul className="mt-4 space-y-3 text-white/75">
            <li>✦ Lab tested</li>
            <li>✦ Certified safe</li>
            <li>✦ Fluoride or fluoride-free</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-6 text-sm text-white/50 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>© {new Date().getFullYear()} FunSmile. Products shown are pre-launch and packaging may change.</p>
          <a href="#main" className="hover:text-white">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <h3 className="font-display text-sm font-bold uppercase tracking-[0.18em] text-sun">{title}</h3>
      <ul className="mt-4 space-y-3">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-white/75 transition hover:text-white">{l.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
