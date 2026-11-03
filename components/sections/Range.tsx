"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PackCard from "@/components/PackCard";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { flavours, formulas, type Formula } from "@/lib/products";

const tabs: Formula[] = ["fluoride", "fluoride-free"];

export default function Range() {
  const [formula, setFormula] = useState<Formula>("fluoride");

  return (
    <section id="range" className="scroll-mt-28 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="The range"
            title={
              <>
                Three flavours. <span className="font-serif font-normal italic text-candy">Your</span> formula.
              </>
            }
            sub="Every FunSmile flavour comes in a fluoride and a fluoride-free version, in our no-mess 60g pump."
          />
        </Reveal>

        <div role="tablist" aria-label="Formula" className="mx-auto mt-10 flex w-fit rounded-full bg-white p-1.5 ring-1 ring-line">
          {tabs.map((t) => {
            const active = t === formula;
            return (
              <button
                key={t}
                role="tab"
                aria-selected={active}
                aria-controls="range-panel"
                onClick={() => setFormula(t)}
                className={`relative rounded-full px-6 py-3 font-display font-bold transition-colors ${active ? "text-white" : "text-ink/70 hover:text-ink"}`}
              >
                {active && (
                  <motion.span layoutId="formula-pill" className="absolute inset-0 rounded-full bg-ink" transition={{ type: "spring", stiffness: 380, damping: 32 }} />
                )}
                <span className="relative">{formulas[t].label}</span>
              </button>
            );
          })}
        </div>
        <p className="mt-4 text-center text-ink-muted">{formulas[formula].blurb}</p>

        <div id="range-panel" role="tabpanel" className="mt-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={formula}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {flavours.map((f) => (
                <PackCard key={f.slug} flavour={f} formula={formula} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
