import Hero from "@/components/sections/Hero";
import FlavourMarquee from "@/components/sections/FlavourMarquee";
import Range from "@/components/sections/Range";
import Stats from "@/components/sections/Stats";
import FlavourPicker from "@/components/sections/FlavourPicker";
import Formulas from "@/components/sections/Formulas";
import NanoHA from "@/components/sections/NanoHA";
import LabTested from "@/components/sections/LabTested";
import Pump from "@/components/sections/Pump";
import Faq, { faqs } from "@/components/sections/Faq";
import Waitlist from "@/components/sections/Waitlist";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function Home() {
  return (
    <>
      <Hero />
      <FlavourMarquee />
      <Range />
      <Stats />
      <div className="py-24 sm:py-32">
        <FlavourPicker />
      </div>
      <LabTested />
      <Formulas />
      <NanoHA />
      <Pump />
      <Faq />
      <Waitlist />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  );
}
