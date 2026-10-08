// Step 12 — Sections Layer
// Closing CTA on a fixed-brand blue block (#004883 in both themes) with a
// white blueprint grid and a single red marker. Links come from data/social.ts.
import { Send } from "lucide-react";
import Container from "@/components/shared/Container";
import SocialLinks from "@/components/shared/SocialLinks";
import Button from "@/components/ui/Button";
import { CONTACT_HREF } from "@/data/social";

export default function Contact() {
  return (
    <section id="contact" className="pb-20 md:pb-28">
      <Container>
        <div className="relative overflow-hidden rounded-2xl bg-brand p-8 text-white sm:p-14">
          <div
            aria-hidden="true"
            className="blueprint absolute inset-0 [--grid-color:rgb(255_255_255/0.07)]"
          />
          <div className="relative grid gap-10 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <p className="mb-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-white/80">
                <span aria-hidden="true" className="size-1.5 bg-accent" />
                07 — Contact
              </p>
              <h2 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
                Have a project in mind?
              </h2>
              <p className="mt-4 text-lg text-white/75">Let&apos;s build something meaningful.</p>
              <Button href={CONTACT_HREF} variant="light" icon={Send} className="mt-8">
                Let&apos;s Talk
              </Button>
            </div>
            <SocialLinks layout="list" onDark className="md:col-span-5" />
          </div>
        </div>
      </Container>
    </section>
  );
}