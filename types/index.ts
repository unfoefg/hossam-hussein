// Step 03 — Types Layer
// Shared TypeScript contracts for every data file and component.
// It exists so data (src/data) and UI (src/components) stay decoupled
// and strictly typed (no `any`).
import type { ComponentType } from "react";
import type { LucideIcon } from "lucide-react";

/** Props every icon (Lucide or our inline brand SVGs) must accept. */
export interface IconProps {
  className?: string;
  "aria-hidden"?: boolean | "true" | "false";
}

/** Any icon component: a Lucide icon or a custom SVG icon. */
export type IconComponent = ComponentType<IconProps>;

export interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

export interface SocialLink {
  id: "github" | "linkedin" | "email" | "upwork";
  label: string;
  href: string;
  icon: IconComponent;
}

export interface SkillGroup {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  tone: "brand" | "plain";
  skills: string[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  href: string;
  /** Path under /public, e.g. "/images/projects/english-web.jpg" */
  image?: string;
}

export interface ExperienceItem {
  year: string;
  title: string;
  description: string;
}

export type DesignCategory = "Branding" | "Posters" | "Social Media" | "UI Design";

export interface DesignItem {
  id: string;
  title: string;
  category: DesignCategory;
  alt: string;
  /** Path under /public/images/designs. Without it, a branded placeholder tile renders. */
  src?: string;
  featured?: boolean;
}