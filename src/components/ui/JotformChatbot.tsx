"use client";

import Script from "next/script";

const JOTFORM_AGENT_EMBED =
  "https://cdn.jotfor.ms/agent/embedjs/019eda01c0b27c9393256882fa1837069125/embed.js";

export function JotformChatbot() {
  return (
    <Script
      id="jotform-agent"
      src={JOTFORM_AGENT_EMBED}
      strategy="afterInteractive"
    />
  );
}
