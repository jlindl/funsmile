type Props = { children: React.ReactNode; className?: string; style?: React.CSSProperties };

export default function Badge({ children, className = "", style }: Props) {
  return (
    <span style={style} className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-display text-sm font-semibold ${className}`}>
      {children}
    </span>
  );
}
