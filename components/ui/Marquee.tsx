type Props = {
  items: string[];
  reverse?: boolean;
  duration?: string;
  className?: string;
  itemClassName?: string;
  separator?: React.ReactNode;
};

/** Infinite ticker. Content is doubled so the -50% keyframe loops seamlessly. */
export default function Marquee({
  items,
  reverse,
  duration = "40s",
  className = "",
  itemClassName = "",
  separator = "✦",
}: Props) {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {items.map((item, i) => (
        <li key={i} className={`flex items-center whitespace-nowrap ${itemClassName}`}>
          {item}
          <span aria-hidden className="mx-5 opacity-60">{separator}</span>
        </li>
      ))}
    </ul>
  );
  return (
    <div className={`overflow-hidden ${className}`}>
      <div
        className={`flex w-max ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}
        style={{ "--marquee-duration": duration } as React.CSSProperties}
      >
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
