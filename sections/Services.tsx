// Step 08 — Sections Layer
// Services grid (1 → 2 → 4 columns). Data from data/services.ts.
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ServiceCard from "@/components/ui/ServiceCard";
import { SERVICES } from "@/data/services";

export default function Services() {
  return (
    <section id="services" className="py-20 md:py-28">
      <Container>
        <SectionHeading index="03" title="Services" subtitle="How I can help" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}