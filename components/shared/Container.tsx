// Step 03 — Shared Layer
// Page-width wrapper with consistent horizontal padding.
// It exists so every section aligns to the same grid (spacing + alignment rule).
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn("mx-auto w-full max-w-6xl px-5 sm:px-8 lg:px-10", className)}>
      {children}
    </div>
  );
}