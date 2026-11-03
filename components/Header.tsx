"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Logo from "@/components/ui/Logo";
import Icon from "@/components/ui/Icon";
import ScrollProgress from "@/components/ui/ScrollProgress";
import { LAUNCH_YEAR } from "@/lib/products";

const nav = [
  { href: "/#range", label: "Flavours" },
  { href: "/#formulas", label: "Fluoride & nano-HA" },
  { href: "/#lab", label: "Lab tested" },
  { href: "/#faq", label: "FAQ" },
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
      <Link
        href="/#waitlist"
        className="flex items-center justify-center gap-2 bg-gradient-to-r from-candy via-[#b94dd6] to-sky px-4 py-2 text-center font-display text-sm font-semibold text-white"
      >
        <Icon name="sparkle" className="h-4 w-4 shrink-0" />
        <span>
          FunSmile launches in {LAUNCH_YEAR}. <span className="underline decoration-white/60 underline-offset-4">Join the launch list</span>
        </span>
      </Link>
      <div className={`relative transition-all duration-300 ${scrolled ? "bg-white/85 shadow-[0_8px_30px_-12px_rgba(30,27,75,0.18)] backdrop-blur-md" : "bg-white"}`}>
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-6 px-5 sm:px-8">
          <Link href="/" aria-label="FunSmile home" className="text-[2rem]">
            <Logo />
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className="rounded-full px-4 py-2 font-display font-medium text-ink-soft transition hover:bg-mist hover:text-berry">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/#waitlist"
              className="hidden rounded-full bg-candy px-5 py-2.5 font-display font-semibold text-white shadow-[0_4px_0_0_var(--color-candy-deep)] transition hover:translate-y-[3px] hover:shadow-[0_1px_0_0_var(--color-candy-deep)] sm:inline-flex"
            >
              Get notified
            </Link>
            <button
              type="button"
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((v) => !v)}
              className="grid h-11 w-11 place-items-center rounded-full bg-mist lg:hidden"
            >
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
              <span aria-hidden className="relative block h-3.5 w-5">
                <span className={`absolute left-0 h-0.5 w-5 rounded bg-ink transition ${open ? "top-1.5 rotate-45" : "top-0"}`} />
                <span className={`absolute left-0 top-1.5 h-0.5 w-5 rounded bg-ink transition ${open ? "opacity-0" : ""}`} />
                <span className={`absolute left-0 h-0.5 w-5 rounded bg-ink transition ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
              </span>
            </button>
          </div>
        </div>

        <ScrollProgress />

        {open && (
          <nav id="mobile-nav" aria-label="Mobile" className="border-t border-line bg-white px-5 pb-6 pt-2 lg:hidden">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="block border-b border-line py-4 font-display text-xl font-semibold">
                {item.label}
              </Link>
            ))}
            <Link href="/#waitlist" onClick={() => setOpen(false)} className="mt-5 flex justify-center rounded-full bg-candy px-5 py-3.5 font-display font-semibold text-white">
              Get notified at launch
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
