"use client";

import { techStack } from "@/lib/data";

export function TechStack() {
  const doubled = [...techStack, ...techStack];

  return (
    <section className="relative overflow-hidden border-y border-border py-12">
      <div className="mb-6 text-center">
        <span className="text-xs font-medium uppercase tracking-widest text-muted">
          Tech I work with
        </span>
      </div>
      <div className="relative flex overflow-hidden">
        <div className="animate-marquee flex shrink-0 items-center gap-8">
          {doubled.map((tech, i) => (
            <span
              key={`${tech}-${i}`}
              className="flex shrink-0 items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-medium text-muted"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
