"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";

type Props = { children: React.ReactNode; className?: string; max?: number };

/** Tilts its content towards the mouse in 3D, then springs back. */
export default function Tilt({ children, className = "", max = 8 }: Props) {
  const reduce = useReducedMotion();
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [max, -max]), { stiffness: 200, damping: 18 });
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-max, max]), { stiffness: 200, damping: 18 });

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };
  const reset = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <div className={`[perspective:1000px] ${className}`} onPointerMove={onMove} onPointerLeave={reset}>
      <motion.div className="h-full [transform-style:preserve-3d]" style={{ rotateX, rotateY }}>
        {children}
      </motion.div>
    </div>
  );
}
