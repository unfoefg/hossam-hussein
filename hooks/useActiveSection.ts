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