import Link from "next/link";
import Logo from "@/components/ui/Logo";
import Icon from "@/components/ui/Icon";
import Wave from "@/components/ui/Wave";
import Bubbles from "@/components/ui/Bubbles";
import { flavours, LAUNCH_YEAR } from "@/lib/products";

export default function Footer() {
  return (
    <footer className="relative text-white">
      <Wave fill="var(--color-berry-deep)" />
      <div className="relative overflow-hidden bg-berry-deep">
        <Bubbles count={6} className="hidden opacity-40 sm:block" />
        <div className="relative mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-10 px-5 pb-12 pt-6 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:gap-12 md:pb-14 md:pt-8">
          <div className="col-span-2 md:col-span-1">
            <Logo tone="light" className="text-[2.6rem]" />
            <p className="mt-7 max-w-xs text-white/75">
              Flavoured toothpaste that turns two minutes of brushing into the best bit of the day. Launching {LAUNCH_YEAR}.
            </p>
            <Link
              href="/#waitlist"
              className="mt-6 inline-flex rounded-full bg-candy px-6 py-3 font-display font-semibold text-white shadow-[0_5px_0_0_var(--color-candy-deep)] transition hover:translate-y-1 hover:shadow-[0_1px_0_0_var(--color-candy-deep)]"
            >
              Get notified at launch
            </Link>
          </div>
          <FooterCol title="Flavours" links={flavours.map((f) => ({ href: `/flavours/${f.slug}`, label: f.name }))} />
          <FooterCol
            title="Learn"
            links={[
              { href: "/#formulas", label: "Fluoride vs nano‑HA" },
              { href: "/#lab", label: "Lab tested & certified" },
              { href: "/#pump", label: "Why a pump?" },
              { href: "/#faq", label: "FAQ" },
            ]}
          />
          <div className="col-span-2 md:col-span-1">
            <h3 className="font-display text-lg font-semibold text-sky">Our promise</h3>
            <ul className="mt-4 space-y-3 text-white/80">
              {["Lab tested", "Certified safe", "Fluoride or nano‑HA"].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-white/15">
                    <Icon name="check" className="h-3 w-3" />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="relative border-t border-white/10">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-6 text-sm text-white/55 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <p>© {new Date().getFullYear()} FunSmile. Products shown are pre-launch and packaging may change.</p>
            <a href="#main" className="hover:text-white">Back to top ↑</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <h3 className="font-display text-lg font-semibold text-sky">{title}</h3>
      <ul className="mt-4 space-y-3">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-white/80 transition hover:text-white">{l.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
