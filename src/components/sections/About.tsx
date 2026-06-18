"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Briefcase,
  Download,
  GraduationCap,
  MapPin,
  Trophy,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SectionHeader, FadeIn } from "@/components/ui/SectionHeader";
import { aboutContent, resumeInfo, stats, siteConfig } from "@/lib/data";

const statIcons = [Trophy, Briefcase];

function CodeEditorMockup() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-2xl glow-accent">
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#FF5F56]" />
        <span className="h-3 w-3 rounded-full bg-[#FFBD2E]" />
        <span className="h-3 w-3 rounded-full bg-[#27C93F]" />
        <span className="ml-3 text-xs text-muted">portfolio.tsx</span>
      </div>
      <pre className="overflow-x-auto p-6 text-left text-sm leading-relaxed">
        <code>
          <span className="text-purple-400">const</span>{" "}
          <span className="text-blue-300">developer</span>{" "}
          <span className="text-foreground">=</span> {"{"}
          {"\n"}
          {"  "}
          <span className="text-green-300">name</span>:{" "}
          <span className="text-orange-300">
            &quot;{siteConfig.name}&quot;
          </span>
          ,{"\n"}
          {"  "}
          <span className="text-green-300">role</span>:{" "}
          <span className="text-orange-300">
            &quot;{siteConfig.title}&quot;
          </span>
          ,{"\n"}
          {"  "}
          <span className="text-green-300">location</span>:{" "}
          <span className="text-orange-300">
            &quot;{siteConfig.location}&quot;
          </span>
          ,{"\n"}
          {"  "}
          <span className="text-green-300">passion</span>:{" "}
          <span className="text-orange-300">
            &quot;{aboutContent.passion}&quot;
          </span>
          ,{"\n"}
          {"  "}
          <span className="text-green-300">available</span>:{" "}
          <span className="text-orange-300">True</span>
          {"\n"}
          {"}"};
        </code>
      </pre>
    </div>
  );
}

export function About() {
  return (
    <section id="about" className="relative overflow-hidden pt-28 pb-24 sm:pt-32 sm:pb-32">
      <div className="absolute inset-0 grid-bg grid-bg-fade opacity-40" />
      <div className="absolute top-1/4 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]" />

      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHeader
          label="About"
          title={"The developer behind\nthe pixels"}
        />

        <FadeIn delay={0.1}>
          <div className="mt-14 overflow-hidden rounded-2xl border border-border bg-card lg:grid lg:grid-cols-5">
            <div className="relative lg:col-span-2">
              <div className="relative aspect-[4/5] overflow-hidden sm:aspect-[5/6] lg:aspect-auto lg:min-h-[520px]">
                <Image
                  src={siteConfig.profileImage}
                  alt={siteConfig.name}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/10 to-transparent" />
              </div>

              <div className="absolute inset-x-0 bottom-0 border-t border-border/60 bg-card/90 p-4 backdrop-blur-md sm:p-5">
                <div className="grid grid-cols-2 gap-3">
                  {stats.map((stat, i) => {
                    const Icon = statIcons[i] ?? Trophy;
                    return (
                      <div
                        key={stat.label}
                        className="rounded-xl border border-border bg-background/80 px-3 py-3 sm:px-4"
                      >
                        <Icon
                          size={14}
                          className="text-accent-light"
                          strokeWidth={1.5}
                        />
                        <p className="mt-2 font-display text-2xl font-medium text-accent-light sm:text-3xl">
                          {stat.value}
                        </p>
                        <p className="mt-0.5 text-[11px] leading-snug text-muted sm:text-xs">
                          {stat.label}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <motion.div
              initial={false}
              className="flex flex-col justify-center p-7 sm:p-9 lg:col-span-3 lg:p-10 xl:p-12"
            >
              <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
                <span className="rounded-full border border-border bg-background px-2.5 py-1 font-medium text-foreground/80">
                  {siteConfig.title}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin size={12} className="text-accent-light" />
                  {siteConfig.location}
                </span>
              </div>

              <h3 className="mt-5 font-display text-2xl font-medium text-foreground sm:text-3xl lg:text-[2rem]">
                {aboutContent.headline}
              </h3>

              <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted sm:text-[15px]">
                {aboutContent.bio.map((paragraph) => (
                  <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-2 border-t border-border/60 pt-6">
                {aboutContent.traits.map((trait) => (
                  <span
                    key={trait}
                    className="rounded-full border border-border bg-background px-3.5 py-1.5 text-xs text-foreground/75"
                  >
                    {trait}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex items-start gap-3 rounded-xl border border-border bg-background/60 p-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-card text-accent-light">
                  <GraduationCap size={16} strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {resumeInfo.education.school}
                  </p>
                  <p className="mt-0.5 text-xs text-muted">
                    {resumeInfo.education.degree} · {resumeInfo.education.period}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="mt-14 flex flex-col items-center text-center">
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button href="#projects" size="lg">
                View my work
              </Button>
              <Button href="#resume" variant="secondary" size="lg">
                <Download size={18} />
                Download resume
              </Button>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="relative mt-12 w-full max-w-3xl animate-float"
            >
              <CodeEditorMockup />
            </motion.div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
