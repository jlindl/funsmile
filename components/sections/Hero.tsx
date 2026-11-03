"use client";

import Image from "next/image";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import Button from "@/components/ui/Button";
import { flavours, LAUNCH_YEAR } from "@/lib/products";

// Fan layout for the three packs: offset, tilt, depth.
const fan = [
  { x: "-62%", rotate: -14, z: 1, depth: 18, delay: 0.15 },
  { x: "0%", rotate: 0, z: 3, depth: 32, delay: 0 },
  { x: "62%", rotate: 14, z: 2, depth: 24, delay: 0.3 },
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

  return (
    <section onPointerMove={onMove} className="relative overflow-hidden">
      <Blobs />
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 pb-20 pt-10 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:pb-28 lg:pt-16">
        <div>
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 font-display text-sm font-bold shadow-sm ring-1 ring-line"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-candy opacity-60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-candy" />
            </span>
            New brand · Launching {LAUNCH_YEAR}
          </motion.p>

          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 font-display text-[clamp(3rem,7.5vw,6.25rem)] font-extrabold leading-[0.92] tracking-[-0.035em] text-balance"
          >
            Brushing just got{" "}
            <span className="relative inline-block font-serif font-normal italic tracking-normal text-candy">
              delicious
              <svg aria-hidden viewBox="0 0 300 20" className="absolute -bottom-2 left-0 w-full text-sun" preserveAspectRatio="none">
                <path d="M4 14 Q150 -4 296 12" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
              </svg>
            </span>
            .
          </motion.h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.18 }}
            className="mt-7 max-w-xl text-lg text-ink-muted sm:text-xl"
          >
            Watermelon Fresh, Cotton Candy and Blue Raspberry toothpaste, in fluoride and fluoride-free formulas. Seriously fun to use, and lab tested to work.
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.26 }}
            className="mt-9 flex flex-wrap gap-4"
          >
            <Button href="#waitlist" variant="sun">Join the launch list</Button>
            <Button href="#range" variant="secondary">Meet the flavours</Button>
          </motion.div>

          <motion.ul
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-10 flex flex-wrap gap-x-6 gap-y-3 font-display text-sm font-bold text-ink/80"
          >
            {["Lab tested", "Certified safe", "Fluoride & fluoride-free"].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-leaf text-xs text-white">✓</span>
                {t}
              </li>
            ))}
          </motion.ul>
        </div>

        <div className="relative mx-auto h-[460px] w-full max-w-[520px] sm:h-[560px]">
          <div aria-hidden className="absolute left-1/2 top-1/2 aspect-square h-[78%] max-w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-sun-soft via-candy-soft to-sky-soft" />
          <Sparkles />
          {flavours.map((f, i) => (
            <Pack key={f.slug} index={i} src={f.image} name={f.name} sx={sx} sy={sy} reduce={!!reduce} />
          ))}
          <LaunchSticker />
        </div>
      </div>
    </section>
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
  sx: ReturnType<typeof useSpring>;
  sy: ReturnType<typeof useSpring>;
  reduce: boolean;
}) {
  const f = fan[index];
  const px = useTransform(sx, (v) => v * f.depth);
  const py = useTransform(sy, (v) => v * f.depth);
  return (
    <motion.div className="absolute left-1/2 top-1/2" style={{ zIndex: f.z, x: px, y: py }}>
      <motion.div
        style={{ transform: `translate(-50%, -50%) translateX(${f.x})` }}
        initial={reduce ? false : { opacity: 0, marginTop: 80 }}
        animate={{ opacity: 1, marginTop: 0 }}
        transition={{ duration: 1.1, delay: 0.25 + f.delay, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="animate-float" style={{ "--tilt": `${f.rotate}deg`, animationDelay: `${index * -2}s` } as React.CSSProperties}>
          <Image
            src={src}
            alt={`FunSmile ${name} toothpaste`}
            width={320}
            height={1500}
            priority
            className="h-[380px] w-auto drop-shadow-[0_30px_30px_rgba(16,38,92,0.18)] sm:h-[480px]"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

function LaunchSticker() {
  return (
    <div className="absolute right-0 top-4 z-10 grid h-28 w-28 place-items-center sm:right-2 sm:h-32 sm:w-32">
      <svg viewBox="0 0 100 100" className="absolute inset-0 animate-spin-slow" aria-hidden>
        <defs>
          <path id="sticker-circle" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
        </defs>
        <circle cx="50" cy="50" r="50" className="fill-ink" />
        <text className="fill-sun font-display text-[10.5px] font-bold uppercase tracking-[0.2em]">
          <textPath href="#sticker-circle">Coming soon ✦ coming soon ✦</textPath>
        </text>
      </svg>
      <span className="relative text-center font-display font-extrabold leading-none text-white">
        <span className="block text-[10px] uppercase tracking-widest text-sky">Launching</span>
        <span className="text-2xl sm:text-3xl">{LAUNCH_YEAR}</span>
      </span>
    </div>
  );
}

function Sparkles() {
  const dots = [
    { c: "bg-melon", s: "h-4 w-4", p: "left-[6%] top-[18%]" },
    { c: "bg-sky", s: "h-3 w-3", p: "right-[10%] top-[48%]" },
    { c: "bg-leaf", s: "h-2.5 w-2.5", p: "left-[14%] bottom-[16%]" },
    { c: "bg-sun", s: "h-5 w-5", p: "right-[18%] bottom-[10%]" },
    { c: "bg-berry", s: "h-3 w-3", p: "left-[40%] top-[4%]" },
  ];
  return (
    <>
      {dots.map((d, i) => (
        <span
          key={i}
          aria-hidden
          className={`absolute animate-float rounded-full ${d.c} ${d.s} ${d.p}`}
          style={{ animationDelay: `${i * -1.3}s` }}
        />
      ))}
    </>
  );
}

function Blobs() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-melon/10 blur-3xl" />
      <div className="absolute -right-32 -top-20 h-[28rem] w-[28rem] rounded-full bg-sky/15 blur-3xl" />
      <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-sun/20 blur-3xl" />
    </div>
  );
}
