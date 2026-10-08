# Hossam Hussein — Portfolio Build (Steps 01 → 19)

Stack: Next.js (App Router) · TypeScript · Tailwind CSS v4 · Lucide React · Manrope

**Color system idea — "Blueprint & Signal":**
- **Blue `#004883`** = the structure (type, links, cards, the blueprint grid).
- **Red `#E32934`** = the signal. Only tiny moments: a dot, a hover underline, the active marker, the last timeline node.
- **Dark mode** is not an inversion: deep blue-black `#0A0F18`, a lighter blue `#5AA6EE` for contrast, a brighter red `#FF525C`. The contact block stays `#004883` in both themes so the brand never disappears.
- Dual-tone name: **Hossam** (ink) + **Hussein** (blue). A faint blueprint grid behind the hero says "designer + developer".

**Mobile nav (like your reference):** a fixed bottom bar → `Hossam.` · theme toggle · menu button. The menu opens a sheet with the 6 sections (Home, About, Skills, Services, Portfolio, Contact) with Lucide icons. Desktop gets a normal top bar.

---

## Step 01 — Project foundation

```bash
npx create-next-app@latest hossam-portfolio --ts --tailwind --eslint --app --src-dir --import-alias "@/*"
cd hossam-portfolio
npm i lucide-react
```

No other dependencies. Folders to create under `src/`: `components/{layout,sections,ui,shared}`, `data`, `lib`, `types`, `hooks`. Under `public/`: `images/{profile,projects,designs}`, `icons`.

### `next.config.ts`

```ts
// Step 01 — Foundation Layer
// Project-level Next.js configuration.
// It lives at the repo root and only tunes image output formats so
// next/image serves AVIF/WebP (performance requirement, Step 18).
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: { formats: ["image/avif", "image/webp"] },
};

export default nextConfig;
```

---

## Step 02 — Global styles, typography, colors, design tokens

### `src/app/globals.css`

```css
/* Step 02 — Styling Layer (app/)
   Single source of truth for design tokens (Tailwind v4 @theme),
   light + dark palettes, base styles, and the small motion system.
   Everything else uses semantic classes: bg-primary, text-muted, border-border... */
@import "tailwindcss";

/* Class-based dark mode (toggled by ThemeToggle, Step 14) */
@custom-variant dark (&:where(.dark, .dark *));

:root {
  --background: #f7f9fc;
  --surface: #ffffff;
  --surface-alt: #eaf0f7;
  --foreground: #111318;
  --muted: #6b7280;
  --primary: #004883;
  --on-primary: #ffffff;
  --accent: #e32934;
  --border: #dce4ee;
  --brand: #004883; /* fixed brand blue, same in both themes */
}

.dark {
  --background: #0a0f18;
  --surface: #111826;
  --surface-alt: #172134;
  --foreground: #eef2f8;
  --muted: #98a3b6;
  --primary: #5aa6ee;
  --on-primary: #06101c;
  --accent: #ff525c;
  --border: #233048;
}

@theme inline {
  --color-background: var(--background);
  --color-surface: var(--surface);
  --color-surface-alt: var(--surface-alt);
  --color-foreground: var(--foreground);
  --color-muted: var(--muted);
  --color-primary: var(--primary);
  --color-on-primary: var(--on-primary);
  --color-accent: var(--accent);
  --color-border: var(--border);
  --color-brand: var(--brand);
  --font-sans: var(--font-manrope), ui-sans-serif, system-ui, sans-serif;
}

@layer base {
  *,
  ::before,
  ::after {
    border-color: var(--border);
  }
  html {
    scroll-behavior: smooth;
    scroll-padding-top: 1rem;
  }
  @media (min-width: 48rem) {
    html {
      scroll-padding-top: 5rem;
    }
  }
  body {
    background: var(--background);
    color: var(--foreground);
    font-family: var(--font-sans);
    -webkit-font-smoothing: antialiased;
  }
  :focus-visible {
    outline: 2px solid var(--primary);
    outline-offset: 3px;
  }
  ::selection {
    background: color-mix(in oklab, var(--accent) 25%, transparent);
  }
}

/* Organic, asymmetric profile shapes (two slightly different blobs layered) */
.shape-blob {
  border-radius: 58% 42% 46% 54% / 46% 52% 48% 54%;
}
.shape-blob-alt {
  border-radius: 42% 58% 54% 46% / 52% 44% 56% 48%;
}

/* Blueprint grid — the "designer + developer" texture */
.blueprint {
  --_grid: var(--grid-color, color-mix(in oklab, var(--primary) 9%, transparent));
  background-image:
    linear-gradient(to right, var(--_grid) 1px, transparent 1px),
    linear-gradient(to bottom, var(--_grid) 1px, transparent 1px);
  background-size: 44px 44px;
  mask-image: radial-gradient(ellipse 80% 70% at 50% 35%, #000 25%, transparent 80%);
}

/* Motion system — subtle only */
@keyframes rise {
  from {
    opacity: 0;
    transform: translateY(14px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
@keyframes sheet-in {
  from {
    opacity: 0;
    transform: translateY(10px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

/* On-load reveal (hero). --i = stagger index */
.reveal {
  animation: rise 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;
  animation-delay: calc(var(--i, 0) * 90ms);
}
.sheet-in {
  animation: sheet-in 0.2s ease-out both;
}

/* Scroll reveal with zero JS. Browsers without support just show content. */
@supports (animation-timeline: view()) {
  .reveal-scroll {
    animation: rise linear both;
    animation-timeline: view();
    animation-range: entry calc(var(--i, 0) * 4%) entry calc(35% + var(--i, 0) * 4%);
  }
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
  *,
  ::before,
  ::after {
    animation: none !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Step 03 — Types, constants, utils, reusable primitives

### `src/types/index.ts`

```ts
// Step 03 — Types Layer
// Shared TypeScript contracts for every data file and component.
// It exists so data (src/data) and UI (src/components) stay decoupled
// and strictly typed (no `any`).
import type { LucideIcon } from "lucide-react";

export interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

export interface SocialLink {
  id: "github" | "linkedin" | "email" | "upwork";
  label: string;
  href: string;
  icon: LucideIcon;
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
```

### `src/lib/utils.ts`

```ts
// Step 03 — Library Layer
// Tiny class-name joiner. It exists so we don't add clsx/tailwind-merge
// (zero extra dependencies). Used by every UI component.
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
```

### `src/lib/constants.ts`

```ts
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

export const THEME_STORAGE_KEY = "theme";
export const HERO_IMAGE = "/images/profile/hossam.jpg";

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
```

### `src/components/shared/Container.tsx`

```tsx
// Step 03 — Shared Layer
// Page-width wrapper with consistent horizontal padding.
// It exists so every section aligns to the same grid (spacing + alignment rule).
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn("mx-auto w-full max-w-6xl px-5 sm:px-8 lg:px-10", className)}>
      {children}
    </div>
  );
}
```

### `src/components/ui/Button.tsx`

```tsx
// Step 03 — UI Layer
// The only button/CTA style in the project (primary, secondary, light).
// It exists to keep CTA hierarchy consistent and avoid duplicated class strings.
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "light";

interface ButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  size?: "md" | "sm";
  icon?: LucideIcon;
  className?: string;
}

const VARIANTS: Record<Variant, string> = {
  primary: "bg-primary text-on-primary hover:bg-primary/90",
  secondary:
    "border border-border bg-surface text-foreground hover:border-primary hover:text-primary",
  light: "bg-white text-brand hover:bg-white/90",
};

const SIZES = { md: "h-12 px-6 text-sm", sm: "h-10 px-5 text-sm" } as const;

