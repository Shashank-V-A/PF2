"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, BadgeCheck, ExternalLink, Trophy } from "lucide-react";
import { CertificateModal } from "@/components/ui/CertificateModal";
import { SectionHeader, FadeIn } from "@/components/ui/SectionHeader";
import { extraMile } from "@/lib/data";
import { cn } from "@/lib/utils";

type Achievement = (typeof extraMile.achievements)[number];

function parseAchievement(title: string) {
  const match = title.match(/^(.+?)\s*—\s*(.+)$/);
  if (!match) return { event: title, result: null as string | null };
  return { event: match[1].trim(), result: match[2].trim() };
}

function resultBadge(result: string | null) {
  if (!result) return { label: "Award", tone: "neutral" as const };
  if (/winner/i.test(result)) return { label: "Winner", tone: "gold" as const };
  if (/1st|first/i.test(result)) return { label: "1st", tone: "gold" as const };
  if (/2nd|second/i.test(result)) return { label: "2nd", tone: "silver" as const };
  if (/3rd|third/i.test(result)) return { label: "3rd", tone: "bronze" as const };
  return { label: result, tone: "neutral" as const };
}

const badgeStyles = {
  gold: "border-accent/40 bg-accent/10 text-accent-light",
  silver: "border-white/15 bg-white/5 text-foreground/80",
  bronze: "border-orange-400/25 bg-orange-400/10 text-orange-200/90",
  neutral: "border-border bg-background/60 text-muted",
};

function AchievementCard({
  item,
  index,
  onViewCertificate,
}: {
  item: Achievement;
  index: number;
  onViewCertificate: (item: Achievement) => void;
}) {
  const { event, result } = parseAchievement(item.title);
  const badge = resultBadge(result);
  const hasCertificate = !!item.certificateImage;

  const inner = (
    <>
      <div className="flex items-start justify-between gap-4">
        <span
          className={cn(
            "inline-flex shrink-0 items-center rounded-md border px-2 py-0.5 text-[11px] font-medium tracking-wide",
            badgeStyles[badge.tone]
          )}
        >
          {badge.label}
        </span>
        <span className="shrink-0 text-xs tabular-nums text-muted">{item.year}</span>
      </div>

      <div className="mt-4 min-w-0">
        <h3 className="text-[15px] font-medium leading-snug text-foreground sm:text-base">
          {event}
        </h3>
        <p className="mt-1 text-sm text-muted">{item.organization}</p>
        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-foreground/55">
          {item.description}
        </p>
      </div>

      <div className="mt-5 flex items-center justify-between gap-3 border-t border-border/50 pt-4">
        {item.link ? (
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1 text-xs text-muted transition-colors hover:text-foreground"
          >
            Details
            <ExternalLink size={12} />
          </a>
        ) : (
          <span className="text-xs capitalize text-muted/70">{item.type}</span>
        )}

        {hasCertificate && (
          <span className="inline-flex items-center gap-1 text-xs font-medium text-accent-light transition-colors group-hover:text-accent">
            Certificate
            <ArrowUpRight
              size={13}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </span>
        )}
      </div>
    </>
  );

  return (
    <FadeIn delay={index * 0.05}>
      {hasCertificate ? (
        <motion.button
          type="button"
          onClick={() => onViewCertificate(item)}
          whileHover={{ y: -2 }}
          transition={{ duration: 0.2 }}
          className={cn(
            "group flex h-full w-full flex-col rounded-xl border border-border/80 bg-card p-5 text-left transition-colors sm:p-6",
            "hover:border-accent/25 hover:bg-card-hover",
            badge.tone === "gold" && "ring-1 ring-inset ring-accent/10"
          )}
        >
          {inner}
        </motion.button>
      ) : (
        <motion.article
          whileHover={{ y: -2 }}
          transition={{ duration: 0.2 }}
          className="group flex h-full flex-col rounded-xl border border-border/80 bg-card p-5 transition-colors sm:p-6 hover:border-border-hover hover:bg-card-hover"
        >
          {inner}
        </motion.article>
      )}
    </FadeIn>
  );
}

