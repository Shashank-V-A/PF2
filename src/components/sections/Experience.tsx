"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Briefcase, MapPin } from "lucide-react";
import { SectionHeader, FadeIn } from "@/components/ui/SectionHeader";
import { experience } from "@/lib/data";
import { cn } from "@/lib/utils";

function CompanyLogo({
  company,
  logoUrl,
}: {
  company: string;
  logoUrl?: string;
}) {
  const initials = company
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  if (logoUrl) {
    return (
      <div className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border/80 bg-white p-2 shadow-[0_4px_16px_rgba(0,0,0,0.25)] transition-colors duration-300 group-hover:border-accent/30">
        <Image
          src={logoUrl}
          alt={`${company} logo`}
          width={40}
          height={40}
          className="h-full w-full object-contain"
        />
      </div>
    );
  }

  return (
    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-accent/25 bg-accent/10 text-xs font-bold text-accent-light transition-colors duration-300 group-hover:border-accent/40 group-hover:bg-accent/15">
      {initials}
    </div>
  );
}

function ExperienceCard({
  job,
  index,
  isLast,
}: {
  job: (typeof experience)[number];
  index: number;
  isLast: boolean;
}) {
  const num = String(index + 1).padStart(2, "0");

  return (
    <FadeIn delay={index * 0.1}>
      <div className="relative flex gap-6 sm:gap-10">
        <div className="relative flex shrink-0 flex-col items-center">
          <div
            className={cn(
              "relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 border-background font-display text-sm font-medium tabular-nums text-accent-light sm:h-11 sm:w-11",
              job.current
                ? "accent-gradient text-background shadow-[0_0_24px_var(--accent-glow)]"
                : "bg-card ring-1 ring-accent/30"
            )}
          >
            {num}
          </div>
          {!isLast && (
            <div
              className="absolute top-10 bottom-0 w-px bg-gradient-to-b from-accent/35 via-accent/15 to-transparent sm:top-11"
              aria-hidden
            />
          )}
        </div>

        <motion.article
          whileHover={{ y: -3 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className={cn(
            "group relative mb-10 min-w-0 flex-1 overflow-hidden rounded-2xl border bg-card shadow-[0_8px_32px_rgba(0,0,0,0.2)] transition-all duration-300 hover:border-accent/25 hover:bg-card-hover hover:shadow-[0_12px_40px_rgba(0,0,0,0.28)]",
            job.current
              ? "border-accent/30"
              : "border-border"
          )}
        >
          {job.current && (
            <div className="absolute inset-x-0 top-0 h-px accent-gradient opacity-80" />
          )}

          <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-accent/5 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

          <div className="relative p-6 sm:p-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex gap-4">
                <CompanyLogo company={job.company} logoUrl={job.logoUrl} />
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h3 className="font-display text-xl font-medium text-foreground sm:text-2xl">
                      {job.role}
                    </h3>
                    {job.current && (
                      <span className="rounded-full accent-gradient px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-background">
                        Current
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm font-medium text-accent-light sm:text-base">
                    {job.company}
                  </p>
                  {job.location && (
                    <p className="mt-2 flex items-center gap-1.5 text-xs text-muted">
                      <MapPin size={12} className="shrink-0 text-accent/70" />
                      {job.location}
                    </p>
                  )}
                </div>
              </div>

              <span className="inline-flex w-fit shrink-0 items-center gap-1.5 rounded-full border border-accent/20 bg-background/80 px-3.5 py-1.5 text-xs tabular-nums text-foreground/80">
                <Briefcase size={12} className="text-accent-light" strokeWidth={1.5} />
                {job.period}
              </span>
            </div>

            <p className="mt-6 text-sm leading-relaxed text-muted sm:text-[15px]">
              {job.description}
            </p>

            {job.highlights.length > 0 && (
              <ul className="mt-6 space-y-3 border-t border-border/50 pt-6">
                {job.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex gap-3 text-sm leading-relaxed text-foreground/75"
                  >
                    <span className="mt-2 h-px w-3 shrink-0 bg-accent-light" />
                    {highlight}
                  </li>
                ))}
              </ul>
            )}

            {job.tech && job.tech.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {job.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-border bg-background/60 px-3 py-1 text-xs text-foreground/70 transition-colors duration-300 group-hover:border-accent/20"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}
          </div>
        </motion.article>
      </div>
    </FadeIn>
  );
}

export function Experience() {
  return (
    <section id="experience" className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[360px] w-[480px] -translate-x-1/2 rounded-full bg-accent/5 blur-[120px]" />

      <div className="relative mx-auto max-w-3xl px-6 lg:max-w-4xl">
        <SectionHeader
          label="Experience"
          title={"Where I've built\nand grown"}
        />

        <div className="relative mt-16 sm:mt-20">
          {experience.map((job, i) => (
            <ExperienceCard
              key={`${job.company}-${job.period}`}
              job={job}
              index={i}
              isLast={i === experience.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
