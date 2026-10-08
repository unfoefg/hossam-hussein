// Step 03 — Library Layer
// Central site configuration: brand text, navigation, about info.
// It exists so copy and navigation are edited in ONE place, never inside JSX.
import { Briefcase, Cpu, Home, LayoutGrid, Send, User } from "lucide-react";
import type { NavItem } from "@/types";

export const SITE = {
  name: "Hossam Hussein",
  shortName: "Hossam",
  role: "Designer & Full-Stack Developer",
  tagline:
    "I design and build digital experiences that turn ideas into meaningful products.",
  description:
    "Hossam Hussein is a designer and full-stack developer who designs and builds digital products, from visual identity to production code.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
} as const;

// Fixed copyright year. Next 16 forbids new Date() during prerender,
// so the year lives here and is bumped manually once a year.
export const COPYRIGHT_YEAR = 2026;

export const THEME_STORAGE_KEY = "theme";
export const HERO_IMAGE = "/images/profile/photo_2026-08-06_10-37-07.jpg";

/** The six primary destinations (mobile sheet + desktop bar). */
export const NAV_ITEMS: NavItem[] = [
  { id: "home", label: "Home", icon: Home },
  { id: "about", label: "About", icon: User },
  { id: "skills", label: "Skills", icon: Cpu },
  { id: "services", label: "Services", icon: Briefcase },
  { id: "portfolio", label: "Portfolio", icon: LayoutGrid },
  { id: "contact", label: "Contact", icon: Send },
];

/** Every section on the page (journey/design are highlighted under "portfolio"). */
export const SECTION_IDS = [
  "home",
  "about",
  "skills",
  "services",
  "portfolio",
  "journey",
  "design",
  "contact",
] as const;

export const ABOUT = {
  paragraphs: [
    "I'm a designer and full-stack developer based in Egypt. I work across the whole product, from visual identity and interface design to the code that ships it.",
    "My focus is digital products: clear, fast, and carefully crafted from the first sketch to production.",
  ],
  info: [
    { label: "Based in", value: "Egypt" },
    { label: "Specialization", value: "Design & Development" },
    { label: "Focus", value: "Digital Products" },
  ],
} as const;