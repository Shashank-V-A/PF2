import Image from "next/image";
import { siteConfig } from "@/lib/data";
import { cn } from "@/lib/utils";

interface ProfileAvatarProps {
  className?: string;
  imageClassName?: string;
}

export function ProfileAvatar({ className, imageClassName }: ProfileAvatarProps) {
  return (
    <div
      className={cn(
        "relative shrink-0 overflow-hidden border border-border bg-card",
        className
      )}
    >
      <Image
        src={siteConfig.profileImage}
        alt={siteConfig.name}
        fill
        className={cn("object-cover object-top", imageClassName)}
        sizes="48px"
        priority
      />
    </div>
  );
}
