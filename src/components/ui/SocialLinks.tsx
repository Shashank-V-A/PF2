import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  XIcon,
} from "@/components/ui/SocialIcons";
import { siteConfig } from "@/lib/data";

const socialItems = [
  { label: "GitHub", href: siteConfig.social.github, Icon: GitHubIcon },
  { label: "LinkedIn", href: siteConfig.social.linkedin, Icon: LinkedInIcon },
  { label: "X", href: siteConfig.social.twitter, Icon: XIcon },
  { label: "Instagram", href: siteConfig.social.instagram, Icon: InstagramIcon },
] as const;

export function SocialLinks({ size = 18 }: { size?: number }) {
  return (
    <>
      {socialItems.map(({ label, href, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted transition-all hover:border-accent hover:text-accent"
          aria-label={label}
        >
          <Icon size={size} />
        </a>
      ))}
    </>
  );
}
