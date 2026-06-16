"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface CertificateModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  organization: string;
  imageSrc: string;
}

export function CertificateModal({
  open,
  onClose,
  title,
  organization,
  imageSrc,
}: CertificateModalProps) {
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (open) setImageError(false);
  }, [open, imageSrc]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={`Certificate: ${title}`}
        >
          <button
            type="button"
            className="absolute inset-0 bg-background/90 backdrop-blur-md"
            onClick={onClose}
            aria-label="Close certificate"
          />

          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative z-10 flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
          >
            <div className="flex items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
              <div className="min-w-0">
                <p className="text-xs uppercase tracking-widest text-accent-light">
                  {organization}
                </p>
                <h3 className="mt-1 font-display text-lg font-medium text-foreground sm:text-xl">
                  {title}
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border text-muted transition-colors hover:border-accent/30 hover:text-foreground"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            <div className="relative min-h-0 flex-1 overflow-auto bg-[#0d0d0d] p-4 sm:p-6">
              <div className="relative mx-auto aspect-[4/3] w-full max-w-2xl overflow-hidden rounded-lg border border-border/60">
                {imageError ? (
                  <div className="flex h-full min-h-[280px] flex-col items-center justify-center gap-2 px-6 text-center">
                    <p className="text-sm text-muted">Certificate image not found.</p>
                    <p className="text-xs text-muted/70">
                      Add your file to{" "}
                      <code className="text-accent-light">public/certificates/</code>
                    </p>
                  </div>
                ) : (
                  <Image
                    src={imageSrc}
                    alt={`${title} certificate`}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 672px"
                    priority
                    onError={() => setImageError(true)}
                  />
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
