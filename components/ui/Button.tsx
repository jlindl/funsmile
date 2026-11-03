import Link from "next/link";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "candy" | "berry" | "outline" | "white";
  className?: string;
};

// Chunky "squishy" buttons: a solid drop shadow that presses in on hover.
const styles = {
  candy: "bg-candy text-white shadow-[0_6px_0_0_var(--color-candy-deep)] hover:shadow-[0_2px_0_0_var(--color-candy-deep)] hover:translate-y-1",
  berry: "bg-berry text-white shadow-[0_6px_0_0_var(--color-berry-deep)] hover:shadow-[0_2px_0_0_var(--color-berry-deep)] hover:translate-y-1",
  outline: "bg-white text-ink ring-2 ring-ink/12 shadow-[0_6px_0_0_var(--color-line)] hover:shadow-[0_2px_0_0_var(--color-line)] hover:translate-y-1",
  white: "bg-white text-ink shadow-[0_6px_0_0_rgba(30,27,75,0.25)] hover:shadow-[0_2px_0_0_rgba(30,27,75,0.25)] hover:translate-y-1",
};

export default function Button({ href, children, variant = "candy", className = "" }: Props) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 font-display text-lg font-semibold transition-all duration-200 ease-out active:scale-95 focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-sky ${styles[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
