// Step 07 — Data Layer
// Skill groups (tags only, no fake percentages). Edit freely.
import { Code2, PenTool } from "lucide-react";
import type { SkillGroup } from "@/types";

export const SKILL_GROUPS: SkillGroup[] = [
  {
    id: "development",
    title: "Development",
    description: "Building fast, typed, production-ready products.",
    icon: Code2,
    tone: "brand",
    skills: ["Next.js", "TypeScript", "React", "Tailwind CSS", "Rust", "PostgreSQL"],
  },
  {
    id: "design",
    title: "Design",
    description: "Shaping how products look, feel, and communicate.",
    icon: PenTool,
    tone: "plain",
    skills: ["UI / UX Design", "Visual Identity", "Graphic Design", "Digital Design"],
  },
];