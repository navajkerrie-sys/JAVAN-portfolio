"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, GitFork, Star } from "lucide-react";
import { projects } from "@/data/site";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { cn } from "@/lib/utils";
export function Projects() {
  const ordered = [...projects].sort((a, b) => Number(b.featured) - Number(a.featured));

  return (
    <section id="projects" className="relative py-24 sm:py-32">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Projects"
          title="A few things I've shipped."
          description="A mix of client and personal work."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ordered.map((project, i) => (
            <Reveal key={project.slug} delay={(i % 3) * 0.08} y={20}>
              <motion.article
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-colors hover:border-border-hover"
              >
                <div
                  className={cn(
                    "absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-30",
                    project.accent === "indigo" ? "bg-accent" : "bg-accent-2"
                  )}
                  aria-hidden
                />

                {project.image ? (
                  <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-border bg-bg-elevated">
                    <Image
                      src={project.image}
                      alt={`Preview of ${project.title}`}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                ) : (
                  <div
                    className={cn(
                      "relative flex aspect-[16/10] w-full items-center justify-center border-b border-border bg-gradient-to-br",
                      project.accent === "indigo"
                        ? "from-accent-dim/25 to-surface"
                        : "from-accent-2/15 to-surface"
                    )}
                  >
                    <span className="font-display text-3xl font-medium text-text-faint">
                      {project.title
                        .split(" ")
                        .map((w) => w[0])
                        .slice(0, 2)
                        .join("")}
                    </span>
                  </div>
                )}

                <div className="relative flex flex-1 flex-col p-6">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full border border-border bg-bg-elevated px-3 py-1 font-mono text-[11px] uppercase tracking-[0.1em] text-text-muted">
                        {project.category}
                      </span>
                      {project.year && (
                        <span className="font-mono text-[11px] text-text-faint">
                          {project.year}
                        </span>
                      )}
                    </div>
                    {project.featured && (
                      <span
                        className="inline-flex items-center gap-1 rounded-full bg-accent/15 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-accent-soft"
                        title="Featured project"
                      >
                        <Star size={10} fill="currentColor" />
                        Featured
                      </span>
                    )}
                  </div>

                  <h3 className="mt-5 font-display text-xl font-medium text-text">
                    {project.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-text-muted">
                    {project.description}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-bg-elevated px-2.5 py-1 font-mono text-[11px] text-text-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {(project.liveUrl || project.githubUrl) && (
                    <div className="mt-6 flex items-center gap-4 border-t border-border pt-4">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm font-medium text-text transition-colors hover:text-accent-soft"
                        >
                          Visit live site
                          <ArrowUpRight size={14} />
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm font-medium text-text-muted transition-colors hover:text-text"
                        >
                          <GitFork size={14} />
                          View code
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
