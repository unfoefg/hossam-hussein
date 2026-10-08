// Step 07 — Sections Layer
// Skills section: maps data/skills.ts into SkillCard. Surface background
// separates it from About to create section rhythm.
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import SkillCard from "@/components/ui/SkillCard";
import { SKILL_GROUPS } from "@/data/skills";

export default function Skills() {
  return (
    <section id="skills" className="border-y border-border bg-surface py-20 md:py-28">
      <Container>
        <SectionHeading index="02" title="Skills" subtitle="What I work with" />
        <div className="grid gap-5 md:grid-cols-2">
          {SKILL_GROUPS.map((group, index) => (
            <SkillCard key={group.id} group={group} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}