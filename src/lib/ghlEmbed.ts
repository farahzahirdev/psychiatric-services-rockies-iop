const GHL_IFRAME_RESIZER_ATTR = "data-iframe-resizer-initialized";
const GHL_HIDE_ATTR = "data-initial-iframe-hidden";
const GHL_READY_ATTR = "data-ghl-ready";
const GHL_INIT_ATTR = "data-ghl-init";
export const GHL_EMBED_READY_EVENT = "ghl-embed-ready";

type IFrameResizeFn = (
  options: Record<string, unknown>,
  target?: HTMLIFrameElement,
) => void;

type GhlWindow = Window & { iFrameResize?: IFrameResizeFn };

type BindOptions = {
  onReady?: () => void;
};

/** Keep embed in the layout but invisible until we mark it ready. */
export function revealGhlIframe(iframe: HTMLIFrameElement): void {
  iframe.removeAttribute(GHL_HIDE_ATTR);
  const ready = iframe.getAttribute(GHL_READY_ATTR) === "true";
  Object.assign(iframe.style, {
    visibility: "visible",
    pointerEvents: ready ? "auto" : "none",
    display: "block",
    position: "static",
    left: "auto",
    right: "auto",
    top: "auto",
    // Never bump opacity here — only markReady does that once.
    opacity: ready ? "1" : "0",
  });

  const fallback = iframe.getAttribute("data-height");
  if (!ready && fallback && iframe.clientHeight < 120) {
    iframe.style.height = `${fallback}px`;
  }
}

function markReady(iframe: HTMLIFrameElement, onReady?: () => void): void {
  if (iframe.getAttribute(GHL_READY_ATTR) === "true") return;

  iframe.setAttribute(GHL_READY_ATTR, "true");
  revealGhlIframe(iframe);
  // Reveal on next frame so height is applied before the fade-in.
  window.requestAnimationFrame(() => {
    iframe.style.opacity = "1";
    iframe.style.pointerEvents = "auto";
    onReady?.();
  });
}

export function isGhlEmbedReady(): boolean {
  return typeof (window as GhlWindow).iFrameResize === "function";
}

export function notifyGhlEmbedReady(): void {
  window.dispatchEvent(new Event(GHL_EMBED_READY_EVENT));
}

/** Re-run GHL form_embed.js setup so the iframe shows on first paint, not only after refresh. */
export function initGhlIframe(
  iframe: HTMLIFrameElement,
  onReady?: () => void,
): void {
  if (iframe.getAttribute(GHL_INIT_ATTR) === "true") return;
  iframe.setAttribute(GHL_INIT_ATTR, "true");

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
          if (!el || typeof height !== "number" || height < 200) return;

          // Apply final height while still hidden, then show once.
          el.style.height = `${height + 2}px`;
          el.style.minHeight = "0";
          el.setAttribute(GHL_IFRAME_RESIZER_ATTR, "true");

          if (el.getAttribute(GHL_READY_ATTR) !== "true") {
            markReady(el, onReady);
          }
        },
      },
      iframe,
    );
  } catch {
    markReady(iframe, onReady);
  }
}

export function waitForGhlEmbed(
  iframe: HTMLIFrameElement,
  attempt = 0,
  onReady?: () => void,
): void {
  revealGhlIframe(iframe);

  if (isGhlEmbedReady()) {
    initGhlIframe(iframe, onReady);
    // Late fallback only — avoid showing early then resizing (that causes a second blink).
    window.setTimeout(() => {
      if (iframe.getAttribute(GHL_READY_ATTR) !== "true") {
        markReady(iframe, onReady);
      }
    }, 2500);
    return;
  }

  if (attempt >= 60) {
    markReady(iframe, onReady);
    return;
  }

  window.setTimeout(() => waitForGhlEmbed(iframe, attempt + 1, onReady), 100);
}

/** Bind load + script-ready listeners so embeds init on first paint, not only after refresh. */
export function bindGhlIframe(
  iframe: HTMLIFrameElement,
  options: BindOptions = {},
): () => void {
  const { onReady } = options;
  let settled = false;
  const notifyReady = () => {
    if (settled) return;
    settled = true;
    onReady?.();
  };

  iframe.style.opacity = "0";
  iframe.style.transition = "opacity 0.3s ease";
  iframe.style.pointerEvents = "none";

  let started = false;
  const run = () => {
    if (started && iframe.getAttribute(GHL_INIT_ATTR) === "true") return;
    started = true;
    waitForGhlEmbed(iframe, 0, notifyReady);
  };

  iframe.addEventListener("load", run);
  window.addEventListener(GHL_EMBED_READY_EVENT, run);

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
