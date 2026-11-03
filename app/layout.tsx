import type { Metadata } from "next";
import { Fredoka, Nunito } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const fredoka = Fredoka({ subsets: ["latin"], variable: "--font-fredoka" });
const nunito = Nunito({ subsets: ["latin"], variable: "--font-nunito" });

export const metadata: Metadata = {
  title: "FunSmile | Flavoured toothpaste, launching 2027",
  description:
    "Watermelon Fresh, Cotton Candy and Blue Raspberry toothpaste with fluoride, or fluoride-free with nano-hydroxyapatite. Lab tested, certified, and launching in 2027.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-GB" className={`${fredoka.variable} ${nunito.variable}`}>
      <body className="antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <SmoothScroll />
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
