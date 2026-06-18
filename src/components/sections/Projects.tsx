"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  FolderOpen,
  Globe,
  Wallet,
  LucideIcon,
} from "lucide-react";
import { GitHubIcon } from "@/components/ui/SocialIcons";
import { SectionHeader, FadeIn } from "@/components/ui/SectionHeader";
import { projects } from "@/lib/data";
import { cn } from "@/lib/utils";

type Project = (typeof projects)[number];

const categoryIcons: Record<string, LucideIcon> = {
  Web2: Globe,
  Web3: Wallet,
};

function projectMonogram(title: string) {
  const word = title.split(/[\s.]+/)[0] ?? title;
  return word.slice(0, 2).toUpperCase();
}

function isValidLink(url: string) {
  return url && url !== "#";
}

function ProjectLinks({
  project,
  className,
}: {
  project: Project;
  className?: string;
}) {
  const hasLive = isValidLink(project.link);
  const hasGithub = isValidLink(project.github);

  if (!hasLive && !hasGithub) return null;

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {hasLive && (
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full accent-gradient px-4 py-2 text-xs font-medium text-background transition-opacity hover:opacity-90"
        >
          Live demo
          <ArrowUpRight size={14} />
        </a>
      )}
      {hasGithub && (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-4 py-2 text-xs font-medium text-foreground transition-colors hover:border-border-hover"
        >
          <GitHubIcon size={14} />
          Source
        </a>
      )}
    </div>
  );
}

function ProjectVisual({ project }: { project: Project }) {
  const Icon = categoryIcons[project.category] ?? FolderOpen;
  const monogram = projectMonogram(project.title);

  return (
    <div
      className="relative flex h-28 w-full shrink-0 items-center justify-center overflow-hidden"
      style={{
        background: `linear-gradient(145deg, ${project.accent}28 0%, ${project.accent}08 45%, transparent 100%)`,
      }}
    >
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div
        className="pointer-events-none absolute -right-6 -top-6 h-32 w-32 rounded-full opacity-30 blur-2xl"
        style={{ background: project.accent }}
      />

      <div className="relative flex flex-col items-center gap-3 p-6">
        <div
          className="flex h-12 w-12 items-center justify-center rounded-2xl border font-display text-lg font-medium text-white/90"
          style={{
            borderColor: `${project.accent}55`,
            background: `linear-gradient(135deg, ${project.accent}cc, ${project.accent}88)`,
          }}
        >
          {monogram}
        </div>
        <Icon size={16} className="text-muted/60" strokeWidth={1.5} />
      </div>
    </div>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <FadeIn delay={index * 0.06}>
      <motion.article
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-border-hover hover:bg-card-hover"
      >
        <div
          className="h-0.5 w-0 transition-all duration-500 group-hover:w-full"
          style={{ background: project.accent }}
        />

        <ProjectVisual project={project} />

        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[11px] font-medium uppercase tracking-wider text-muted">
                {project.category} · {project.year}
              </p>
              <h3 className="mt-1 font-display text-xl font-medium text-foreground">
                {project.title}
              </h3>
            </div>
            {(isValidLink(project.link) || isValidLink(project.github)) && (
              <a
                href={isValidLink(project.link) ? project.link : project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border text-muted transition-all hover:border-accent/40 hover:text-accent"
                aria-label={`Open ${project.title}`}
              >
                <ArrowUpRight size={16} />
              </a>
            )}
          </div>

          <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
            {project.description}
          </p>

          <div className="mt-4 flex flex-wrap gap-1.5 border-t border-border/60 pt-4">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border bg-background px-2 py-0.5 text-[10px] text-muted"
              >
                {tag}
              </span>
            ))}
          </div>

          <ProjectLinks project={project} className="mt-4" />
        </div>
      </motion.article>
    </FadeIn>
  );
}

export function Projects() {
  const [mounted, setMounted] = useState(false);
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(projects.map((p) => p.category)))],
    []
  );

  const [filter, setFilter] = useState("All");

  useEffect(() => {
    setMounted(true);
  }, []);

  const filtered = projects.filter(
    (p) => filter === "All" || p.category === filter
  );

  return (
    <section id="projects" className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute right-0 top-1/4 h-[400px] w-[400px] rounded-full bg-accent/5 blur-[100px]" />

      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHeader
          label="Projects"
          title={"Selected work that\nspeaks for itself"}
        />

        <FadeIn delay={0.1}>
          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {categories.map((cat) => {
              const classes = cn(
                "rounded-full border px-4 py-2 text-xs font-medium transition-all duration-200",
                filter === cat
                  ? "border-accent/40 bg-accent/10 text-accent-light"
                  : "border-border bg-card text-muted hover:border-border-hover hover:text-foreground"
              );

              if (!mounted) {
                return (
                  <span key={cat} className={classes}>
                    {cat}
                  </span>
                );
              }

              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setFilter(cat)}
                  className={classes}
                  suppressHydrationWarning
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </FadeIn>

        {projects.length === 0 ? (
          <FadeIn>
            <div className="mx-auto mt-16 max-w-md rounded-2xl border border-dashed border-border p-12 text-center">
              <FolderOpen size={32} className="mx-auto text-muted" />
              <p className="mt-4 text-sm text-muted">
                Add projects in{" "}
                <code className="text-accent-light">src/lib/data.ts</code>
              </p>
            </div>
          </FadeIn>
        ) : (
          <div className="mx-auto mt-12 grid max-w-4xl gap-5 sm:grid-cols-2">
            {filtered.map((project, i) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={i}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
