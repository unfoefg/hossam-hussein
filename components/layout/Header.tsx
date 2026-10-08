// Step 04 — Layout Layer
// Desktop-only top bar (md and up): brand, DesktopNav, theme toggle, CTA.
// On mobile it is hidden because MobileBottomNav is the primary navigation.
import { Send } from "lucide-react";
import Container from "@/components/shared/Container";
import ThemeToggle from "@/components/shared/ThemeToggle";
import Button from "@/components/ui/Button";
import DesktopNav from "@/components/layout/DesktopNav";
import { SITE } from "@/lib/constants";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 hidden border-b border-border bg-background/95 md:block">
      <Container className="flex h-18 items-center justify-between gap-6">
        <a href="#home" className="text-lg font-extrabold tracking-tight">
          Hossam <span className="text-primary">Hussein</span>
          <span aria-hidden="true" className="text-accent">.</span>
          <span className="sr-only"> — {SITE.role}</span>
        </a>
        <DesktopNav />
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button href="#contact" size="sm" icon={Send}>
            Let&apos;s Talk
          </Button>
        </div>
      </Container>
    </header>
  );
}