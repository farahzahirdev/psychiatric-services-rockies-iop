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
        const scrollTarget = (root ?? section) as HTMLElement | null;
        const alreadyVisible = Boolean(
          scrollTarget && isComfortablyInView(scrollTarget),
        );

        if (scrollTarget) {
          if (alreadyVisible) {
            // One-time slight nudge from the top of the page only.
            if (window.scrollY < 20) {
              window.scrollTo({ top: 40, behavior: "smooth" });
            }
          } else {
            scrollTarget.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
          }

          scrollTarget.classList.remove("is-attention");
          void scrollTarget.offsetWidth;
          scrollTarget.classList.add("is-attention");
          window.setTimeout(() => scrollTarget.classList.remove("is-attention"), 1800);
        }
      }}
    >
      {children}
    </button>
  );
}
