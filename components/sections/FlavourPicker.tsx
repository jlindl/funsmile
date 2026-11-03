"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { flavours } from "@/lib/products";

export default function FlavourPicker() {
  const [active, setActive] = useState(flavours[0].slug);
  const f = flavours.find((x) => x.slug === active) ?? flavours[0];

  return (
    <section aria-labelledby="picker-title" className="px-3 sm:px-5">
      <div
        className="relative mx-auto max-w-[90rem] overflow-hidden rounded-[2.5rem] transition-colors duration-700"
        style={{ background: f.colour }}
      >
        <div aria-hidden className="absolute -right-24 -top-24 h-[28rem] w-[28rem] rounded-full bg-white/25 blur-3xl" />
        <div aria-hidden className="absolute -bottom-32 left-1/4 h-80 w-80 rounded-full bg-sun/25 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-6 py-16 sm:px-10 lg:grid-cols-2 lg:py-24">
          <div className="text-white">
            <p className="font-display text-sm font-bold uppercase tracking-[0.18em] text-white/80">✦ Pick your flavour</p>
            <h2 id="picker-title" className="mt-3 font-display text-4xl font-extrabold leading-none tracking-tight sm:text-6xl">
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
                    className={`rounded-full px-5 py-2.5 font-display font-bold transition ${on ? "bg-white text-ink shadow-lg" : "bg-white/15 text-white ring-1 ring-white/40 hover:bg-white/25"}`}
                  >
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
                <h3 className="font-display text-3xl font-extrabold">{f.name}</h3>
                <p className="mt-3 max-w-lg text-lg text-white/85">{f.description}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {f.notes.map((n) => (
                    <li key={n} className="rounded-full bg-white/15 px-4 py-1.5 text-sm font-semibold ring-1 ring-white/30">
                      {n}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 font-display font-bold text-white/90">Available in fluoride &amp; fluoride-free</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href={`/flavours/${f.slug}`} className="rounded-full bg-white px-6 py-3.5 font-display font-bold text-ink transition hover:bg-sun">
                    Explore {f.short} →
                  </Link>
                  <Link href="#waitlist" className="rounded-full px-6 py-3.5 font-display font-bold text-white ring-2 ring-white/50 transition hover:ring-white">
                    Notify me at launch
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="relative flex h-[460px] items-center justify-center sm:h-[540px]">
            <div aria-hidden className="absolute aspect-square h-[85%] max-w-full rounded-full bg-white/90" />
            <AnimatePresence mode="wait">
              <motion.div
                key={f.slug}
                initial={{ opacity: 0, rotate: -18, scale: 0.85, y: 40 }}
                animate={{ opacity: 1, rotate: -6, scale: 1, y: 0 }}
                exit={{ opacity: 0, rotate: 12, scale: 0.9, y: -30 }}
                transition={{ type: "spring", stiffness: 180, damping: 20 }}
                className="relative"
              >
                <Image src={f.image} alt={`FunSmile ${f.name} toothpaste`} width={320} height={1500} className="h-[400px] w-auto sm:h-[480px]" />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
