// Step 09 — UI Layer
// Editorial case-study row. Odd/even index flips preview and info sides.
// Without an image it shows a blueprint placeholder with the project number.
import type { CSSProperties } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/types";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const reversed = index % 2 === 1;
  const number = String(index + 1).padStart(2, "0");

  return (
    <article
      className="reveal-scroll grid items-center gap-8 lg:grid-cols-12 lg:gap-14"
      style={{ "--i": 0 } as CSSProperties}
    >
      <div className={cn("lg:col-span-7", reversed && "lg:order-2")}>
        <a
          href={project.href}
          tabIndex={-1}
          aria-hidden="true"
          className="group block overflow-hidden rounded-xl border border-border bg-surface"
        >
          <div className="flex items-center gap-1.5 border-b border-border px-4 py-3">
            <span className="size-2 rounded-full bg-border" />
            <span className="size-2 rounded-full bg-border" />
            <span className="size-2 rounded-full bg-accent" />
          </div>
          <div className="relative aspect-16/10 overflow-hidden bg-surface-alt">
            {project.image ? (
              <Image
                src={project.image}
                alt=""
                fill
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            ) : (
              <div className="blueprint absolute inset-0 grid place-items-center">
                <span className="text-7xl font-extrabold text-primary/25">{number}</span>
              </div>
            )}
          </div>
        </a>
      </div>

      <div className="lg:col-span-5">
        <span className="text-6xl font-extrabold leading-none text-primary/20">{number}</span>
        <h3 className="mt-3 text-2xl font-extrabold tracking-tight sm:text-3xl">
          {project.title}
        </h3>
        <p className="mt-3 leading-relaxed text-muted">{project.description}</p>
        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies">
          {project.technologies.map((tech) => (
            <li
              key={tech}
              className="rounded-md border border-border px-2.5 py-1 text-xs font-bold text-primary"
            >
              {tech}
            </li>
          ))}
        </ul>
        <a
          href={project.href}
          className="group mt-7 inline-flex items-center gap-2 text-sm font-bold text-primary"
        >
          <span className="border-b-2 border-transparent transition-colors group-hover:border-accent">
            View Project
          </span>
          <ArrowUpRight
            className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
          <span className="sr-only">: {project.title}</span>
        </a>
      </div>
    </article>
  );
}