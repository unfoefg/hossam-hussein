// Step 07 — UI Layer
// One skill category (no fake percentage bars, just grouped tags).
// "brand" tone = solid blue card, "plain" = outlined card, so two groups
// create contrast without extra colors.
import type { CSSProperties } from "react";
import type { SkillGroup } from "@/types";
import { cn } from "@/lib/utils";

interface SkillCardProps {
  group: SkillGroup;
  index: number;
}

export default function SkillCard({ group, index }: SkillCardProps) {
  const Icon = group.icon;
  const isBrand = group.tone === "brand";

  return (
    <article
      className={cn(
        "reveal-scroll p-7 sm:p-9",
        isBrand ? "bg-brand text-white" : "border border-border bg-surface",
      )}
      style={{ "--i": index } as CSSProperties}
    >
      <div className="flex items-start gap-4">
        <span
          className={cn(
            "grid size-12 shrink-0 place-items-center rounded-lg",
            isBrand ? "bg-white/10" : "bg-primary/10 text-primary",
          )}
        >
          <Icon className="size-6" aria-hidden="true" />
        </span>
        <div>
          <h3 className="text-xl font-extrabold">{group.title}</h3>
          <p className={cn("mt-1 text-sm", isBrand ? "text-white/70" : "text-muted")}>
            {group.description}
          </p>
        </div>
      </div>
      <ul className="mt-8 flex flex-wrap gap-2">
        {group.skills.map((skill) => (
          <li
            key={skill}
            className={cn(
              "rounded-md px-3 py-1.5 text-sm font-semibold",
              isBrand ? "bg-white/10 text-white" : "bg-primary/10 text-primary",
            )}
          >
            {skill}
          </li>
        ))}
      </ul>
    </article>
  );
}