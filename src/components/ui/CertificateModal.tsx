"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface CertificateModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  organization: string;
  imageSrc: string | string[];
}

export function CertificateModal({
  open,
  onClose,
  title,
  organization,
  imageSrc,
}: CertificateModalProps) {
  const images = useMemo(
    () => (Array.isArray(imageSrc) ? imageSrc : [imageSrc]),
    [imageSrc]
  );
  const [page, setPage] = useState(0);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (open) {
      setPage(0);
      setImageError(false);
    }
  }, [open, imageSrc]);

  useEffect(() => {
    setImageError(false);
  }, [page]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && page > 0) setPage((p) => p - 1);
      if (e.key === "ArrowRight" && page < images.length - 1)
        setPage((p) => p + 1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose, page, images.length]);

  const currentSrc = images[page];
  const hasMultiple = images.length > 1;

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
                {hasMultiple && (
                  <p className="mt-1 text-xs text-muted">
                    Page {page + 1} of {images.length}
                  </p>
                )}
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
              <div className="relative mx-auto min-h-[280px] w-full max-w-2xl overflow-hidden rounded-lg border border-border/60 sm:min-h-[420px]">
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
                    key={currentSrc}
                    src={currentSrc}
                    alt={`${title} — page ${page + 1}`}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 672px"
                    priority
                    onError={() => setImageError(true)}
                  />
                )}
              </div>

              {hasMultiple && !imageError && (
                <div className="mt-4 flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => setPage((p) => Math.max(0, p - 1))}
                    disabled={page === 0}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted transition-colors hover:border-accent/30 hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
                    aria-label="Previous page"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <span className="text-xs tabular-nums text-muted">
                    {page + 1} / {images.length}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setPage((p) => Math.min(images.length - 1, p + 1))
                    }
                    disabled={page === images.length - 1}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted transition-colors hover:border-accent/30 hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
                    aria-label="Next page"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
