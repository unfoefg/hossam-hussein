// Step 09 — Data Layer
// Selected projects. Add/remove objects here and the page updates.
// Names/descriptions come from your own projects; technologies are a starting
// point (TODO: adjust per project). Replace "#" with live URLs and add `image`.
import type { Project } from "@/types";

export const PROJECTS: Project[] = [
  {
    id: "english-web",
    title: "English Web",
    description:
      "An Arabic-language platform for learning English, backed by a custom text-analysis engine.",
    technologies: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS"],
    href: "https://english-web-pro.vercel.app/",
  },
  {
    id: "center-plus",
    title: "Center+",
    description:
      "A management system for educational centers with dedicated portals for each role.",
    technologies: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS"],
    href: "https://centerplus-pro.vercel.app/",
  },
  {
    id: "souq-el-hay",
    title: "Souq El Hay",
    description:
      "A neighborhood shops and delivery PWA for Egypt, built around cash on delivery.",
    technologies: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS"],
    href: "https://souq-el-hay.vercel.app/",
  },
  {
    id: "code-plus",
    title: "Code+",
    description:
      "A coding-education platform with an Arabic RTL interface and a bold black, red and white identity.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    href: "#",
  },
];