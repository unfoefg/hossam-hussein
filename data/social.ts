// Step 12 — Data Layer
// Social/contact links. URLs are PLACEHOLDERS: replace with your real ones.
// Brand icons come from components/shared/BrandIcons.tsx (inline SVG);
// only Mail comes from Lucide.
import { Mail } from "lucide-react";
import {
  GithubIcon,
  LinkedinIcon,
  UpworkIcon,
} from "@/components/shared/BrandIcons";
import type { SocialLink } from "@/types";

export const SOCIAL_LINKS: SocialLink[] = [
  { id: "linkedin", label: "LinkedIn", href: "https://linkedin.com/in/your-handle", icon: LinkedinIcon },
  { id: "github", label: "GitHub", href: "https://github.com/your-handle", icon: GithubIcon },
  { id: "upwork", label: "Upwork", href: "https://upwork.com/freelancers/your-handle", icon: UpworkIcon },
  { id: "email", label: "Email", href: "mailto:you@example.com", icon: Mail },
];

export const CONTACT_HREF =
  SOCIAL_LINKS.find((link) => link.id === "email")?.href ?? "#contact";