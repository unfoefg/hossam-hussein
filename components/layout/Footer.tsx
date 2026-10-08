// Step 13 — Layout Layer
// Minimal footer. Extra bottom padding on mobile keeps it clear of the fixed
// bottom bar (including the device safe area). The year is a constant
// (COPYRIGHT_YEAR) because Next 16 blocks new Date() while prerendering.
import Container from "@/components/shared/Container";
import { COPYRIGHT_YEAR, SITE } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-border pb-[calc(6.5rem+env(safe-area-inset-bottom))] pt-10 md:pb-10">
      <Container className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-extrabold">
            {SITE.name}
            <span aria-hidden="true" className="text-accent">.</span>
          </p>
          <p className="text-sm text-muted">Designer &amp; Developer</p>
        </div>
        <p className="text-sm text-muted">
          © {COPYRIGHT_YEAR} {SITE.name}
        </p>
      </Container>
    </footer>
  );
}