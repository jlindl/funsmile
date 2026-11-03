"use client";

import Image from "next/image";
import { useState } from "react";
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
    <section id="waitlist" className="scroll-mt-28 px-3 pb-24 sm:px-5 sm:pb-32">
      <div className="relative mx-auto max-w-[90rem] overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-candy via-melon to-sun px-6 py-16 sm:px-12 sm:py-24">
        <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 hidden w-[45%] lg:block">
          {flavours.map((f, i) => (
            <Image
              key={f.slug}
              src={f.image}
              alt=""
              width={320}
              height={1500}
              className="absolute h-[380px] w-auto animate-float"
              style={{ left: `${10 + i * 26}%`, top: `${18 + (i % 2) * 6}%`, "--tilt": `${(i - 1) * 12}deg`, animationDelay: `${i * -2}s` } as React.CSSProperties}
            />
          ))}
        </div>

        <div className="relative max-w-xl text-white">
          <p className="font-display text-sm font-bold uppercase tracking-[0.18em] text-white/85">✦ The Flavour Drop</p>
          <h2 className="mt-3 font-display text-5xl font-extrabold leading-[0.95] tracking-tight sm:text-6xl">
            Be first in the queue for {LAUNCH_YEAR}.
          </h2>
          <p className="mt-5 text-lg text-white/90">
            Join the launch list for the release date, early access and the occasional flavour sneak peek. No spam, just smiles.
          </p>

          {status === "done" ? (
            <div role="status" className="mt-10 rounded-3xl bg-white p-7 text-ink">
              <p className="font-display text-2xl font-extrabold">You&rsquo;re on the list! 🎉</p>
              <p className="mt-2 text-ink-muted">We&rsquo;ll email you as soon as FunSmile is ready to launch.</p>
            </div>
          ) : (
            <form onSubmit={submit} className="mt-10">
              <fieldset>
                <legend className="font-display font-bold">Your favourite flavour (optional)</legend>
                <div className="mt-3 flex flex-wrap gap-2">
                  {flavours.map((f) => {
                    const on = flavour === f.slug;
                    return (
                      <button
                        type="button"
                        key={f.slug}
                        aria-pressed={on}
                        onClick={() => setFlavour(on ? null : f.slug)}
                        className={`rounded-full px-4 py-2 font-display text-sm font-bold transition ${on ? "bg-white text-ink" : "bg-white/20 text-white ring-1 ring-white/50 hover:bg-white/30"}`}
                      >
                        {f.short}
                      </button>
                    );
                  })}
                </div>
              </fieldset>
              <div className="mt-6 flex flex-col gap-3 rounded-[1.75rem] bg-white p-2 sm:flex-row">
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
                  className="rounded-full bg-ink px-7 py-3.5 font-display font-bold text-white transition hover:bg-ink-deep disabled:opacity-60"
                >
                  {status === "sending" ? "Joining…" : "Join the list"}
                </button>
              </div>
              {status === "error" && (
                <p role="alert" className="mt-3 font-semibold text-ink-deep">
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
