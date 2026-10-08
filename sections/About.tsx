// Step 06 — Sections Layer
// Short introduction + compact info list. All text comes from lib/constants.ts (ABOUT),
// so adding real details later never touches this file.
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { ABOUT } from "@/lib/constants";

export default function About() {
  return (
    <section id="about" className="py-20 md:py-28">
      <Container>
        <SectionHeading index="01" title="About Me" subtitle="My Introduction" />
        <div className="grid gap-10 md:grid-cols-12 md:gap-16">
          <div className="reveal-scroll space-y-5 text-lg leading-relaxed text-muted md:col-span-7">
            {ABOUT.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <dl className="reveal-scroll border-t-2 border-primary md:col-span-5">
            {ABOUT.info.map(({ label, value }) => (
              <div
                key={label}
                className="flex items-baseline justify-between gap-4 border-b border-border py-4"
              >
                <dt className="text-sm font-semibold text-muted">{label}</dt>
                <dd className="text-base font-bold">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}