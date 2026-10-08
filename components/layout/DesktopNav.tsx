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