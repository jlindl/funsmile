"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { LAUNCH_YEAR } from "@/lib/products";

const stats = [
  { value: 3, label: "Fun flavours", colour: "text-melon" },
  { value: 2, label: "Formulas", colour: "text-berry" },
  { value: 60, suffix: "g", label: "No-mess pump", colour: "text-candy" },
  { value: LAUNCH_YEAR, label: "Launch year", colour: "text-leaf", from: 2000 },
];

export default function Stats() {
  return (
    <section aria-label="FunSmile in numbers" className="border-y border-line bg-white">
      <dl className="mx-auto grid max-w-7xl grid-cols-2 px-5 sm:px-8 lg:grid-cols-4">
        {stats.map((s, i) => (
          <div key={s.label} className={`flex flex-col-reverse py-10 text-center ${i % 2 ? "border-l border-line" : ""} ${i > 0 ? "lg:border-l lg:border-line" : ""}`}>
            <dt className="mt-1 font-display font-bold text-ink-muted">{s.label}</dt>
            <dd className={`font-display text-5xl font-extrabold tracking-tight sm:text-6xl ${s.colour}`}>
              <Counter to={s.value} from={s.from ?? 0} />
              {s.suffix}
            </dd>
          </div>
        ))}
      </dl>
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
