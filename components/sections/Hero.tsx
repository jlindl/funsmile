"use client";

import Image from "next/image";
import { Fragment, useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import Button from "@/components/ui/Button";
import Bubbles from "@/components/ui/Bubbles";
import Highlight from "@/components/ui/Highlight";
import Icon from "@/components/ui/Icon";
import Wave from "@/components/ui/Wave";
import { flavours, LAUNCH_YEAR } from "@/lib/products";

// Fan layout for the three packs: offset, tilt, stacking, parallax depth.
const fan = [
  { x: "-64%", rotate: -14, z: 1, depth: 18, delay: 0.15 },
  { x: "0%", rotate: 0, z: 3, depth: 32, delay: 0 },
  { x: "64%", rotate: 14, z: 2, depth: 24, delay: 0.3 },
];

const trust = [
  { icon: "flask" as const, label: "Lab tested", colour: "bg-sky" },
  { icon: "shield" as const, label: "Certified safe", colour: "bg-berry" },
  { icon: "leaf" as const, label: "Fluoride or nano‑HA", colour: "bg-leaf" },
];

export default function Hero() {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });

  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  // Scrolling away: packs float up and fan wider, copy eases out.
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const stageY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const stageRotate = useTransform(scrollYProgress, [0, 1], [0, -6]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.2]);

  const enter = (delay: number) =>
    reduce ? {} : { initial: { opacity: 0, y: 22 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] as const } };

  return (
    <section ref={ref} onPointerMove={onMove} className="relative overflow-hidden bg-gradient-to-b from-white via-white to-blush">
      <div className="relative mx-auto grid max-w-7xl items-center gap-6 px-5 pb-6 pt-8 sm:gap-8 sm:px-8 sm:pb-10 sm:pt-10 lg:grid-cols-[1.05fr_1fr] lg:pb-16 lg:pt-14">
        <motion.div style={reduce ? undefined : { y: copyY, opacity: copyOpacity }}>
          <motion.p {...enter(0)} className="inline-flex items-center gap-2 rounded-full bg-sky-soft px-4 py-2 font-display font-semibold text-sky-deep">
            <Icon name="sparkle" className="h-4 w-4" />
            Brand new · Launching {LAUNCH_YEAR}
          </motion.p>

          <h1 className="mt-6 font-display text-[clamp(3.1rem,7.4vw,6rem)] font-semibold leading-[0.95] tracking-[-0.02em] text-balance">
            {["Brushing", "just", "got"].map((w, i) => (
              <Fragment key={w}>
                <PopWord delay={0.08 + i * 0.08} reduce={!!reduce}>
                  {w}
                </PopWord>{" "}
              </Fragment>
            ))}
            <PopWord delay={0.36} reduce={!!reduce} bouncy>
              <Highlight>delicious!</Highlight>
            </PopWord>
          </h1>

          <motion.p {...enter(0.16)} className="mt-7 max-w-xl text-lg text-ink-muted sm:text-xl">
            Meet Watermelon Fresh, Cotton Candy and Blue Raspberry. Seriously tasty toothpaste with fluoride, or fluoride-free with nano-hydroxyapatite. Lab tested to keep smiles healthy.
          </motion.p>

          <motion.div {...enter(0.24)} className="mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap sm:gap-4">
            <Button href="#waitlist" className="w-full sm:w-auto">Get notified at launch</Button>
            <Button href="#range" variant="outline" className="w-full sm:w-auto">Meet the flavours</Button>
          </motion.div>

          <motion.ul {...enter(0.32)} className="mt-8 flex flex-wrap gap-2 sm:mt-10 sm:gap-3">
            {trust.map((t) => (
              <li key={t.label} className="flex items-center gap-2 rounded-full bg-white py-1.5 pl-1.5 pr-4 font-display font-medium text-ink-soft shadow-sm ring-1 ring-line">
                <span className={`grid h-7 w-7 place-items-center rounded-full text-white ${t.colour}`}>
                  <Icon name={t.icon} className="h-4 w-4" />
                </span>
                {t.label}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        <motion.div
          className="relative mx-auto h-[380px] w-full max-w-[540px] sm:h-[580px]"
          style={reduce ? undefined : { y: stageY, rotate: stageRotate }}
        >
          <Blob />
          <Bubbles tint="#2ec5f5" count={8} />
          {flavours.map((f, i) => (
            <Pack key={f.slug} index={i} src={f.image} name={f.name} sx={sx} sy={sy} reduce={!!reduce} />
          ))}
          <LaunchSeal />
        </motion.div>
      </div>
      <Wave fill="var(--color-mist)" />
    </section>
  );
}

/** A headline word that springs up into place. */
function PopWord({ children, delay, reduce, bouncy }: { children: React.ReactNode; delay: number; reduce: boolean; bouncy?: boolean }) {
  return (
    <motion.span
      className="inline-block"
      initial={reduce ? false : { opacity: 0, y: 40, rotate: bouncy ? -8 : 0, scale: bouncy ? 0.6 : 1 }}
      animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: bouncy ? 260 : 200, damping: bouncy ? 11 : 18, delay }}
    >
      {children}
    </motion.span>
  );
}

