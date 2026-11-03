export type Formula = "fluoride" | "fluoride-free";

export type Flavour = {
  slug: string;
  name: string;
  short: string;
  tagline: string;
  description: string;
  notes: string[];
  image: string;
  /** Pack colours, used for card tints and accents. */
  colour: string;
  soft: string;
  deep: string;
  pop: string;
};

export const LAUNCH_YEAR = 2027;
export const PACK_SIZE = "60g | 2.1 oz";

export const flavours: Flavour[] = [
  {
    slug: "watermelon-fresh",
    name: "Watermelon Fresh",
    short: "Watermelon",
    tagline: "Juicy, sweet and summer-holiday bright.",
    description:
      "A burst of ripe watermelon with a cool, clean finish. It tastes like a summer holiday, and your mouth feels properly fresh afterwards.",
    notes: ["Ripe watermelon", "Cool mint finish", "Sweet, never sickly"],
    image: "/products/watermelon.png",
    colour: "#ff3b5c",
    soft: "#ffe3e8",
    deep: "#0f7a3d",
    pop: "#2fbf5f",
  },
  {
    slug: "cotton-candy",
    name: "Cotton Candy",
    short: "Cotton Candy",
    tagline: "Fairground fluffy, minus the sugar rush.",
    description:
      "Soft, sweet cotton candy flavour that turns brushing into a treat. A fun reason to brush for the full two minutes.",
    notes: ["Fluffy candy floss", "Light vanilla", "Gentle sweetness"],
    image: "/products/cotton-candy.png",
    colour: "#ff3d97",
    soft: "#ffe2f0",
    deep: "#0a8fd1",
    pop: "#43c6f5",
  },
  {
    slug: "blue-raspberry",
    name: "Blue Raspberry",
    short: "Blue Raspberry",
    tagline: "Tangy, zingy and impossibly blue.",
    description:
      "A sharp, tangy blue raspberry hit with a fresh, zingy finish. Bold flavour for people who think brushing is boring.",
    notes: ["Tangy blue raspberry", "Zesty lift", "Fresh, clean finish"],
    image: "/products/blue-raspberry.png",
    colour: "#1f4fd8",
    soft: "#e1e9fc",
    deep: "#0b2f9e",
    pop: "#4fe0cf",
  },
];

export const formulas: Record<
  Formula,
  { label: string; title: string; blurb: string; points: string[] }
> = {
  fluoride: {
    label: "Fluoride",
    title: "Fluoride formula",
    blurb: "Fluoride helps protect against cavities and strengthen enamel.",
    points: ["Cavity protection", "Strengthens enamel", "Fresh breath"],
  },
  "fluoride-free": {
    label: "Fluoride-free",
    title: "Fluoride-free formula",
    blurb: "The same flavours and the same fun, made for anyone who prefers to go fluoride-free.",
    points: ["No fluoride", "Fresh breath", "Same great flavours"],
  },
};

/**
 * Trust claims shown across the site. Every line here must be backed by real
 * test reports and certificates before launch. Edit, don't embellish.
 */
export const claims = [
  {
    title: "Lab tested",
    body: "Every formula goes through independent laboratory testing before it reaches a shelf.",
  },
  {
    title: "Certified safe",
    body: "Safety assessed and certified to UK and EU cosmetic regulations.",
  },
  {
    title: "Fluoride or fluoride-free",
    body: "Every flavour comes in both formulas, so you can choose what suits you.",
  },
  {
    title: "No-mess pump",
    body: "The 60g pump gives a clean, measured amount. No squeezed-flat tubes, no crusty caps.",
  },
];

export const getFlavour = (slug: string) => flavours.find((f) => f.slug === slug);
