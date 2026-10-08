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