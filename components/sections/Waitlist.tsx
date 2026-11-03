"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Bubbles from "@/components/ui/Bubbles";
import Icon from "@/components/ui/Icon";
import { flavours, LAUNCH_YEAR } from "@/lib/products";

type Status = "idle" | "sending" | "done" | "error";

export default function Waitlist() {
  const [email, setEmail] = useState("");
  const [flavour, setFlavour] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("idle");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, flavour }),
      });
      setStatus(res.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="waitlist" className="scroll-mt-28 px-3 py-20 sm:px-5 sm:py-24">
      <div className="relative mx-auto max-w-[90rem] overflow-hidden rounded-[3rem] bg-gradient-to-br from-candy via-[#b94dd6] to-sky px-6 py-16 sm:px-12 sm:py-24">
        <Bubbles count={8} />
        <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 hidden w-[45%] lg:block">
          {flavours.map((f, i) => (
            <Image
              key={f.slug}
              src={f.image}
              alt=""
              width={320}
              height={1500}
              className="absolute h-[380px] w-auto animate-float drop-shadow-[0_24px_24px_rgba(30,27,75,0.3)]"
              style={{ left: `${10 + i * 26}%`, top: `${18 + (i % 2) * 6}%`, "--tilt": `${(i - 1) * 12}deg`, animationDelay: `${i * -2}s` } as React.CSSProperties}
            />
          ))}
        </div>

        <div className="relative max-w-xl text-white">
          <p className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-4 py-1.5 font-display text-sm font-semibold">
            <Icon name="sparkle" className="h-4 w-4" />
            The launch list
          </p>
          <h2 className="mt-4 font-display text-5xl font-semibold leading-[0.98] tracking-tight sm:text-6xl">
            Be first to try FunSmile in {LAUNCH_YEAR}.
          </h2>
          <p className="mt-5 text-lg text-white/90">
            Get the launch date, early access and the odd flavour sneak peek. No spam, just smiles.
          </p>

          {status === "done" ? (
            <motion.div
              role="status"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 240, damping: 14 }}
              className="mt-10 flex items-center gap-4 rounded-[2rem] bg-white p-6 text-ink"
            >
              <span className="relative grid h-14 w-14 shrink-0 place-items-center rounded-full bg-candy text-white">
                <Icon name="smile" className="h-8 w-8" />
                <BubbleBurst />
              </span>
              <div>
                <p className="font-display text-2xl font-semibold">You&rsquo;re on the list!</p>
                <p className="mt-1 text-ink-muted">We&rsquo;ll email you as soon as FunSmile is ready to launch.</p>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={submit} className="mt-10">
              <fieldset>
                <legend className="font-display text-lg font-semibold">Your favourite flavour (optional)</legend>
                <div className="mt-3 flex flex-wrap gap-2">
                  {flavours.map((f) => {
                    const on = flavour === f.slug;
                    return (
                      <button
                        type="button"
                        key={f.slug}
                        aria-pressed={on}
                        onClick={() => setFlavour(on ? null : f.slug)}
                        className={`flex items-center gap-2 rounded-full py-1.5 pl-1.5 pr-4 font-display font-semibold transition ${on ? "bg-white text-ink" : "bg-white/20 text-white ring-1 ring-white/50 hover:bg-white/30"}`}
                      >
                        <span className="h-5 w-5 rounded-full ring-2 ring-white" style={{ background: f.colour }} aria-hidden />
                        {f.short}
                      </button>
                    );
                  })}
                </div>
              </fieldset>
              <div className="mt-6 flex flex-col gap-3 rounded-[2rem] bg-white p-2 shadow-[0_10px_30px_-10px_rgba(30,27,75,0.4)] sm:flex-row">
                <label htmlFor="waitlist-email" className="sr-only">Email address</label>
                <input
                  id="waitlist-email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="min-w-0 flex-1 rounded-full bg-transparent px-5 py-3.5 text-lg text-ink placeholder:text-ink-muted/70 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="rounded-full bg-candy px-7 py-3.5 font-display text-lg font-semibold text-white shadow-[0_5px_0_0_var(--color-candy-deep)] transition hover:translate-y-1 hover:shadow-[0_1px_0_0_var(--color-candy-deep)] disabled:opacity-60"
                >
                  {status === "sending" ? "Joining…" : "Count me in"}
                </button>
              </div>
              {status === "error" && (
                <p role="alert" className="mt-3 font-semibold">
                  Something went wrong. Please try again.
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

const BURST_COLOURS = ["#ff3d97", "#2ec5f5", "#2346d8", "#19a35a", "#ff3b5c", "#b94dd6"];

/** Celebration: a ring of coloured bubbles popping out from the smile. */
function BubbleBurst() {
  const reduce = useReducedMotion();
  if (reduce) return null;
  return (
    <span aria-hidden className="pointer-events-none absolute inset-0">
      {Array.from({ length: 14 }, (_, i) => {
        const angle = (i / 14) * Math.PI * 2;
        const dist = 70 + (i % 3) * 28;
        const size = 8 + (i % 4) * 5;
        return (
          <motion.span
            key={i}
            className="absolute left-1/2 top-1/2 rounded-full"
            style={{ width: size, height: size, marginLeft: -size / 2, marginTop: -size / 2, background: BURST_COLOURS[i % BURST_COLOURS.length] }}
            initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
            animate={{ x: Math.cos(angle) * dist, y: Math.sin(angle) * dist, scale: [0, 1.2, 0.9], opacity: [1, 1, 0] }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
          />
        );
      })}
    </span>
  );
}
