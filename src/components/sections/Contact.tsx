"use client";

import { useEffect, useState } from "react";
import { Send, Mail, MapPin, Loader2 } from "lucide-react";
import { SectionHeader, FadeIn } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { siteConfig } from "@/lib/data";

function ContactFormSkeleton() {
  return (
    <div className="space-y-5" aria-hidden>
      {["Name", "Email", "Message"].map((label) => (
        <div key={label}>
          <div className="mb-2 h-4 w-16 rounded bg-border/60" />
          <div
            className={`w-full rounded-xl border border-border bg-background ${
              label === "Message" ? "h-[130px]" : "h-11"
            }`}
          />
        </div>
      ))}
      <div className="mt-6 h-12 w-full rounded-full bg-border/40" />
    </div>
  );
}

type FormStatus = "idle" | "loading" | "success" | "error";

function ContactForm() {
  const [mounted, setMounted] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });

      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-border bg-card p-8"
      suppressHydrationWarning
    >
      {!mounted ? (
        <ContactFormSkeleton />
      ) : status === "success" ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
            <Send size={24} className="text-accent" />
          </div>
          <h3 className="mt-4 font-display text-xl font-medium">
            Message sent!
          </h3>
          <p className="mt-2 max-w-sm text-sm text-muted">
            Thanks for reaching out — I&apos;ll get back to you at{" "}
            <span className="text-accent-light">{formState.email}</span> soon.
          </p>
        </div>
      ) : (
        <>
          <div className="space-y-5">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-foreground"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                autoComplete="name"
                disabled={status === "loading"}
                value={formState.name}
                onChange={(e) =>
                  setFormState({ ...formState, name: e.target.value })
                }
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted/50 focus:border-accent/50 disabled:opacity-60"
                placeholder="Your name"
                suppressHydrationWarning
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-foreground"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                disabled={status === "loading"}
                value={formState.email}
                onChange={(e) =>
                  setFormState({ ...formState, email: e.target.value })
                }
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted/50 focus:border-accent/50 disabled:opacity-60"
                placeholder="you@example.com"
                suppressHydrationWarning
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="mb-2 block text-sm font-medium text-foreground"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                disabled={status === "loading"}
                value={formState.message}
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    message: e.target.value,
                  })
                }
                className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted/50 focus:border-accent/50 disabled:opacity-60"
                placeholder="Tell me about your project..."
                suppressHydrationWarning
              />
            </div>
          </div>

          {status === "error" && errorMessage && (
            <p className="mt-4 text-sm text-red-400" role="alert">
              {errorMessage}
            </p>
          )}

          <Button
            type="submit"
            size="lg"
            className="mt-6 w-full"
            disabled={status === "loading"}
          >
            {status === "loading" ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send size={18} />
                Send message
              </>
            )}
          </Button>
        </>
      )}
    </form>
  );
}

export function Contact() {
  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="absolute inset-0 bg-gradient-to-t from-accent/5 to-transparent" />
      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHeader
          label="Contact"
          title={"Let's create something\ngreat together"}
        />

        <div className="mt-16 grid gap-10 lg:grid-cols-2">
          <FadeIn>
            <ContactForm />
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="rounded-2xl border border-border bg-card p-8">
              <h3 className="font-display text-xl font-medium text-foreground">
                Get in touch
              </h3>
              <div className="mt-6 space-y-4">
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-3 text-sm text-muted transition-colors hover:text-foreground"
                >
                  <Mail size={18} className="text-accent" />
                  {siteConfig.email}
                </a>
                <p className="flex items-center gap-3 text-sm text-muted">
                  <MapPin size={18} className="text-accent" />
                  {siteConfig.location}
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-3 border-t border-border/60 pt-6">
                <SocialLinks />
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
