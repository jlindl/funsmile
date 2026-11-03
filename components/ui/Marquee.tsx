type Props = {
  children: React.ReactNode;
  duration?: string;
  className?: string;
};

/** Infinite horizontal scroller. Content is doubled so the -50% keyframe loops seamlessly. */
export default function Marquee({ children, duration = "40s", className = "" }: Props) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]" style={{ "--marquee-duration": duration } as React.CSSProperties}>
        <div className="flex shrink-0 items-center gap-4 pr-4">{children}</div>
        <div aria-hidden className="flex shrink-0 items-center gap-4 pr-4">{children}</div>
      </div>
    </div>
  );
}
