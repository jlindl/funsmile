"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PackCard from "@/components/PackCard";
import Tilt from "@/components/ui/Tilt";
import SectionHeading from "@/components/ui/SectionHeading";
import Highlight from "@/components/ui/Highlight";
import Reveal from "@/components/ui/Reveal";
import Wave from "@/components/ui/Wave";
import { flavours, formulas, type Formula } from "@/lib/products";

const tabs: Formula[] = ["fluoride", "fluoride-free"];

export default function Range() {
  const [formula, setFormula] = useState<Formula>("fluoride");

  return (
    <section id="range" className="scroll-mt-28 bg-mist">
      <div className="mx-auto max-w-7xl px-5 pb-20 pt-20 sm:px-8 sm:pt-24">
        <Reveal>
          <SectionHeading
            eyebrow="The range"
            title={
              <>
                Three flavours. <Highlight className="text-berry" curve="text-candy">Your</Highlight> formula.
              </>
            }
            sub="Every FunSmile flavour comes with fluoride, or fluoride-free with nano-hydroxyapatite, in our no-mess 60g pump."
          />
        </Reveal>

        <div role="tablist" aria-label="Formula" className="mx-auto mt-10 flex w-fit rounded-full bg-white p-1.5 shadow-sm ring-1 ring-line">
          {tabs.map((t) => {
            const active = t === formula;
            return (
              <button
                key={t}
                role="tab"
                aria-selected={active}
                aria-controls="range-panel"
                onClick={() => setFormula(t)}
                className={`relative rounded-full px-6 py-3 font-display text-lg font-semibold transition-colors ${active ? "text-white" : "text-ink-muted hover:text-ink"}`}
              >
                {active && (
                  <motion.span
                    layoutId="formula-pill"
                    className={`absolute inset-0 rounded-full ${t === "fluoride" ? "bg-berry" : "bg-leaf"}`}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
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
              {flavours.map((f, i) => (
                <motion.div
                  key={f.slug}
                  initial={{ opacity: 0, y: 40, scale: 0.96 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ type: "spring", stiffness: 120, damping: 16, delay: i * 0.1 }}
                >
                  <Tilt className="h-full">
                    <PackCard flavour={f} formula={formula} />
                  </Tilt>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <Wave fill="#fff" />
    </section>
  );
}
