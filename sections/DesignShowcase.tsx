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