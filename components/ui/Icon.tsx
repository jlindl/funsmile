type Name = "sparkle" | "check" | "flask" | "shield" | "leaf" | "pump" | "drop" | "smile" | "arrow";

const paths: Record<Name, React.ReactNode> = {
  // The three "shine" dashes from the FunSmile wordmark.
  sparkle: (
    <g strokeWidth="3" strokeLinecap="round">
      <path d="M4 15 9 13" />
      <path d="M11 8.5 12.5 3" />
      <path d="M16 11 20.5 7" />
    </g>
  ),
  check: <path d="m5 12.5 4.5 4.5L19 7.5" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />,
  flask: (
    <g strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 3h6M10 3v6.2L4.8 18a2 2 0 0 0 1.7 3h11a2 2 0 0 0 1.7-3L14 9.2V3" />
      <path d="M7.2 14h9.6" />
    </g>
  ),
  shield: (
    <g strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.2 7.5 9.5 4.3-1.3 7.5-4.9 7.5-9.5V6L12 3Z" />
      <path d="m8.5 12 2.5 2.5 4.5-5" />
    </g>
  ),
  leaf: (
    <g strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 19c0-8 5-13 15-14-.5 9.5-5.5 14.5-13.5 14.5" />
      <path d="M5 19c2.5-4 5.5-6.5 9-8" />
    </g>
  ),
  pump: (
    <g strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 3h5v3H9zM14 4.5h3" />
      <path d="M8 9h7v12H8z" />
      <path d="M10.5 6v3" />
    </g>
  ),
  drop: <path d="M12 3.5s6 6.4 6 10.5a6 6 0 0 1-12 0c0-4.1 6-10.5 6-10.5Z" strokeWidth="2" strokeLinejoin="round" />,
  smile: (
    <g strokeWidth="2.4" strokeLinecap="round">
      <path d="M6.5 13.5c2.8 4 8.2 4 11 0" />
      <path d="M9 8.5v.5M15 8.5v.5" />
    </g>
  ),
  arrow: <path d="M5 12h14m-5-5 5 5-5 5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />,
};

export default function Icon({ name, className = "h-5 w-5" }: { name: Name; className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className}>
      {paths[name]}
    </svg>
  );
}
