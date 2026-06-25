"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Trophy } from "lucide-react";
import { CertificateModal } from "@/components/ui/CertificateModal";
import { SectionHeader, FadeIn } from "@/components/ui/SectionHeader";
import { achievements } from "@/lib/data";
import { cn } from "@/lib/utils";

type Achievement = (typeof achievements)[number];

function getPosterImage(item: Achievement) {
  return item.posterImage;
}

function getCertificateImage(item: Achievement) {
  return item.certificateImage;
}

function hasViewableCertificate(item: Achievement) {
  return !!getCertificateImage(item);
}

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
  gold: "text-accent-light",
  silver: "text-foreground/70",
  bronze: "text-orange-300/90",
  neutral: "text-muted",
};

function AchievementPoster({
  item,
  badge,
}: {
  item: Achievement;
  badge: ReturnType<typeof resultBadge>;
}) {
  const posterSrc = getPosterImage(item);
  if (!posterSrc) return null;

  const isLogoPoster = "imageFit" in item && item.imageFit === "contain";

  return (
    <div className="relative h-24 w-36 shrink-0 overflow-hidden rounded-lg border border-border/80 bg-background/50 sm:h-28 sm:w-44">
      {isLogoPoster ? (
        <div className="absolute inset-0 bg-gradient-to-br from-violet-950 to-violet-900/60">
          <Image
            src={posterSrc}
            alt={`${item.title} event poster`}
            fill
            className="object-contain p-3 transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 144px, 176px"
          />
        </div>
      ) : (
        <>
          <Image
            src={posterSrc}
            alt={`${item.title} event poster`}
            fill
            className="object-cover object-center transition-transform duration-300 group-hover:scale-[1.03]"
            sizes="(max-width: 640px) 144px, 176px"
          />
          <div className="pointer-events-none absolute inset-0 bg-black/10" />
        </>
      )}

      <span
        className={cn(
          "absolute left-2 top-2 rounded px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide backdrop-blur-sm",
          badge.tone === "gold" && "bg-accent/90 text-background",
          badge.tone === "silver" && "bg-white/20 text-foreground",
          badge.tone === "bronze" && "bg-orange-500/80 text-white",
          badge.tone === "neutral" && "bg-black/50 text-white/80"
        )}
      >
        {badge.label}
      </span>
    </div>
  );
}

function AchievementRow({
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
  const hasCertificate = hasViewableCertificate(item);
  const posterSrc = getPosterImage(item);

  const inner = (
    <>
      {posterSrc ? (
        <AchievementPoster item={item} badge={badge} />
      ) : null}

      <div className="flex min-w-0 flex-1 flex-col justify-center">
        <div className="flex items-center gap-2">
          {!hasCertificate && (
            <span
              className={cn(
                "text-[11px] font-medium uppercase tracking-wide",
                badgeStyles[badge.tone]
              )}
            >
              {badge.label}
            </span>
          )}
          <span className="text-[11px] tabular-nums text-muted">{item.year}</span>
        </div>

        <p className="mt-1 text-sm font-medium leading-snug text-foreground sm:text-[15px]">
          {event}
        </p>
        <p className="mt-0.5 text-xs text-muted">{item.organization}</p>
        <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-foreground/45">
          {item.description}
        </p>

        {hasCertificate && (
          <span className="mt-2.5 inline-flex items-center gap-1 text-[11px] font-medium text-accent-light/80 transition-colors group-hover:text-accent">
            View certificate
            <ArrowUpRight
              size={12}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </span>
        )}
      </div>
    </>
  );

  const rowClass = cn(
    "group flex w-full items-stretch gap-3.5 rounded-xl border border-border/60 bg-card/40 p-3 text-left transition-colors sm:gap-4 sm:p-3.5",
    hasCertificate && "cursor-pointer hover:border-border-hover hover:bg-card-hover",
    !hasCertificate && "hover:border-border-hover"
  );

  return (
    <FadeIn delay={index * 0.04}>
      {hasCertificate ? (
        <motion.button
          type="button"
          onClick={() => onViewCertificate(item)}
          whileHover={{ x: 2 }}
          transition={{ duration: 0.15 }}
          className={rowClass}
        >
          {inner}
        </motion.button>
      ) : (
        <motion.article
          whileHover={{ x: 2 }}
          transition={{ duration: 0.15 }}
          className={rowClass}
        >
          {inner}
        </motion.article>
      )}
    </FadeIn>
  );
}

export function ExtraMile() {
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

        <FadeIn delay={0.05}>
          <div className="mx-auto mt-8 flex max-w-md flex-wrap items-center justify-center gap-x-5 gap-y-1 text-xs text-muted">
            <span className="inline-flex items-center gap-1.5">
              <Trophy size={13} className="text-accent" />
              <span>
                <span className="font-medium text-foreground">
                  {achievements.length}
                </span>{" "}
                podiums
              </span>
            </span>
            <span className="hidden h-2.5 w-px bg-border sm:block" aria-hidden />
            <span>
              <span className="font-medium text-foreground">{wins}</span> wins
            </span>
            <span className="hidden h-2.5 w-px bg-border sm:block" aria-hidden />
            <span>2025 – 2026</span>
          </div>
        </FadeIn>

        <div className="mx-auto mt-10 flex max-w-3xl flex-col gap-2.5">
          {achievements.map((item, i) => (
            <AchievementRow
              key={item.title}
              item={item}
              index={i}
              onViewCertificate={setActiveCertificate}
            />
          ))}
        </div>
      </div>

      {activeCertificate && getCertificateImage(activeCertificate) && (
        <CertificateModal
          open={!!activeCertificate}
          onClose={() => setActiveCertificate(null)}
          title={activeCertificate.title}
          organization={activeCertificate.organization}
          imageSrc={getCertificateImage(activeCertificate)!}
        />
      )}
    </section>
  );
}
