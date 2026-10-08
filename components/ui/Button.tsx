// Step 03 — UI Layer
// The only button/CTA style in the project (primary, secondary, light).
// It exists to keep CTA hierarchy consistent and avoid duplicated class strings.
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "light";

interface ButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  size?: "md" | "sm";
  icon?: LucideIcon;
  className?: string;
}

const VARIANTS: Record<Variant, string> = {
  primary: "bg-primary text-on-primary hover:bg-primary/90",
  secondary:
    "border border-border bg-surface text-foreground hover:border-primary hover:text-primary",
  light: "bg-white text-brand hover:bg-white/90",
};

const SIZES = { md: "h-12 px-6 text-sm", sm: "h-10 px-5 text-sm" } as const;

export default function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  icon: Icon,
  className,
}: ButtonProps) {
  return (
    <a
      href={href}
      className={cn(
        "group inline-flex items-center justify-center gap-2 rounded-xl font-bold transition-colors",
        VARIANTS[variant],
        SIZES[size],
        className,
      )}
    >
      {children}
      {Icon && (
        <Icon
          className="size-4 transition-transform group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      )}
    </a>
  );
}