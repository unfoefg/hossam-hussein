// Step 08 — Data Layer
// The four services shown in the Services section.
import { Code2, Fingerprint, Layers, PenTool } from "lucide-react";
import type { Service } from "@/types";

export const SERVICES: Service[] = [
  {
    id: "web",
    title: "Web Development",
    description: "Fast, accessible websites and web apps built with modern tooling.",
    icon: Code2,
  },
  {
    id: "uiux",
    title: "UI / UX Design",
    description: "Clear interfaces and flows designed around real user needs.",
    icon: PenTool,
  },
  {
    id: "identity",
    title: "Visual Identity",
    description: "Logos and brand systems that stay consistent across every touchpoint.",
    icon: Fingerprint,
  },
  {
    id: "fullstack",
    title: "Full-Stack Solutions",
    description: "From database to interface: complete products, designed and shipped.",
    icon: Layers,
  },
];