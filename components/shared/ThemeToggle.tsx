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