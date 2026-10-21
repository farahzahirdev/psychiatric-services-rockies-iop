"use client";

/** True when the element is fully usable under the sticky nav. */
function isComfortablyInView(el: HTMLElement) {
  const rect = el.getBoundingClientRect();
  const vh = window.innerHeight || document.documentElement.clientHeight;
  const topClearance = 100;
  const bottomClearance = 24;
  return (
    rect.top >= topClearance &&
    rect.bottom <= vh - bottomClearance &&
    rect.height > 0
  );
}

export default function FocusFormButton({
  formId,
  sectionId,
  className,
  children,
  onAfterClick,
}: {
  formId: string;
  sectionId: string;
  className?: string;
  children: React.ReactNode;
  onAfterClick?: () => void;
}) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        onAfterClick?.();

        const section = document.getElementById(sectionId);
        const root = document.getElementById(formId);
        const form =
          root?.matches("form") ? root : root?.querySelector("form") ?? root;
        const input = root?.querySelector<HTMLInputElement>(
          "input:not([type='checkbox']):not([type='hidden'])",
        );

        const scrollTarget = (input ?? form ?? root ?? section) as HTMLElement | null;
        const alreadyVisible = Boolean(
          scrollTarget && isComfortablyInView(scrollTarget),
        );

        if (scrollTarget) {
          if (alreadyVisible) {
            // One-time slight nudge from the top of the page only.
            // Do not keep scrolling further on every click.
            if (window.scrollY < 20) {
              window.scrollTo({ top: 40, behavior: "smooth" });
            }
          } else {
            scrollTarget.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
          }
        }

        if (form) {
          form.classList.remove("is-attention");
          void (form as HTMLElement).offsetWidth;
          form.classList.add("is-attention");
          window.setTimeout(() => form.classList.remove("is-attention"), 1800);
        }

        window.setTimeout(
          () => {
            input?.focus({ preventScroll: true });
          },
          alreadyVisible ? 220 : 450,
        );
      }}
    >
      {children}
    </button>
  );
}
