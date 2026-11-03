"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Bubbles from "@/components/ui/Bubbles";
import Icon from "@/components/ui/Icon";
import { flavours } from "@/lib/products";

export default function FlavourPicker() {
  const [active, setActive] = useState(flavours[0].slug);
  const f = flavours.find((x) => x.slug === active) ?? flavours[0];

  return (
    <section aria-labelledby="picker-title" className="px-3 sm:px-5">
      <div className="relative mx-auto max-w-[90rem] overflow-hidden rounded-[3rem] transition-colors duration-700" style={{ background: f.colour }}>
        <Bubbles count={8} />
        <div aria-hidden className="absolute -right-24 -top-24 h-[28rem] w-[28rem] rounded-full bg-white/20 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-6 py-16 sm:px-10 lg:grid-cols-2 lg:py-24">
          <div className="text-white">
            <p className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-4 py-1.5 font-display text-sm font-semibold">
              <Icon name="sparkle" className="h-4 w-4" />
              Pick your flavour
            </p>
            <h2 id="picker-title" className="mt-4 font-display text-4xl font-semibold leading-none tracking-tight sm:text-6xl">
              What&rsquo;s your flavour?
            </h2>

            <div role="radiogroup" aria-label="Flavour" className="mt-8 flex flex-wrap gap-3">
              {flavours.map((x) => {
                const on = x.slug === active;
                return (
                  <button
                    key={x.slug}
                    role="radio"
                    aria-checked={on}
                    onClick={() => setActive(x.slug)}
                    className={`flex items-center gap-2 rounded-full py-2 pl-2 pr-5 font-display text-lg font-semibold transition ${on ? "bg-white text-ink shadow-lg" : "bg-white/15 text-white ring-2 ring-white/40 hover:bg-white/25"}`}
                  >
                    <span className="h-6 w-6 rounded-full ring-2 ring-white" style={{ background: x.colour }} aria-hidden />
                    {x.short}
                  </button>
                );
              })}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={f.slug}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="mt-8"
              >
                <h3 className="font-display text-3xl font-semibold">{f.name}</h3>
                <p className="mt-3 max-w-lg text-lg text-white/90">{f.description}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {f.notes.map((n) => (
                    <li key={n} className="rounded-full bg-white/15 px-4 py-1.5 font-semibold ring-1 ring-white/30">
                      {n}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 flex items-center gap-2 font-display font-semibold text-white/95">
                  <Icon name="check" className="h-5 w-5" />
                  Available with fluoride, or fluoride-free with nano-HA
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href={`/flavours/${f.slug}`}
                    className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 font-display text-lg font-semibold text-ink shadow-[0_6px_0_0_rgba(0,0,0,0.15)] transition hover:translate-y-1 hover:shadow-[0_2px_0_0_rgba(0,0,0,0.15)]"
                  >
                    Explore {f.short} <Icon name="arrow" className="h-5 w-5" />
                  </Link>
                  <Link href="#waitlist" className="rounded-full px-6 py-3.5 font-display text-lg font-semibold text-white ring-2 ring-white/60 transition hover:bg-white/10 hover:ring-white">
                    Notify me at launch
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="relative flex h-[460px] items-center justify-center sm:h-[540px]">
            <div aria-hidden className="absolute aspect-square h-[82%] max-w-full rounded-full bg-white/95 shadow-[inset_0_-18px_0_0_rgba(0,0,0,0.05)]" />
            <AnimatePresence mode="wait">
              <motion.div
                key={f.slug}
                initial={{ opacity: 0, rotate: -20, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, rotate: -6, scale: 1, y: 0 }}
                exit={{ opacity: 0, rotate: 14, scale: 0.9, y: -30 }}
                transition={{ type: "spring", stiffness: 180, damping: 16 }}
                className="relative"
              >
                <Image src={f.image} alt={`FunSmile ${f.name} toothpaste`} width={320} height={1500} className="h-[400px] w-auto drop-shadow-[0_24px_24px_rgba(0,0,0,0.2)] sm:h-[480px]" />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
