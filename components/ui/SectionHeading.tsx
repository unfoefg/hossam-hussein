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