export default function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  icon: Icon,
  className,
}: ButtonProps) {
  return (
    <a
      href={href}
      className={cn(
        "group inline-flex items-center justify-center gap-2 rounded-xl font-bold transition-colors",
        VARIANTS[variant],
        SIZES[size],
        className,
      )}
    >
      {children}
      {Icon && (
        <Icon
          className="size-4 transition-transform group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      )}
    </a>
  );
}
```

### `src/components/ui/SectionHeading.tsx`

```tsx
// Step 03 — UI Layer
// Shared heading for every section: red square marker + index, title, subtitle.
// Centered on mobile (like the reference), left-aligned from tablet up.
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  index: string;
  title: string;
  subtitle: string;
  onDark?: boolean;
  className?: string;
}

export default function SectionHeading({
  index,
  title,
  subtitle,
  onDark = false,
  className,
}: SectionHeadingProps) {
  return (
    <header className={cn("mb-12 text-center md:text-left", className)}>
      <p
        className={cn(
          "mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em]",
          onDark ? "text-white/80" : "text-primary",
        )}
      >
        <span aria-hidden="true" className="size-1.5 bg-accent" />
        {index}
      </p>
      <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{title}</h2>
      <p className={cn("mt-2", onDark ? "text-white/70" : "text-muted")}>{subtitle}</p>
    </header>
  );
}
```

### `src/components/ui/SkillCard.tsx`

```tsx
// Step 07 — UI Layer
// One skill category (no fake percentage bars, just grouped tags).
// "brand" tone = solid blue card, "plain" = outlined card, so two groups
// create contrast without extra colors.
import type { CSSProperties } from "react";
import type { SkillGroup } from "@/types";
import { cn } from "@/lib/utils";

interface SkillCardProps {
  group: SkillGroup;
  index: number;
}

export default function SkillCard({ group, index }: SkillCardProps) {
  const Icon = group.icon;
  const isBrand = group.tone === "brand";

  return (
    <article
      className={cn(
        "reveal-scroll p-7 sm:p-9",
        isBrand ? "bg-brand text-white" : "border border-border bg-surface",
      )}
      style={{ "--i": index } as CSSProperties}
    >
      <div className="flex items-start gap-4">
        <span
          className={cn(
            "grid size-12 shrink-0 place-items-center rounded-lg",
            isBrand ? "bg-white/10" : "bg-primary/10 text-primary",
          )}
        >
          <Icon className="size-6" aria-hidden="true" />
        </span>
        <div>
          <h3 className="text-xl font-extrabold">{group.title}</h3>
          <p className={cn("mt-1 text-sm", isBrand ? "text-white/70" : "text-muted")}>
            {group.description}
          </p>
        </div>
      </div>
      <ul className="mt-8 flex flex-wrap gap-2">
        {group.skills.map((skill) => (
          <li
            key={skill}
            className={cn(
              "rounded-md px-3 py-1.5 text-sm font-semibold",
              isBrand ? "bg-white/10 text-white" : "bg-primary/10 text-primary",
            )}
          >
            {skill}
          </li>
        ))}
      </ul>
    </article>
  );
}
```

### `src/components/ui/ServiceCard.tsx`

```tsx
// Step 08 — UI Layer
// One service card. Hover: lift, icon fills with blue, red line sweeps across the bottom.
import type { CSSProperties } from "react";
import type { Service } from "@/types";

interface ServiceCardProps {
  service: Service;
  index: number;
}

export default function ServiceCard({ service, index }: ServiceCardProps) {
  const Icon = service.icon;

  return (
    <article
      className="reveal-scroll group relative flex flex-col border border-border bg-surface p-6 transition duration-300 hover:-translate-y-1 hover:border-primary"
      style={{ "--i": index } as CSSProperties}
    >
      <span className="text-xs font-bold tracking-widest text-muted">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className="mt-6 grid size-12 place-items-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-on-primary">
        <Icon className="size-6" aria-hidden="true" />
      </div>
      <h3 className="mt-6 text-lg font-bold">{service.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{service.description}</p>
      <span
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-0.5 w-0 bg-accent transition-all duration-300 group-hover:w-full"
      />
    </article>
  );
}
```

### `src/components/ui/ProjectCard.tsx`

```tsx
// Step 09 — UI Layer
// Editorial case-study row. Odd/even index flips preview and info sides.
// Without an image it shows a blueprint placeholder with the project number.
import type { CSSProperties } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/types";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const reversed = index % 2 === 1;
  const number = String(index + 1).padStart(2, "0");

  return (
    <article
      className="reveal-scroll grid items-center gap-8 lg:grid-cols-12 lg:gap-14"
      style={{ "--i": 0 } as CSSProperties}
    >
      <div className={cn("lg:col-span-7", reversed && "lg:order-2")}>
        <a
          href={project.href}
          tabIndex={-1}
          aria-hidden="true"
          className="group block overflow-hidden rounded-xl border border-border bg-surface"
        >
          <div className="flex items-center gap-1.5 border-b border-border px-4 py-3">
            <span className="size-2 rounded-full bg-border" />
            <span className="size-2 rounded-full bg-border" />
            <span className="size-2 rounded-full bg-accent" />
          </div>
          <div className="relative aspect-[16/10] overflow-hidden bg-surface-alt">
            {project.image ? (
              <Image
                src={project.image}
                alt=""
                fill
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            ) : (
              <div className="blueprint absolute inset-0 grid place-items-center">
                <span className="text-7xl font-extrabold text-primary/25">{number}</span>
              </div>
            )}
          </div>
        </a>
      </div>

      <div className="lg:col-span-5">
        <span className="text-6xl font-extrabold leading-none text-primary/20">{number}</span>
        <h3 className="mt-3 text-2xl font-extrabold tracking-tight sm:text-3xl">
          {project.title}
        </h3>
        <p className="mt-3 leading-relaxed text-muted">{project.description}</p>
        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies">
          {project.technologies.map((tech) => (
            <li
              key={tech}
              className="rounded-md border border-border px-2.5 py-1 text-xs font-bold text-primary"
            >
              {tech}
            </li>
          ))}
        </ul>
        <a
          href={project.href}
          className="group mt-7 inline-flex items-center gap-2 text-sm font-bold text-primary"
        >
          <span className="border-b-2 border-transparent transition-colors group-hover:border-accent">
            View Project
          </span>
          <ArrowUpRight
            className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
          <span className="sr-only">: {project.title}</span>
        </a>
      </div>
    </article>
  );
}
```

---

## Data layer (Steps 07 – 12)

### `src/data/social.ts`

```ts
// Step 12 — Data Layer
// Social/contact links. URLs are PLACEHOLDERS: replace with your real ones.
// Used by SocialLinks (hero + contact) and the main Contact CTA.
import { Briefcase, Github, Linkedin, Mail } from "lucide-react";
import type { SocialLink } from "@/types";

export const SOCIAL_LINKS: SocialLink[] = [
  { id: "linkedin", label: "LinkedIn", href: "https://linkedin.com/in/your-handle", icon: Linkedin },
  { id: "github", label: "GitHub", href: "https://github.com/your-handle", icon: Github },
  { id: "upwork", label: "Upwork", href: "https://upwork.com/freelancers/your-handle", icon: Briefcase },
  { id: "email", label: "Email", href: "mailto:you@example.com", icon: Mail },
];

export const CONTACT_HREF =
  SOCIAL_LINKS.find((link) => link.id === "email")?.href ?? "#contact";
```

> If your installed `lucide-react` version no longer ships `Github` / `Linkedin` (brand icons were deprecated), pin `lucide-react@0.469.0` or swap them for neutral icons like `Code2` / `Link2`.

### `src/data/skills.ts`

```ts
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
```

### `src/data/services.ts`

```ts
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
```

### `src/data/projects.ts`

```ts
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
    href: "#",
  },
  {
    id: "center-plus",
    title: "Center+",
    description:
      "A management system for educational centers with dedicated portals for each role.",
    technologies: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS"],
    href: "#",
  },
  {
    id: "souq-el-hay",
    title: "Souq El Hay",
    description:
      "A neighborhood shops and delivery PWA for Egypt, built around cash on delivery.",
    technologies: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS"],
    href: "#",
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
```

### `src/data/experience.ts`

```ts
// Step 10 — Data Layer
// Journey timeline. PLACEHOLDERS ONLY: nothing here is a real event.
// Replace each entry with a real milestone before launch.
import type { ExperienceItem } from "@/types";

export const EXPERIENCE: ExperienceItem[] = [
  {
    year: "2024",
    title: "Add your first milestone",
    description: "Placeholder. Edit src/data/experience.ts with a real step from your journey.",
  },
  {
    year: "2025",
    title: "Add your next milestone",
    description: "Placeholder. Describe what you built, learned, or launched.",
  },
  {
    year: "2026",
    title: "Add your current chapter",
    description: "Placeholder. This is the last node and is highlighted in red.",
  },
];
```

### `src/data/designs.ts`

```ts
// Step 11 — Data Layer
// Design showcase items. Without `src` a branded placeholder tile is shown.
// Add files to /public/images/designs and set src="/images/designs/file.jpg".
import type { DesignItem } from "@/types";

export const DESIGNS: DesignItem[] = [
  { id: "d1", title: "Brand identity", category: "Branding", alt: "Brand identity design", featured: true },
  { id: "d2", title: "Poster design", category: "Posters", alt: "Poster design" },
  { id: "d3", title: "Social media set", category: "Social Media", alt: "Social media designs" },
  { id: "d4", title: "App interface", category: "UI Design", alt: "UI design" },
  { id: "d5", title: "Logo system", category: "Branding", alt: "Logo system" },
  { id: "d6", title: "Event poster", category: "Posters", alt: "Event poster" },
];
```

---

## Step 03/04 — Shared helpers

### `src/components/shared/SocialLinks.tsx`

```tsx
// Step 05 — Shared Layer
// Renders the social links in 3 layouts: column (hero mobile, beside the photo),
// row (hero desktop), list (contact block). Data comes from data/social.ts.
import { ArrowUpRight } from "lucide-react";
import { SOCIAL_LINKS } from "@/data/social";
import { cn } from "@/lib/utils";

interface SocialLinksProps {
  layout?: "column" | "row" | "list";
  onDark?: boolean;
  className?: string;
}

export default function SocialLinks({
  layout = "row",
  onDark = false,
  className,
}: SocialLinksProps) {
  if (layout === "list") {
    return (
      <ul className={cn("divide-y", onDark ? "divide-white/15" : "divide-border", className)}>
        {SOCIAL_LINKS.map(({ id, label, href, icon: Icon }) => (
          <li key={id}>
            <a
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="group flex items-center gap-3 py-4 font-bold"
            >
              <Icon className="size-5" aria-hidden="true" />
              {label}
              <ArrowUpRight
                className="ml-auto size-4 opacity-60 transition group-hover:opacity-100"
                aria-hidden="true"
              />
            </a>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className={cn("flex gap-1", layout === "column" ? "flex-col" : "flex-row", className)}>
      {SOCIAL_LINKS.map(({ id, label, href, icon: Icon }) => (
        <li key={id}>
          <a
            href={href}
            aria-label={label}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer"
            className="grid size-11 place-items-center rounded-lg text-foreground transition-colors hover:bg-primary/10 hover:text-primary"
          >
            <Icon className="size-6" aria-hidden="true" />
          </a>
        </li>
      ))}
    </ul>
  );
}
```

### `src/components/shared/ThemeToggle.tsx`

```tsx
// Step 14 — Shared Layer (NEW FILE, justified)
// Dark-mode switch used by BOTH the desktop header and the mobile bar.
// It's a separate file so we don't duplicate logic. Zero state: the icon swap is
// pure CSS (dark: variants), so there's no hydration flicker. The initial
// theme is applied before paint by the inline script in app/layout.tsx.
"use client";

import { Moon, Sun } from "lucide-react";
import { THEME_STORAGE_KEY } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function ThemeToggle({ className }: { className?: string }) {
  function toggle() {
    const isDark = document.documentElement.classList.toggle("dark");
    try {
      localStorage.setItem(THEME_STORAGE_KEY, isDark ? "dark" : "light");
    } catch {
      // Storage can be blocked (private mode). The theme still switches for this visit.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle dark mode"
      className={cn(
        "grid size-11 place-items-center rounded-lg text-muted transition-colors hover:text-primary",
        className,
      )}
    >
      <Moon className="size-6 dark:hidden" aria-hidden="true" />
      <Sun className="hidden size-6 dark:block" aria-hidden="true" />
    </button>
  );
}
```

### `src/hooks/useActiveSection.ts`

```ts
// Step 04 — Hooks Layer (NEW FOLDER, justified)
// Scroll-spy shared by DesktopNav and MobileBottomNav. A hook doesn't belong in
// lib/utils (which is framework-free), so it gets its own small folder.
// A section can set data-nav="portfolio" to highlight another nav item.
"use client";

import { useEffect, useState } from "react";

export function useActiveSection(ids: readonly string[]): string {
  const [active, setActive] = useState<string>(ids[0]);

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.getAttribute("data-nav") ?? entry.target.id);
          }
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}
```

---

## Step 04 — Navigation

### `src/components/layout/DesktopNav.tsx`

```tsx
// Step 04 — Layout Layer
// Desktop horizontal links with scroll-spy underline.
// It's the only client piece of the desktop header (Header itself stays a Server Component).
"use client";

import { NAV_ITEMS, SECTION_IDS } from "@/lib/constants";
import { useActiveSection } from "@/hooks/useActiveSection";
import { cn } from "@/lib/utils";

export default function DesktopNav() {
  const active = useActiveSection(SECTION_IDS);

  return (
    <nav aria-label="Primary">
      <ul className="flex items-center gap-1">
        {NAV_ITEMS.map(({ id, label }) => {
          const isActive = active === id;
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-current={isActive ? "location" : undefined}
                className={cn(
                  "relative px-3 py-2 text-sm font-semibold transition-colors hover:text-primary",
                  isActive ? "text-primary" : "text-muted",
                )}
              >
                {label}
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute inset-x-3 -bottom-0.5 h-0.5 origin-left bg-primary transition-transform duration-300",
                    isActive ? "scale-x-100" : "scale-x-0",
                  )}
                />
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
```

### `src/components/layout/Header.tsx`

```tsx
// Step 04 — Layout Layer
// Desktop-only top bar (md and up): brand, DesktopNav, theme toggle, CTA.
// On mobile it is hidden because MobileBottomNav is the primary navigation.
import { Send } from "lucide-react";
import Container from "@/components/shared/Container";
import ThemeToggle from "@/components/shared/ThemeToggle";
import Button from "@/components/ui/Button";
import DesktopNav from "@/components/layout/DesktopNav";
import { SITE } from "@/lib/constants";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 hidden border-b border-border bg-background/95 md:block">
      <Container className="flex h-18 items-center justify-between gap-6">
        <a href="#home" className="text-lg font-extrabold tracking-tight">
          Hossam <span className="text-primary">Hussein</span>
          <span aria-hidden="true" className="text-accent">.</span>
          <span className="sr-only"> — {SITE.role}</span>
        </a>
        <DesktopNav />
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button href="#contact" size="sm" icon={Send}>
            Let&apos;s Talk
          </Button>
        </div>
      </Container>
    </header>
  );
}
```

### `src/components/layout/MobileBottomNav.tsx`

```tsx
// Step 04 — Layout Layer
// Mobile bar modeled on the reference: brand · theme toggle · menu button,
// fixed to the bottom and safe-area aware. The menu opens a sheet with the six
// sections as Lucide icon tiles, reachable with one thumb.
"use client";

import { useEffect, useState } from "react";
import { AlignRight, X } from "lucide-react";
import ThemeToggle from "@/components/shared/ThemeToggle";
import { useActiveSection } from "@/hooks/useActiveSection";
import { NAV_ITEMS, SECTION_IDS, SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function MobileBottomNav() {
  const [open, setOpen] = useState(false);
  const active = useActiveSection(SECTION_IDS);

  // Close the sheet with Escape (keyboard accessibility)
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="md:hidden">
      {open && (
        <div
          className="fixed inset-0 z-40 bg-foreground/30"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      {open && (
        <nav
          id="mobile-menu"
          aria-label="Primary"
          className="sheet-in fixed inset-x-3 bottom-[calc(4.75rem+env(safe-area-inset-bottom))] z-50 rounded-2xl border border-border bg-surface p-3 shadow-[0_20px_50px_-20px_rgb(0_0_0/0.35)]"
        >
          <ul className="grid grid-cols-3 gap-2">
            {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
              const isActive = active === id;
              return (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    onClick={() => setOpen(false)}
                    aria-current={isActive ? "location" : undefined}
                    className={cn(
                      "relative flex flex-col items-center gap-1.5 rounded-xl px-2 py-4 text-xs font-bold transition-colors",
                      isActive ? "bg-primary/10 text-primary" : "text-muted hover:text-foreground",
                    )}
                  >
                    <Icon className="size-6" aria-hidden="true" />
                    {label}
                    {isActive && (
                      <span
                        aria-hidden="true"
                        className="absolute right-2 top-2 size-1.5 rounded-full bg-accent"
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      )}

      <div className="fixed inset-x-0 bottom-0 z-50 rounded-t-2xl border-t border-border bg-surface pb-[env(safe-area-inset-bottom)] shadow-[0_-10px_30px_-15px_rgb(0_0_0/0.25)]">
        <div className="grid h-16 grid-cols-[1fr_auto_1fr] items-center px-5">
          <a href="#home" className="text-lg font-extrabold tracking-tight">
            {SITE.shortName}
            <span aria-hidden="true" className="text-accent">.</span>
          </a>
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-11 place-items-center justify-self-end rounded-lg text-foreground transition-colors hover:text-primary"
          >
            {open ? (
              <X className="size-6" aria-hidden="true" />
            ) : (
              <AlignRight className="size-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
```

---

## Step 05 — Hero

### `src/components/sections/Hero.tsx`

```tsx
// Step 05 — Sections Layer
// The most important section. Mobile follows the reference order: photo with
// vertical social icons, name, role line, bio, CTA. Desktop: text left, photo right.
// Photo = two layered asymmetric blobs (blue offset + outlined) + one tiny red dot.
// Put your photo at public/images/profile/hossam.jpg (an "H+" monogram shows if missing).
import type { CSSProperties } from "react";
import Image from "next/image";
import { ArrowRight, Hand, Send } from "lucide-react";
import Container from "@/components/shared/Container";
import SocialLinks from "@/components/shared/SocialLinks";
import Button from "@/components/ui/Button";
import { HERO_IMAGE, SITE } from "@/lib/constants";

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pb-20 pt-8 md:pb-28 md:pt-20">
      <div aria-hidden="true" className="blueprint absolute inset-0 -z-10" />

      <Container className="grid items-center gap-10 md:grid-cols-12 md:gap-8">
        <div
          className="reveal flex items-center justify-center gap-4 md:order-2 md:col-span-5"
          style={{ "--i": 0 } as CSSProperties}
        >
          <SocialLinks layout="column" className="md:hidden" />

          <div className="relative w-full max-w-88 md:max-w-none">
            <div
              aria-hidden="true"
              className="shape-blob absolute inset-0 translate-x-3 translate-y-3 bg-primary/85"
            />
            <div className="shape-blob-alt relative aspect-square overflow-hidden border border-primary/30 bg-surface-alt">
              <span
                aria-hidden="true"
                className="absolute inset-0 grid place-items-center text-7xl font-extrabold text-primary/25"
              >
                H<span className="text-accent">+</span>
              </span>
              <Image
                src={HERO_IMAGE}
                alt="Portrait of Hossam Hussein"
                fill
                priority
                sizes="(min-width: 768px) 40vw, 80vw"
                className="object-cover"
              />
            </div>
            <span
              aria-hidden="true"
              className="absolute -right-1 top-10 size-4 rounded-full bg-accent ring-4 ring-background"
            />
          </div>
        </div>

        <div className="md:order-1 md:col-span-7">
          <p
            className="reveal mb-4 flex items-center gap-2 text-sm font-bold text-muted"
            style={{ "--i": 1 } as CSSProperties}
          >
            <Hand className="size-5 text-accent" aria-hidden="true" />
            Hello, I&apos;m
          </p>
          <h1
            className="reveal text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
            style={{ "--i": 2 } as CSSProperties}
          >
            Hossam <span className="text-primary">Hussein</span>
          </h1>
          <div
            className="reveal mt-5 flex items-center gap-4"
            style={{ "--i": 3 } as CSSProperties}
          >
            <span aria-hidden="true" className="h-px w-12 bg-foreground/40" />
            <p className="text-lg font-semibold sm:text-xl">{SITE.role}</p>
          </div>
          <p
            className="reveal mt-6 max-w-xl text-lg leading-relaxed text-muted"
            style={{ "--i": 4 } as CSSProperties}
          >
            {SITE.tagline}
          </p>
          <div
            className="reveal mt-9 flex flex-wrap gap-3"
            style={{ "--i": 5 } as CSSProperties}
          >
            <Button href="#portfolio" icon={ArrowRight}>
              View My Work
            </Button>
            <Button href="#contact" variant="secondary" icon={Send}>
              Let&apos;s Talk
            </Button>
          </div>
          <SocialLinks layout="row" className="mt-8 hidden md:flex" />
        </div>
      </Container>
    </section>
  );
}
```

---

## Step 06 — About

### `src/components/sections/About.tsx`

```tsx
// Step 06 — Sections Layer
// Short introduction + compact info list. All text comes from lib/constants.ts (ABOUT),
// so adding real details later never touches this file.
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { ABOUT } from "@/lib/constants";

export default function About() {
  return (
    <section id="about" className="py-20 md:py-28">
      <Container>
        <SectionHeading index="01" title="About Me" subtitle="My Introduction" />
        <div className="grid gap-10 md:grid-cols-12 md:gap-16">
          <div className="reveal-scroll space-y-5 text-lg leading-relaxed text-muted md:col-span-7">
            {ABOUT.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <dl className="reveal-scroll border-t-2 border-primary md:col-span-5">
            {ABOUT.info.map(({ label, value }) => (
              <div
                key={label}
                className="flex items-baseline justify-between gap-4 border-b border-border py-4"
              >
                <dt className="text-sm font-semibold text-muted">{label}</dt>
                <dd className="text-base font-bold">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}
```

---

## Step 07 — Skills

### `src/components/sections/Skills.tsx`

```tsx
// Step 07 — Sections Layer
// Skills section: maps data/skills.ts into SkillCard. Surface background
// separates it from About to create section rhythm.
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import SkillCard from "@/components/ui/SkillCard";
import { SKILL_GROUPS } from "@/data/skills";

export default function Skills() {
  return (
    <section id="skills" className="border-y border-border bg-surface py-20 md:py-28">
      <Container>
        <SectionHeading index="02" title="Skills" subtitle="What I work with" />
        <div className="grid gap-5 md:grid-cols-2">
          {SKILL_GROUPS.map((group, index) => (
            <SkillCard key={group.id} group={group} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}
```

---

## Step 08 — Services

### `src/components/sections/Services.tsx`

```tsx
// Step 08 — Sections Layer
// Services grid (1 → 2 → 4 columns). Data from data/services.ts.
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ServiceCard from "@/components/ui/ServiceCard";
import { SERVICES } from "@/data/services";

export default function Services() {
  return (
    <section id="services" className="py-20 md:py-28">
      <Container>
        <SectionHeading index="03" title="Services" subtitle="How I can help" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}
```

---

## Step 09 — Projects

### `src/components/sections/Projects.tsx`

```tsx
// Step 09 — Sections Layer
// Selected Projects as alternating editorial rows. Id is "portfolio" to match the nav.
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ProjectCard from "@/components/ui/ProjectCard";
import { PROJECTS } from "@/data/projects";

export default function Projects() {
  return (
    <section id="portfolio" className="pb-20 pt-4 md:pb-28">
      <Container>
        <SectionHeading index="04" title="Selected Projects" subtitle="Case studies and builds" />
        <div className="space-y-20 md:space-y-28">
          {PROJECTS.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}
```

---

## Step 10 — Experience / Journey

### `src/components/sections/Experience.tsx`

```tsx
// Step 10 — Sections Layer
// Vertical timeline fed by data/experience.ts. The last node is red (current chapter).
// data-nav keeps "Portfolio" highlighted in the navigation while scrolling here.
import type { CSSProperties } from "react";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { EXPERIENCE } from "@/data/experience";
import { cn } from "@/lib/utils";

export default function Experience() {
  return (
    <section
      id="journey"
      data-nav="portfolio"
      className="border-y border-border bg-surface py-20 md:py-28"
    >
      <Container>
        <SectionHeading index="05" title="Journey" subtitle="Step by step" />
        <ol className="relative ml-3 border-l border-border">
          {EXPERIENCE.map((item, index) => (
            <li
              key={item.year}
              className="reveal-scroll relative pb-12 pl-8 last:pb-0 md:pl-12"
              style={{ "--i": index } as CSSProperties}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "absolute -left-1.25 top-2 size-2.5 rounded-full",
                  index === EXPERIENCE.length - 1 ? "bg-accent" : "bg-primary",
                )}
              />
              <p className="text-sm font-extrabold tracking-widest text-primary">{item.year}</p>
              <h3 className="mt-1 text-xl font-bold">{item.title}</h3>
              <p className="mt-2 max-w-xl text-muted">{item.description}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
```

---

## Step 11 — Design Showcase

### `src/components/sections/DesignShowcase.tsx`

```tsx
// Step 11 — Sections Layer
// Bento-style gallery with a lightweight native <dialog> preview
// (built-in focus trap, Esc to close, no library). It's a Client Component only
// because opening the dialog needs interaction. Each category gets a tone
// from the brand palette so the grid has color rhythm even before images exist.
"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Maximize2, X } from "lucide-react";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { DESIGNS } from "@/data/designs";
import type { DesignCategory, DesignItem } from "@/types";
import { cn } from "@/lib/utils";

const TONES: Record<DesignCategory, string> = {
  Branding: "bg-brand text-white",
  Posters: "bg-accent text-white",
  "Social Media": "bg-foreground text-background",
  "UI Design": "bg-surface-alt text-primary",
};

export default function DesignShowcase() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [selected, setSelected] = useState<DesignItem | null>(null);

  function openItem(item: DesignItem) {
    setSelected(item);
    dialogRef.current?.showModal();
  }

  return (
    <section id="design" data-nav="portfolio" className="py-20 md:py-28">
      <Container>
        <SectionHeading index="06" title="Design Showcase" subtitle="Branding, posters, social and UI" />

        <ul className="grid grid-cols-2 gap-3 md:auto-rows-56 md:grid-cols-4">
          {DESIGNS.map((item) => (
            <li
              key={item.id}
              className={cn(
                "reveal-scroll",
                item.featured ? "col-span-2 md:row-span-2" : "",
              )}
            >
              <button
                type="button"
                onClick={() => openItem(item)}
                aria-label={`Preview: ${item.title}`}
                className={cn(
                  "group relative flex h-full w-full items-end overflow-hidden p-4 text-left",
                  item.featured ? "aspect-2/1 md:aspect-auto" : "aspect-square md:aspect-auto",
                  TONES[item.category],
                )}
              >
                {item.src && (
                  <>
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      sizes="(min-width: 768px) 25vw, 50vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                  </>
                )}
                <Maximize2
                  className="absolute right-3 top-3 size-4 opacity-70 transition-opacity group-hover:opacity-100"
                  aria-hidden="true"
                />
                <span className={cn("relative", item.src && "text-white")}>
                  <span className="block text-[0.65rem] font-bold uppercase tracking-widest opacity-80">
                    {item.category}
                  </span>
                  <span className="block text-base font-extrabold">{item.title}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </Container>

      <dialog
        ref={dialogRef}
        onClose={() => setSelected(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialogRef.current?.close();
        }}
        aria-label={selected?.title ?? "Design preview"}
        className="m-auto w-[min(92vw,56rem)] bg-surface p-0 text-foreground backdrop:bg-black/70"
      >
        {selected && (
          <div>
            <div
              className={cn(
                "relative grid aspect-4/3 place-items-center",
                TONES[selected.category],
              )}
            >
              {selected.src ? (
                <Image
                  src={selected.src}
                  alt={selected.alt}
                  fill
                  sizes="90vw"
                  className="object-contain"
                />
              ) : (
                <span className="px-6 text-center text-3xl font-extrabold">{selected.title}</span>
              )}
            </div>
            <div className="flex items-center justify-between gap-4 p-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-primary">
                  {selected.category}
                </p>
                <p className="font-bold">{selected.title}</p>
              </div>
              <button
                type="button"
                autoFocus
                onClick={() => dialogRef.current?.close()}
                aria-label="Close preview"
                className="grid size-11 place-items-center rounded-lg border border-border hover:border-primary hover:text-primary"
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}
```

> Testimonials (Step 9 in your brief): intentionally **not built**. There is no real content, so nothing renders. When you have real quotes, add `src/data/testimonials.ts` + a `Testimonials.tsx` section that returns `null` for an empty array.

---

## Step 12 — Contact

### `src/components/sections/Contact.tsx`

```tsx
// Step 12 — Sections Layer
// Closing CTA on a fixed-brand blue block (#004883 in both themes) with a
// white blueprint grid and a single red marker. Links come from data/social.ts.
import { Send } from "lucide-react";
import Container from "@/components/shared/Container";
import SocialLinks from "@/components/shared/SocialLinks";
import Button from "@/components/ui/Button";
import { CONTACT_HREF } from "@/data/social";

export default function Contact() {
  return (
    <section id="contact" className="pb-20 md:pb-28">
      <Container>
        <div className="relative overflow-hidden rounded-2xl bg-brand p-8 text-white sm:p-14">
          <div
            aria-hidden="true"
            className="blueprint absolute inset-0 [--grid-color:rgb(255_255_255/0.07)]"
          />
          <div className="relative grid gap-10 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <p className="mb-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-white/80">
                <span aria-hidden="true" className="size-1.5 bg-accent" />
                07 — Contact
              </p>
              <h2 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
                Have a project in mind?
              </h2>
              <p className="mt-4 text-lg text-white/75">Let&apos;s build something meaningful.</p>
              <Button href={CONTACT_HREF} variant="light" icon={Send} className="mt-8">
                Let&apos;s Talk
              </Button>
            </div>
            <SocialLinks layout="list" onDark className="md:col-span-5" />
          </div>
        </div>
      </Container>
    </section>
  );
}
```

---

## Step 13 — Footer

### `src/components/layout/Footer.tsx`

```tsx
// Step 13 — Layout Layer
// Minimal footer. Extra bottom padding on mobile keeps it clear of the fixed bottom bar
// (including the device safe area).
import Container from "@/components/shared/Container";
import { SITE } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-border pb-[calc(6.5rem+env(safe-area-inset-bottom))] pt-10 md:pb-10">
      <Container className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-extrabold">
            {SITE.name}
            <span aria-hidden="true" className="text-accent">.</span>
          </p>
          <p className="text-sm text-muted">Designer &amp; Developer</p>
        </div>
        <p className="text-sm text-muted">
          © {new Date().getFullYear()} {SITE.name}
        </p>
      </Container>
    </footer>
  );
}
```

---

## Steps 14 · 17 — Root layout (dark mode bootstrap + SEO)

### `src/app/layout.tsx`

```tsx
// Step 14 + 17 — App Layer
// Root layout: loads Manrope, applies the saved/system theme BEFORE first paint
// (inline script, no flash), and defines all SEO metadata (title, description,
// Open Graph, Twitter, theme-color, favicon via app/favicon.ico).
// Optional: add src/app/opengraph-image.png and Next wires the OG image automatically.
import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import { SITE, THEME_STORAGE_KEY } from "@/lib/constants";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
});

const title = `${SITE.name} — ${SITE.role}`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: title, template: `%s | ${SITE.name}` },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.name }],
  openGraph: {
    type: "website",
    url: "/",
    siteName: SITE.name,
    title,
    description: SITE.description,
  },
  twitter: { card: "summary_large_image", title, description: SITE.description },
  icons: { icon: "/favicon.ico" },
};

export const viewport: Viewport = {
  viewportFit: "cover",
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F7F9FC" },
    { media: "(prefers-color-scheme: dark)", color: "#0A0F18" },
  ],
};

// Runs before paint: saved preference first, otherwise the system preference.
const themeScript = `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");var d=t?t==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.classList.toggle("dark",d)}catch(e){}})()`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={manrope.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

## Page assembly

### `src/app/page.tsx`

```tsx
// Step 05–13 — App Layer
// Composes the single-page experience. It only assembles sections (all Server
// Components except the few interactive ones), so the page itself stays tiny.
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import DesignShowcase from "@/components/sections/DesignShowcase";
import Experience from "@/components/sections/Experience";
import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import Services from "@/components/sections/Services";
import Skills from "@/components/sections/Skills";

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-60 focus:bg-primary focus:px-4 focus:py-2 focus:text-on-primary"
      >
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Services />
        <Projects />
        <Experience />
        <DesignShowcase />
        <Contact />
      </main>
      <Footer />
      <MobileBottomNav />
    </>
  );
}
```

---

## Steps 14 – 19 — Where each requirement is implemented

| Step | What | Where |
|---|---|---|
| 14 Dark mode | Tokens + `.dark` palette, pre-paint script, persisted, system default | `globals.css`, `layout.tsx`, `ThemeToggle.tsx` |
| 15 Animation | Hero stagger (`.reveal`), CSS scroll reveal (`.reveal-scroll`), hover scale, sheet fade, smooth scroll. No JS animation library. | `globals.css` |
| 16 Accessibility | Skip link, semantic landmarks, `aria-current`, `aria-expanded`, labels on icon buttons, focus ring, `<dialog>` focus trap, Esc, `prefers-reduced-motion` | everywhere + `globals.css` |
| 17 SEO | `metadata`, `viewport.themeColor`, OG/Twitter, favicon | `layout.tsx` |
| 18 Performance | Server Components by default; client only in `DesktopNav`, `MobileBottomNav`, `ThemeToggle`, `DesignShowcase`; `next/image` with `sizes` + `priority` on hero; AVIF/WebP | all |
| 19 QA | see checklist below | |

### Final QA checklist

```bash
npx tsc --noEmit
npm run lint
npm run build
```

- Resize to 360 / 390 / 768 / 1024 / 1440 px.
- Mobile: bar stays at the bottom, footer is not hidden behind it, the sheet closes on link tap / Esc / outside tap.
- Toggle dark mode, reload, it persists. Clear storage, it follows the system.
- Tab through the page: every control shows a focus ring.
- Enable "Reduce motion" in the OS: no animations, no smooth scroll.
- Replace placeholders: `social.ts` URLs, `experience.ts`, `designs.ts` images, `projects.ts` links, and add `public/images/profile/hossam.jpg` and `app/favicon.ico`.