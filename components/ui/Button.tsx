import Link from "next/link";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "sun" | "light";
  className?: string;
};

const styles = {
  primary: "bg-ink text-white hover:bg-ink-deep shadow-[0_6px_0_0_#060f2b] hover:shadow-[0_3px_0_0_#060f2b] hover:translate-y-[3px]",
  sun: "bg-sun text-ink-deep shadow-[0_6px_0_0_#d9a800] hover:shadow-[0_3px_0_0_#d9a800] hover:translate-y-[3px]",
  secondary: "bg-white text-ink ring-2 ring-ink/15 hover:ring-ink/40",
  light: "bg-white text-ink hover:bg-sun",
};

export default function Button({ href, children, variant = "primary", className = "" }: Props) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 font-display text-base font-bold transition-all duration-200 ease-out focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-sun ${styles[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
