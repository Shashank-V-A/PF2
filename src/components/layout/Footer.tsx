import { ProfileAvatar } from "@/components/ui/ProfileAvatar";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { siteConfig } from "@/lib/data";

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-card/50">
      <div className="absolute inset-0 grid-bg grid-bg-fade opacity-50" />
      <div className="relative mx-auto max-w-6xl px-6 py-16">
        <div className="flex flex-col items-center gap-8 text-center">
          <ProfileAvatar className="h-12 w-12 rounded-xl" />
          <div>
            <h3 className="font-display text-2xl font-medium text-accent-light sm:text-3xl">
              Let&apos;s build something remarkable together.
            </h3>
            <a
              href={`mailto:${siteConfig.email}`}
              className="mt-3 inline-block text-accent-light transition-colors hover:text-accent"
            >
              {siteConfig.email}
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <SocialLinks />
          </div>

          <p className="text-xs text-muted">
            © {new Date().getFullYear()} {siteConfig.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
