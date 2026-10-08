// Step 05 — Sections Layer
// The most important section. Mobile follows the reference order: photo with
// vertical social icons, name, role line, bio, CTA. Desktop: text left, photo right.
// Photo = two layered asymmetric blobs (blue offset + outlined) + one tiny red dot.
// Put your photo at public/images/profile/hossam.jpg (an "H+" monogram shows if missing).
import type { CSSProperties } from "react";
import Image from "next/image";
import { ArrowRight, Hand, Send } from "lucide-react";
import Container from "@/components/shared/Container";
import SocialLinks from "@/components/shared/SocialLinks";
import Button from "@/components/ui/Button";
import { HERO_IMAGE, SITE } from "@/lib/constants";

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pb-20 pt-8 md:pb-28 md:pt-20">
      <div aria-hidden="true" className="blueprint absolute inset-0 -z-10" />

      <Container className="grid items-center gap-10 md:grid-cols-12 md:gap-8">
        <div
          className="reveal flex items-center justify-center gap-4 md:order-2 md:col-span-5"
          style={{ "--i": 0 } as CSSProperties}
        >
          <SocialLinks layout="column" className="md:hidden" />

          <div className="relative w-full max-w-88 md:max-w-none">
            <div
              aria-hidden="true"
              className="shape-blob absolute inset-0 translate-x-3 translate-y-3 bg-primary/85"
            />
            <div className="shape-blob-alt relative aspect-square overflow-hidden border border-primary/30 bg-surface-alt">
              <span
                aria-hidden="true"
                className="absolute inset-0 grid place-items-center text-7xl font-extrabold text-primary/25"
              >
                H<span className="text-accent">+</span>
              </span>
              <Image
                src={HERO_IMAGE}
                alt="Portrait of Hossam Hussein"
                fill
                priority
                sizes="(min-width: 768px) 40vw, 80vw"
                className="object-cover"
              />
            </div>
            <span
              aria-hidden="true"
              className="absolute -right-1 top-10 size-4 rounded-full bg-accent ring-4 ring-background"
            />
          </div>
        </div>

        <div className="md:order-1 md:col-span-7">
          <p
            className="reveal mb-4 flex items-center gap-2 text-sm font-bold text-muted"
            style={{ "--i": 1 } as CSSProperties}
          >
            <Hand className="size-5 text-accent" aria-hidden="true" />
            Hello, I&apos;m
          </p>
          <h1
            className="reveal text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
            style={{ "--i": 2 } as CSSProperties}
          >
            Hossam <span className="text-primary">Hussein</span>
          </h1>
          <div
            className="reveal mt-5 flex items-center gap-4"
            style={{ "--i": 3 } as CSSProperties}
          >
            <span aria-hidden="true" className="h-px w-12 bg-foreground/40" />
            <p className="text-lg font-semibold sm:text-xl">{SITE.role}</p>
          </div>
          <p
            className="reveal mt-6 max-w-xl text-lg leading-relaxed text-muted"
            style={{ "--i": 4 } as CSSProperties}
          >
            {SITE.tagline}
          </p>
          <div
            className="reveal mt-9 flex flex-wrap gap-3"
            style={{ "--i": 5 } as CSSProperties}
          >
            <Button href="#portfolio" icon={ArrowRight}>
              View My Work
            </Button>
            <Button href="#contact" variant="secondary" icon={Send}>
              Let&apos;s Talk
            </Button>
          </div>
          <SocialLinks layout="row" className="mt-8 hidden md:flex" />
        </div>
      </Container>
    </section>
  );
}