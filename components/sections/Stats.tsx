"use client";

import { animate, motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { LAUNCH_YEAR } from "@/lib/products";

const stats = [
  { value: 3, label: "yummy flavours", bg: "bg-melon", size: "h-40 w-40 sm:h-44 sm:w-44" },
  { value: 2, label: "formulas", bg: "bg-berry", size: "h-36 w-36 sm:h-40 sm:w-40" },
  { value: 60, suffix: "g", label: "no-mess pump", bg: "bg-candy", size: "h-40 w-40 sm:h-48 sm:w-48" },
  { value: LAUNCH_YEAR, from: 2000, label: "launch year", bg: "bg-sky", size: "h-40 w-40 sm:h-44 sm:w-44" },
];

/** FunSmile in numbers, shown as a cluster of bobbing bubbles over a toothpaste ribbon. */
export default function Stats() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const draw = useTransform(scrollYProgress, [0.1, 0.6], [0, 1]);

  return (
    <section ref={ref} aria-label="FunSmile in numbers" className="relative overflow-hidden py-16 sm:py-20">
      {/* A squeeze of two-tone paste that draws itself as you scroll past. */}
      <svg aria-hidden viewBox="0 0 1440 320" preserveAspectRatio="none" className="absolute inset-x-0 top-1/2 h-64 w-full -translate-y-1/2">
        {[
          { stroke: "var(--color-candy-soft)", width: 46 },
          { stroke: "var(--color-sky-soft)", width: 18 },
        ].map((p) => (
          <motion.path
            key={p.stroke}
            d="M-40 220 C 160 40 300 300 480 160 S 760 20 900 170 S 1200 300 1480 90"
            fill="none"
            stroke={p.stroke}
            strokeWidth={p.width}
            strokeLinecap="round"
            style={{ pathLength: reduce ? 1 : draw }}
          />
        ))}
      </svg>
      <ul className="relative mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-4 px-5 sm:gap-6">
        {stats.map((s, i) => (
          <motion.li
            key={s.label}
            initial={reduce ? false : { opacity: 0, scale: 0.3 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ type: "spring", stiffness: 220, damping: 12, delay: i * 0.12 }}
          >
            <div
              className={`relative flex animate-float flex-col items-center justify-center rounded-full text-center text-white shadow-[inset_0_-10px_0_0_rgba(0,0,0,0.08)] ${s.bg} ${s.size}`}
              style={{ animationDelay: `${i * -1.5}s`, "--tilt": "0deg" } as React.CSSProperties}
            >
              <span aria-hidden className="absolute left-[22%] top-[16%] h-5 w-8 -rotate-30 rounded-full bg-white/35" />
              <span className="font-display text-5xl font-semibold leading-none sm:text-6xl">
                <Counter to={s.value} from={s.from ?? 0} />
                {s.suffix}
              </span>
              <span className="font-display font-medium text-white/90">{s.label}</span>
            </div>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}

function Counter({ to, from }: { to: number; from: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  // Render the real value on the server so the number is never a placeholder.
  const [n, setN] = useState(to);

  useEffect(() => {
    if (!inView || reduce) return;
    const c = animate(from, to, { duration: 1.4, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [inView, reduce, from, to]);

  return <span ref={ref}>{n}</span>;
}
