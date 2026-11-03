type Props = { fill: string; flip?: boolean; className?: string };

/** Soft wavy edge for joining sections, like a ribbon of toothpaste. */
export default function Wave({ fill, flip, className = "" }: Props) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1440 80"
      preserveAspectRatio="none"
      className={`block h-10 w-full sm:h-16 ${flip ? "rotate-180" : ""} ${className}`}
    >
      <path d="M0 40 C 180 0 360 0 540 32 S 900 80 1080 44 S 1340 6 1440 30 V80 H0 Z" fill={fill} />
    </svg>
  );
}
