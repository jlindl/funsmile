"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Logo from "@/components/ui/Logo";
import Marquee from "@/components/ui/Marquee";
import { LAUNCH_YEAR } from "@/lib/products";

const nav = [
  { href: "/#range", label: "Flavours" },
  { href: "/#formulas", label: "Fluoride & fluoride-free" },
  { href: "/#lab", label: "Lab tested" },
  { href: "/#faq", label: "FAQ" },
];

const ticker = [
  `Launching ${LAUNCH_YEAR}`,
  "Lab tested",
  "Certified safe",
  "Fluoride & fluoride-free",
  "3 flavours, 1 big smile",
  "No-mess 60g pump",
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-ink py-2 text-sm font-semibold text-white">
        <Marquee items={ticker} duration="32s" itemClassName="font-display tracking-wide" separator={<span className="text-sun">✦</span>} />
      </div>
      <div className={`border-b transition-colors duration-300 ${scrolled ? "border-line bg-cream/90 backdrop-blur-md" : "border-transparent bg-cream"}`}>
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-6 px-5 sm:px-8">
          <Link href="/" aria-label="FunSmile home" className="text-3xl">
            <Logo />
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className="rounded-full px-4 py-2 font-display font-semibold text-ink/80 transition hover:bg-white hover:text-ink">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/#waitlist"
              className="hidden rounded-full bg-candy px-5 py-2.5 font-display font-bold text-white shadow-[0_4px_0_0_#c41f6c] transition hover:translate-y-[2px] hover:shadow-[0_2px_0_0_#c41f6c] sm:inline-flex"
            >
              Join the launch list
            </Link>
            <button
              type="button"
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((v) => !v)}
              className="grid h-11 w-11 place-items-center rounded-full bg-white ring-1 ring-line lg:hidden"
            >
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
              <span aria-hidden className="relative block h-3.5 w-5">
                <span className={`absolute left-0 h-0.5 w-5 bg-ink transition ${open ? "top-1.5 rotate-45" : "top-0"}`} />
                <span className={`absolute left-0 top-1.5 h-0.5 w-5 bg-ink transition ${open ? "opacity-0" : ""}`} />
                <span className={`absolute left-0 h-0.5 w-5 bg-ink transition ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
              </span>
            </button>
          </div>
        </div>

        {open && (
          <nav id="mobile-nav" aria-label="Mobile" className="border-t border-line bg-cream px-5 pb-6 pt-2 lg:hidden">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="block border-b border-line py-4 font-display text-xl font-bold">
                {item.label}
              </Link>
            ))}
            <Link href="/#waitlist" onClick={() => setOpen(false)} className="mt-5 flex justify-center rounded-full bg-candy px-5 py-3.5 font-display font-bold text-white">
              Join the launch list
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
