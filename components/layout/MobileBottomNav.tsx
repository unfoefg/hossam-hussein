// Step 04 — Layout Layer
// Mobile bar: brand · theme toggle · menu button, fixed to the bottom.
// The menu is a bottom sheet that slides up from behind the bar.
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

  // Close with Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Lock page scroll while the sheet is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="md:hidden">
      {/* Backdrop (blurred) */}
      <div
        onClick={() => setOpen(false)}
        aria-hidden="true"
        className={cn(
          "fixed inset-0 z-30 bg-background/40 backdrop-blur-md transition-opacity duration-300",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />

      {/* Sliding sheet: comes up from behind the bar */}
      <nav
        id="mobile-menu"
        aria-label="Primary"
        aria-hidden={!open}
        style={{
          transform: open ? "translateY(0)" : "translateY(100%)",
          visibility: open ? "visible" : "hidden",
          transition: open
            ? "transform 300ms ease-out, visibility 0s"
            : "transform 300ms ease-out, visibility 0s linear 300ms",
        }}
        className="fixed inset-x-0 bottom-0 z-40 rounded-t-2xl border-t border-border bg-surface pb-[calc(4rem+env(safe-area-inset-bottom))] shadow-[0_-10px_30px_-15px_rgb(0_0_0/0.25)]"
      >
        <ul className="grid grid-cols-3 gap-2 p-3">
          {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
            const isActive = active === id;
            return (
              <li key={id}>
                <a
                  href={`#${id}`}
                  tabIndex={open ? 0 : -1}
                  onClick={() => setOpen(false)}
                  aria-current={isActive ? "location" : undefined}
                  className={cn(
                    "relative flex flex-col items-center gap-1.5 rounded-xl px-2 py-4 text-xs font-bold transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted hover:text-foreground",
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

      {/* Fixed bar (always on top) */}
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