function Pack({
  index,
  src,
  name,
  sx,
  sy,
  reduce,
}: {
  index: number;
  src: string;
  name: string;
  sx: MotionValue<number>;
  sy: MotionValue<number>;
  reduce: boolean;
}) {
  const f = fan[index];
  const px = useTransform(sx, (v) => v * f.depth);
  const py = useTransform(sy, (v) => v * f.depth);
  return (
    <motion.div className="absolute left-1/2 top-1/2" style={{ zIndex: f.z, x: px, y: py }}>
      {/* Positioning lives on a plain div: framer-motion owns transform on the animated one. */}
      <div style={{ transform: `translate(-50%, -50%) translateX(${f.x})` }}>
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 90, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 90, damping: 14, delay: 0.25 + f.delay }}
        >
          <div className="animate-float" style={{ "--tilt": `${f.rotate}deg`, animationDelay: `${index * -2}s` } as React.CSSProperties}>
            <Image
              src={src}
              alt={`FunSmile ${name} toothpaste`}
              width={320}
              height={1500}
              priority
              className="h-[300px] w-auto drop-shadow-[0_28px_28px_rgba(30,27,75,0.22)] sm:h-[480px]"
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

/** Organic pink-to-blue blob behind the packs. */
function Blob() {
  return (
    <svg aria-hidden viewBox="0 0 500 500" className="absolute left-1/2 top-1/2 aspect-square h-[92%] max-w-[110%] -translate-x-1/2 -translate-y-1/2">
      <defs>
        <linearGradient id="hero-blob" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffd0e6" />
          <stop offset="0.55" stopColor="#e9dcff" />
          <stop offset="1" stopColor="#c9f0fd" />
        </linearGradient>
      </defs>
      <path
        fill="url(#hero-blob)"
        d="M421 117c39 52 52 129 29 194s-83 118-154 140-152 13-201-37S30 280 44 211 107 85 171 57s150-31 205 5c16 10 31 27 45 55Z"
      />
    </svg>
  );
}

/** Scalloped "2027" seal that wobbles. */
function LaunchSeal() {
  const points = Array.from({ length: 24 }, (_, i) => {
    const a = (i / 24) * Math.PI * 2;
    const r = i % 2 ? 44 : 50;
    return `${(50 + r * Math.cos(a)).toFixed(2)},${(50 + r * Math.sin(a)).toFixed(2)}`;
  }).join(" ");
  return (
    <div className="absolute right-0 top-0 z-10 grid h-24 w-24 animate-wiggle place-items-center sm:right-4 sm:top-6 sm:h-32 sm:w-32">
      <svg viewBox="0 0 100 100" className="absolute inset-0 drop-shadow-[0_10px_14px_rgba(35,70,216,0.35)]" aria-hidden>
        <polygon points={points} className="fill-berry" strokeLinejoin="round" />
        <circle cx="50" cy="50" r="36" fill="none" stroke="white" strokeOpacity="0.35" strokeWidth="1.5" strokeDasharray="3 4" />
      </svg>
      <span className="relative text-center font-display font-semibold leading-none text-white">
        <span className="block text-xs text-sky-soft">Coming</span>
        <span className="text-2xl sm:text-3xl">{LAUNCH_YEAR}</span>
      </span>
    </div>
  );
}
