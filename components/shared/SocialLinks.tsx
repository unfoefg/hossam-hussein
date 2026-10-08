// Step 05 — Shared Layer
// Renders the social links in 3 layouts: column (hero mobile, beside the photo),
// row (hero desktop), list (contact block). Data comes from data/social.ts.
import { ArrowUpRight } from "lucide-react";
import { SOCIAL_LINKS } from "@/data/social";
import { cn } from "@/lib/utils";

interface SocialLinksProps {
  layout?: "column" | "row" | "list";
  onDark?: boolean;
  className?: string;
}

export default function SocialLinks({
  layout = "row",
  onDark = false,
  className,
}: SocialLinksProps) {
  if (layout === "list") {
    return (
      <ul className={cn("divide-y", onDark ? "divide-white/15" : "divide-border", className)}>
        {SOCIAL_LINKS.map(({ id, label, href, icon: Icon }) => (
          <li key={id}>
            <a
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="group flex items-center gap-3 py-4 font-bold"
            >
              <Icon className="size-5" aria-hidden="true" />
              {label}
              <ArrowUpRight
                className="ml-auto size-4 opacity-60 transition group-hover:opacity-100"
                aria-hidden="true"
              />
            </a>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className={cn("flex gap-1", layout === "column" ? "flex-col" : "flex-row", className)}>
      {SOCIAL_LINKS.map(({ id, label, href, icon: Icon }) => (
        <li key={id}>
          <a
            href={href}
            aria-label={label}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer"
            className="grid size-11 place-items-center rounded-lg text-foreground transition-colors hover:bg-primary/10 hover:text-primary"
          >
            <Icon className="size-6" aria-hidden="true" />
          </a>
        </li>
      ))}
    </ul>
  );
}