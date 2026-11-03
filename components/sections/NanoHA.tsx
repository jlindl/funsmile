"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Highlight from "@/components/ui/Highlight";
import Icon from "@/components/ui/Icon";
import { NANO_HA } from "@/lib/products";

const points = [
  { title: "Made of what teeth are made of", body: "Hydroxyapatite is the mineral your enamel is mostly built from." },
  { title: "Super-fine particles", body: "The nano form is tiny enough to settle into microscopic weak spots on the tooth surface." },
  { title: "Fluoride-free", body: "It's the active ingredient in every FunSmile fluoride-free flavour." },
];

// Honeycomb of enamel "crystals". Some start as gaps and get filled by nano‑HA.
const COLS = 9;
const ROWS = 6;
const GAPS = new Set([3, 11, 15, 21, 25, 31, 38, 42, 47]);
const R = 26;
const W = Math.sqrt(3) * R;

function hexPath(cx: number, cy: number, r: number) {
  return Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i - Math.PI / 6;
    return `${i ? "L" : "M"}${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`;
  }).join("") + "Z";
}

export default function NanoHA() {
  return (
    <section id="nano-ha" aria-labelledby="nano-title" className="scroll-mt-28 pb-20 sm:pb-28">
      <div className="mx-auto max-w-7xl px-3 sm:px-8">
        <div className="grid items-center gap-10 overflow-hidden rounded-[2rem] bg-leaf-soft px-5 py-8 sm:rounded-[3rem] sm:p-12 lg:grid-cols-2 lg:gap-12 lg:p-16">
          <div>
            <Reveal>
              <SectionHeading
                align="left"
                eyebrow="Our fluoride-free hero"
                title={
                  <span id="nano-title">
                    Meet <Highlight className="text-leaf" curve="text-sky">nano‑HA</Highlight>.
                  </span>
                }
                sub={NANO_HA.what}
              />
            </Reveal>
            <ul className="mt-8 space-y-4">
              {points.map((p, i) => (
                <Reveal key={p.title} delay={0.1 + i * 0.08}>
                  <li className="flex gap-4">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-leaf text-white">
                      <Icon name="check" className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="font-display text-xl font-semibold">{p.title}</h3>
                      <p className="text-ink-muted">{p.body}</p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
          <EnamelGraphic />
        </div>
      </div>
    </section>
  );
}

function EnamelGraphic() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();
  const filled = inView || reduce;

  const cells = [];
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const i = row * COLS + col;
      cells.push({ i, cx: W / 2 + col * W + (row % 2 ? W / 2 : 0), cy: R + row * R * 1.5, gap: GAPS.has(i) });
    }
  }
  const width = W * COLS + W / 2;
  const height = R * 1.5 * (ROWS - 1) + R * 2;

  return (
    <div ref={ref} className="relative">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full drop-shadow-[0_20px_30px_rgba(25,163,90,0.18)]" role="img" aria-label="Illustration: nano-hydroxyapatite particles filling weak spots in tooth enamel">
        {cells.map((c) =>
          c.gap ? (
            <g key={c.i}>
              {/* Weak spot outline */}
              <path d={hexPath(c.cx, c.cy, R - 3)} fill="none" stroke="#19a35a" strokeOpacity="0.35" strokeWidth="2" strokeDasharray="4 4" />
              {/* Nano-HA particle flying in to fill it */}
              <motion.path
                d={hexPath(c.cx, c.cy, R - 3)}
                fill="#19a35a"
                initial={false}
                animate={filled ? { opacity: 1, scale: 1, x: 0, y: 0 } : { opacity: 0, scale: 0.2, x: (c.i % 3) * 30 - 30, y: -80 }}
                transition={{ type: "spring", stiffness: 120, damping: 12, delay: reduce ? 0 : 0.3 + (c.i % 9) * 0.09 }}
                style={{ transformOrigin: `${c.cx}px ${c.cy}px` }}
              />
            </g>
          ) : (
            <path key={c.i} d={hexPath(c.cx, c.cy, R - 3)} fill="#fff" stroke="#bfe9d2" strokeWidth="2" />
          ),
        )}
      </svg>
      <div className="mt-5 flex flex-wrap justify-center gap-4 text-sm font-semibold text-ink-soft">
        <span className="flex items-center gap-2">
          <span className="h-4 w-4 rounded bg-white ring-2 ring-[#bfe9d2]" /> Enamel
        </span>
        <span className="flex items-center gap-2">
          <span className="h-4 w-4 rounded border-2 border-dashed border-leaf/50" /> Weak spot
        </span>
        <span className="flex items-center gap-2">
          <span className="h-4 w-4 rounded bg-leaf" /> Filled by nano‑HA
        </span>
      </div>
    </div>
  );
}
