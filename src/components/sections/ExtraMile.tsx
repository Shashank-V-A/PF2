"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BadgeCheck, ExternalLink, ImageIcon } from "lucide-react";
import { CertificateModal } from "@/components/ui/CertificateModal";
import { SectionHeader, FadeIn } from "@/components/ui/SectionHeader";
import { extraMile } from "@/lib/data";
import { cn } from "@/lib/utils";

type Achievement = (typeof extraMile.achievements)[number];

function AchievementRow({
  item,
  index,
  onViewCertificate,
}: {
  item: Achievement;
  index: number;
  onViewCertificate: (item: Achievement) => void;
}) {
  const num = String(index + 1).padStart(2, "0");

  return (
    <FadeIn delay={index * 0.08}>
      <motion.article
        className="group relative border-b border-border/50 py-8 last:border-b-0 sm:py-10"
      >
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex min-w-0 gap-5 sm:gap-8">
            <span
              className="shrink-0 font-display text-2xl tabular-nums text-accent/25 transition-colors duration-300 group-hover:text-accent/50 sm:text-3xl"
              aria-hidden
            >
              {num}
            </span>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-accent-light">
                  {item.year}
                </span>
                <span className="hidden text-border sm:inline" aria-hidden>
                  /
                </span>
                <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-muted">
                  {item.organization}
                </span>
              </div>

              <h3 className="mt-3 font-display text-xl font-medium leading-snug text-foreground sm:text-2xl">
                {item.title}
              </h3>

              <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted sm:text-[15px]">
                {item.description}
              </p>

              {item.link && (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-accent-light transition-colors hover:text-accent"
                >
                  View details
                  <ExternalLink size={12} />
                </a>
              )}
            </div>
          </div>

          {item.certificateImage && (
            <button
              type="button"
              onClick={() => onViewCertificate(item)}
              className={cn(
                "inline-flex w-fit shrink-0 items-center gap-2 rounded-full border border-accent/25 bg-accent/5 px-4 py-2.5 text-xs font-medium text-accent-light transition-all duration-300",
                "hover:border-accent/45 hover:bg-accent/10 hover:text-accent"
              )}
            >
              <ImageIcon size={14} strokeWidth={1.5} />
              View certificate
            </button>
          )}
        </div>
      </motion.article>
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
    <FadeIn delay={index * 0.08}>
      <motion.article
        whileHover={{ y: -2 }}
        transition={{ duration: 0.2 }}
        className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-colors duration-300 hover:border-accent/20 hover:bg-card-hover sm:p-7"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-border bg-background text-xs font-semibold text-accent-light">
            {initials}
          </div>
          <BadgeCheck
            size={18}
            className="shrink-0 text-accent/50 transition-colors group-hover:text-accent-light"
          />
        </div>

        <h3 className="mt-5 font-display text-lg font-medium leading-snug text-foreground">
          {cert.title}
        </h3>
        <p className="mt-1 text-sm text-muted">{cert.issuer}</p>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-border bg-background px-2.5 py-0.5 text-[11px] tabular-nums text-muted">
            {cert.year}
          </span>
          {cert.credentialId && (
            <span className="rounded-full border border-border bg-background px-2.5 py-0.5 font-mono text-[10px] text-muted">
              ID: {cert.credentialId}
            </span>
          )}
        </div>

        {cert.skills.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
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
            className="mt-auto inline-flex items-center gap-1.5 pt-5 text-xs font-medium text-accent-light transition-colors hover:text-accent"
          >
            Verify credential
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

  return (
    <section id="extra-mile" className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[400px] w-[500px] -translate-x-1/2 rounded-full bg-accent/5 blur-[120px]" />

      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHeader
          label="Extra Mile"
          title={"Achievements &\ncertifications"}
        />

        <div
          className={cn(
            "mt-16 gap-16",
            certifications.length > 0
              ? "grid lg:grid-cols-[1.1fr_0.9fr] lg:gap-20"
              : "mx-auto max-w-3xl"
          )}
        >
          <div>
            <div className="mb-2 border-b border-border/60 pb-4">
              <h3 className="font-display text-lg font-medium text-accent-light sm:text-xl">
                Achievements
              </h3>
              <p className="mt-1 text-sm text-muted">
                Hackathon wins and recognition
              </p>
            </div>

            <div>
              {achievements.length === 0 ? (
                <p className="py-12 text-center text-sm text-muted">
                  Add achievements in{" "}
                  <code className="text-accent-light">src/lib/data.ts</code>
                </p>
              ) : (
                achievements.map((item, i) => (
                  <AchievementRow
                    key={item.title}
                    item={item}
                    index={i}
                    onViewCertificate={setActiveCertificate}
                  />
                ))
              )}
            </div>
          </div>

          {certifications.length > 0 && (
            <div>
              <div className="mb-6 border-b border-border/60 pb-4">
                <h3 className="font-display text-lg font-medium text-accent-light sm:text-xl">
                  Certifications
                </h3>
                <p className="mt-1 text-sm text-muted">
                  Verified credentials & courses
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                {certifications.map((cert, i) => (
                  <CertificationCard key={cert.title} cert={cert} index={i} />
                ))}
              </div>
            </div>
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