function CertificationCard({
  cert,
  index,
}: {
  cert: (typeof extraMile.certifications)[number];
  index: number;
}) {
  const initials = cert.issuer
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <FadeIn delay={index * 0.05}>
      <motion.article
        whileHover={{ y: -2 }}
        transition={{ duration: 0.2 }}
        className="group flex h-full flex-col rounded-xl border border-border/80 bg-card p-5 transition-colors sm:p-6 hover:border-accent/20 hover:bg-card-hover"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-background text-[11px] font-semibold text-accent-light">
            {initials}
          </div>
          <BadgeCheck
            size={16}
            className="shrink-0 text-accent/40 transition-colors group-hover:text-accent-light"
          />
        </div>

        <h3 className="mt-4 text-[15px] font-medium leading-snug text-foreground">
          {cert.title}
        </h3>
        <p className="mt-1 text-sm text-muted">{cert.issuer}</p>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="rounded-md border border-border bg-background px-2 py-0.5 text-[11px] tabular-nums text-muted">
            {cert.year}
          </span>
          {cert.credentialId && (
            <span className="rounded-md border border-border bg-background px-2 py-0.5 font-mono text-[10px] text-muted">
              {cert.credentialId}
            </span>
          )}
        </div>

        {cert.skills.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {cert.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-md border border-border/80 bg-background/60 px-2 py-0.5 text-[11px] text-muted"
              >
                {skill}
              </span>
            ))}
          </div>
        )}

        {cert.verifyUrl && (
          <a
            href={cert.verifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto inline-flex items-center gap-1.5 pt-4 text-xs text-accent-light transition-colors hover:text-accent"
          >
            Verify
            <ExternalLink size={12} />
          </a>
        )}
      </motion.article>
    </FadeIn>
  );
}

export function ExtraMile() {
  const { achievements, certifications } = extraMile;
  const [activeCertificate, setActiveCertificate] = useState<Achievement | null>(
    null
  );

  const wins = achievements.filter((a) =>
    /winner|1st|first/i.test(parseAchievement(a.title).result ?? "")
  ).length;

  return (
    <section id="extra-mile" className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[400px] w-[500px] -translate-x-1/2 rounded-full bg-accent/5 blur-[120px]" />

      <div className="relative mx-auto max-w-5xl px-6">
        <SectionHeader
          label="Extra Mile"
          title={"Achievements &\ncertifications"}
        />

        {achievements.length > 0 && (
          <FadeIn delay={0.05}>
            <div className="mx-auto mt-10 flex max-w-xl flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted">
              <span className="inline-flex items-center gap-2">
                <Trophy size={15} className="text-accent" />
                <span>
                  <span className="font-medium text-foreground">{achievements.length}</span>{" "}
                  podium finishes
                </span>
              </span>
              <span className="hidden h-3 w-px bg-border sm:block" aria-hidden />
              <span>
                <span className="font-medium text-foreground">{wins}</span> wins
              </span>
              <span className="hidden h-3 w-px bg-border sm:block" aria-hidden />
              <span>2025 – 2026</span>
            </div>
          </FadeIn>
        )}

        <div
          className={cn(
            "mt-12",
            certifications.length > 0 && "grid gap-12 lg:grid-cols-[1fr_320px] lg:gap-14"
          )}
        >
          <div>
            {achievements.length === 0 ? (
              <p className="py-12 text-center text-sm text-muted">
                Add achievements in{" "}
                <code className="text-accent-light">src/lib/data.ts</code>
              </p>
            ) : (
              <div className="grid gap-3 sm:grid-cols-2">
                {achievements.map((item, i) => (
                  <AchievementCard
                    key={item.title}
                    item={item}
                    index={i}
                    onViewCertificate={setActiveCertificate}
                  />
                ))}
              </div>
            )}
          </div>

          {certifications.length > 0 && (
            <aside>
              <p className="mb-4 text-xs font-medium uppercase tracking-wider text-muted">
                Certifications
              </p>
              <div className="grid gap-3">
                {certifications.map((cert, i) => (
                  <CertificationCard key={cert.title} cert={cert} index={i} />
                ))}
              </div>
            </aside>
          )}
        </div>
      </div>

      {activeCertificate?.certificateImage && (
        <CertificateModal
          open={!!activeCertificate}
          onClose={() => setActiveCertificate(null)}
          title={activeCertificate.title}
          organization={activeCertificate.organization}
          imageSrc={activeCertificate.certificateImage}
        />
      )}
    </section>
  );
}
