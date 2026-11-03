"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Pink-to-blue "toothpaste" bar under the header that fills as you scroll. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden
      className="absolute inset-x-0 bottom-0 h-1 origin-left rounded-r-full bg-gradient-to-r from-candy via-[#b94dd6] to-sky"
      style={{ scaleX }}
    />
  );
}
