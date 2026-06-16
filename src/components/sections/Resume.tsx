"use client";

import { motion } from "framer-motion";
import { Download, GraduationCap, FileText } from "lucide-react";
import { SectionHeader, FadeIn } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { resumeInfo, siteConfig } from "@/lib/data";

export function Resume() {
  const { education, includes, skillGroups } = resumeInfo;

  return (
    <section id="resume" className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 grid-bg opacity-25" />
      <div className="absolute left-1/2 top-1/2 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/5 blur-[100px]" />

      <div className="relative mx-auto max-w-5xl px-6">
        <SectionHeader
          label="Resume"
          title={"Grab the full\nPDF resume"}
          
        />

        <FadeIn className="mt-16">
          <div className="overflow-hidden rounded-2xl border border-border bg-card">
            <div className="grid lg:grid-cols-5">
              {/* Resume preview mockup */}
              <div className="relative border-b border-border bg-[#111] p-6 sm:p-8 lg:col-span-3 lg:border-b-0 lg:border-r">
                <div className="mb-4 flex items-center gap-2">
                  <FileText size={14} className="text-accent-light" />
                  <span className="text-xs font-medium uppercase tracking-widest text-muted">
                    Preview
                  </span>
                </div>

                <div className="relative overflow-hidden rounded-xl border border-white/10 bg-[#fafafa] p-6 text-[#1a1a1a] shadow-2xl sm:p-8">
                  <div className="absolute left-0 top-0 h-1 w-full accent-gradient" />

                  <div className="border-b border-[#e5e5e5] pb-4">
                    <h3 className="font-display text-2xl font-medium tracking-tight">
                      {siteConfig.name.toUpperCase()}
                    </h3>
                    <p className="mt-1 text-sm text-[#555]">
                      {siteConfig.title} · {education.degree}
                    </p>
                    <p className="mt-2 text-xs text-[#777]">
                      {siteConfig.location} · {siteConfig.email}
                    </p>
                  </div>

                  <div className="mt-5 space-y-4 text-xs leading-relaxed text-[#444]">
                    <div>
                      <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-[#999]">
                        Education
                      </p>
                      <p className="font-medium text-[#222]">{education.school}</p>
                      <p>{education.degree} · {education.period}</p>
                      <p className="mt-0.5 text-[#666]">
                        CGPA: {education.cgpa} · {education.location}
                      </p>
                    </div>

                    <div>
                      <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-[#999]">
                        Technical Skills
                      </p>
                      <div className="space-y-1">
                        {skillGroups.map((group) => (
                          <p key={group.label}>
                            <span className="font-medium text-[#333]">
                              {group.label}:
                            </span>{" "}
                            {group.items}
                          </p>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-[#999]">
                        Coursework
                      </p>
                      <p>{education.coursework.join(" · ")}</p>
                    </div>
                  </div>

                  {/* Page fold shadow */}
                  <div className="pointer-events-none absolute -bottom-6 -right-6 h-24 w-24 bg-gradient-to-tl from-black/10 to-transparent" />
                </div>
              </div>

              {/* Download panel */}
              <div className="flex flex-col justify-center p-8 lg:col-span-2 lg:p-10">
                <span className="inline-block w-fit rounded-full accent-gradient px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-background">
                  PDF · Updated 2026
                </span>

                <h3 className="mt-5 font-display text-2xl font-medium text-foreground sm:text-3xl">
                  Download my resume
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  A single PDF with my internships, projects, skills, education,
                  and hackathon wins — ready to share with one click.
                </p>

                <ul className="mt-6 space-y-2.5">
                  {includes.map((item, i) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.06 }}
                      className="flex items-center gap-2.5 text-sm text-muted"
                    >
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      {item}
                    </motion.li>
                  ))}
                </ul>

                <div className="mt-8 flex items-center gap-3 rounded-xl border border-border bg-background/60 p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-accent/30 bg-accent/10">
                    <GraduationCap size={18} className="text-accent-light" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      CGPA {education.cgpa}
                    </p>
                    <p className="text-xs text-muted">{education.school}</p>
                  </div>
                </div>

                <Button
                  href={siteConfig.resumeUrl}
                  size="lg"
                  className="mt-8 w-full"
                  download
                >
                  <Download size={18} />
                  Download PDF
                </Button>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
