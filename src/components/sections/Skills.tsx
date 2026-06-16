"use client";

import { motion } from "framer-motion";
import { SectionHeader, FadeIn } from "@/components/ui/SectionHeader";
import {
  formatSkillLabel,
  SkillBrandIcon,
} from "@/components/ui/SkillIcons";
import { skillCategories } from "@/lib/data";

function SkillTile({ name, index }: { name: string; index: number }) {
  return (
    <FadeIn delay={index * 0.03}>
      <motion.article
        whileHover={{ y: -6, scale: 1.02 }}
        transition={{ duration: 0.2 }}
        className="group flex aspect-square flex-col items-center justify-center gap-3 rounded-xl border border-border/80 bg-[#161616] p-4 shadow-[0_8px_24px_rgba(0,0,0,0.35)] transition-colors hover:border-accent/40 hover:bg-[#1a1a1a] sm:gap-4 sm:p-5"
      >
        <div className="flex h-12 w-12 items-center justify-center transition-transform duration-300 group-hover:scale-110 sm:h-14 sm:w-14">
          <SkillBrandIcon name={name} size={44} />
        </div>
        <p className="text-center text-[10px] font-semibold uppercase tracking-wider text-foreground/90 sm:text-[11px]">
          {formatSkillLabel(name)}
        </p>
      </motion.article>
    </FadeIn>
  );
}

export function Skills() {
  return (
    <section id="skills" className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 grid-bg opacity-25" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[320px] w-[480px] -translate-x-1/2 rounded-full bg-accent/5 blur-[120px]" />

      <div className="relative mx-auto max-w-5xl px-6">
        <SectionHeader
          label="Skills"
          title="What I work with"
        />

        <div className="mt-14 space-y-14 sm:mt-16 sm:space-y-16">
          {skillCategories.map((category) => (
            <div key={category.id} id={`skills-${category.id}`}>
              <div className="mb-5 border-b border-border/60 pb-3">
                <h3 className="font-display text-xl font-medium text-accent-light sm:text-2xl">
                  {category.label}
                </h3>
                <p className="mt-1 text-sm text-muted">{category.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
                {category.items.map((name, i) => (
                  <SkillTile key={name} name={name} index={i} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
