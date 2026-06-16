import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: never;
};

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  href: string;
};

type Props = ButtonProps | LinkProps;

const variants = {
  primary:
    "accent-gradient text-background hover:opacity-90 glow-accent border border-accent/30",
  secondary:
    "bg-card text-foreground border border-border hover:border-border-hover hover:bg-card-hover",
  ghost: "text-muted hover:text-foreground",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

export function Button(props: Props) {
  const { variant = "primary", size = "md", className, ...rest } = props;
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 cursor-pointer",
    variants[variant],
    sizes[size],
    className
  );

  if ("href" in props && props.href) {
    const { href, ...linkRest } = rest as LinkProps;
    return (
      <a href={href} className={classes} {...linkRest}>
        {props.children}
      </a>
    );
  }

  return (
    <button className={classes} {...(rest as ButtonProps)}>
      {props.children}
    </button>
  );
}
