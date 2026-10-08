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