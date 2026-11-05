const GHL_IFRAME_RESIZER_ATTR = "data-iframe-resizer-initialized";
const GHL_HIDE_ATTR = "data-initial-iframe-hidden";
const GHL_READY_ATTR = "data-ghl-ready";
export const GHL_EMBED_READY_EVENT = "ghl-embed-ready";

type IFrameResizeFn = (
  options: Record<string, unknown>,
  target?: HTMLIFrameElement,
) => void;

type GhlWindow = Window & { iFrameResize?: IFrameResizeFn };

/** form_embed.js hides widgets until resize; force them visible without thrashing size. */
export function revealGhlIframe(iframe: HTMLIFrameElement): void {
  iframe.removeAttribute(GHL_HIDE_ATTR);
  Object.assign(iframe.style, {
    visibility: "visible",
    pointerEvents: "auto",
    display: "block",
    position: "static",
    left: "auto",
    right: "auto",
    top: "auto",
  });

  const fallback = iframe.getAttribute("data-height");
  if (fallback && iframe.clientHeight < 120) {
    iframe.style.height = `${fallback}px`;
  }
}

function markReady(iframe: HTMLIFrameElement): void {
  if (iframe.getAttribute(GHL_READY_ATTR) === "true") {
    revealGhlIframe(iframe);
    return;
  }
  revealGhlIframe(iframe);
  iframe.setAttribute(GHL_READY_ATTR, "true");
  iframe.style.opacity = "1";
}

export function isGhlEmbedReady(): boolean {
  return typeof (window as GhlWindow).iFrameResize === "function";
}

export function notifyGhlEmbedReady(): void {
  window.dispatchEvent(new Event(GHL_EMBED_READY_EVENT));
}

/** Re-run GHL form_embed.js setup so the iframe shows on first paint, not only after refresh. */
export function initGhlIframe(iframe: HTMLIFrameElement, force = false): void {
  revealGhlIframe(iframe);

  const contentWindow = iframe.contentWindow;
  if (contentWindow) {
    try {
      window.dispatchEvent(
        new MessageEvent("message", {
          data: ["iframeLoaded"],
          source: contentWindow,
        }),
      );
    } catch {
      // ignore
    }
  }

  const iFrameResize = (window as GhlWindow).iFrameResize;
  if (typeof iFrameResize !== "function") return;
  if (!force && iframe.getAttribute(GHL_IFRAME_RESIZER_ATTR) === "true") return;

  iframe.setAttribute(GHL_IFRAME_RESIZER_ATTR, "false");
  try {
    iFrameResize(
      {
        log: false,
        checkOrigin: false,
        enablePublicMethods: true,
        scrolling: false,
        heightCalculationMethod: "lowestElement",
        autoResize: true,
        sizeWidth: false,
        sizeHeight: true,
        resizedCallback: (data: { iframe?: HTMLIFrameElement; height?: number }) => {
          const el = data?.iframe;
          const height = data?.height;
          if (!el) return;
          if (typeof height === "number" && height >= 200) {
            el.style.height = `${height + 2}px`;
            el.style.minHeight = "0";
            el.setAttribute(GHL_IFRAME_RESIZER_ATTR, "true");
          }
          markReady(el);
        },
      },
      iframe,
    );
  } catch {
    markReady(iframe);
  }
}

export function waitForGhlEmbed(iframe: HTMLIFrameElement, attempt = 0): void {
  revealGhlIframe(iframe);

  if (isGhlEmbedReady()) {
    initGhlIframe(iframe, false);
    // Fallback show if resize never reports (avoids endless blank state).
    window.setTimeout(() => markReady(iframe), 900);
    return;
  }

  if (attempt >= 60) {
    markReady(iframe);
    return;
  }

  window.setTimeout(() => waitForGhlEmbed(iframe, attempt + 1), 100);
}

/** Bind load + script-ready listeners so embeds init on first paint, not only after refresh. */
export function bindGhlIframe(iframe: HTMLIFrameElement): () => void {
  // Hold opacity until first ready mark so form_embed hide/show doesn't flicker.
  iframe.style.opacity = "0";
  iframe.style.transition = "opacity 0.2s ease";

  const run = () => waitForGhlEmbed(iframe);

  iframe.addEventListener("load", run);
  window.addEventListener(GHL_EMBED_READY_EVENT, run);

  // Re-apply visibility if form_embed.js hides the iframe again mid-init.
  const observer = new MutationObserver(() => {
    if (iframe.getAttribute(GHL_HIDE_ATTR) != null || iframe.style.visibility === "hidden") {
      revealGhlIframe(iframe);
    }
  });
  observer.observe(iframe, {
    attributes: true,
    attributeFilter: ["style", "data-initial-iframe-hidden", "hidden"],
  });

  run();

  return () => {
    iframe.removeEventListener("load", run);
    window.removeEventListener(GHL_EMBED_READY_EVENT, run);
    observer.disconnect();
  };
}
