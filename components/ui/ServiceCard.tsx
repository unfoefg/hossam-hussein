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