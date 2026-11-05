"use client";

import { useEffect, useRef, useState } from "react";
import { GHL_FORM } from "@/lib/constants";
import { bindGhlIframe } from "@/lib/ghlEmbed";

export default function GhlLeadForm({
  id,
  iframeId,
}: {
  id: string;
  iframeId: string;
}) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    return bindGhlIframe(iframe, {
      onReady: () => setReady(true),
    });
  }, []);

  return (
    <div id={id} className={`ghl-lead-form${ready ? " is-ready" : " is-loading"}`}>
      <div className="ghl-lead-form-card">
        <div
          className="ghl-lead-form-loader"
          aria-live="polite"
          aria-busy={!ready}
          aria-hidden={ready}
        >
          <span className="ghl-lead-form-spinner" aria-hidden />
          <span className="ghl-lead-form-loader-text">Loading form…</span>
        </div>
        <iframe
          ref={iframeRef}
          src={GHL_FORM.src}
          id={iframeId}
          title={GHL_FORM.title}
          data-layout={"{'id':'INLINE'}"}
          data-trigger-type="alwaysShow"
          data-trigger-value=""
          data-activation-type="alwaysActivated"
          data-activation-value=""
          data-deactivation-type="neverDeactivate"
          data-deactivation-value=""
          data-form-name={GHL_FORM.name}
          data-height={String(GHL_FORM.height)}
          data-layout-iframe-id={iframeId}
          data-form-id={GHL_FORM.id}
          data-cookie-consent="true"
          data-cookie-consent-provider="auto"
          className="ghl-lead-form-iframe"
          style={{ width: "100%", height: GHL_FORM.height }}
        />
      </div>
    </div>
  );
}
