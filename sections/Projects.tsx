// Step 09 — Sections Layer
// Selected Projects as alternating editorial rows. Id is "portfolio" to match the nav.
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ProjectCard from "@/components/ui/ProjectCard";
import { PROJECTS } from "@/data/projects";

export default function Projects() {
  return (
    <section id="portfolio" className="pb-20 pt-4 md:pb-28">
      <Container>
        <SectionHeading index="04" title="Selected Projects" subtitle="Case studies and builds" />
        <div className="space-y-20 md:space-y-28">
          {PROJECTS.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}