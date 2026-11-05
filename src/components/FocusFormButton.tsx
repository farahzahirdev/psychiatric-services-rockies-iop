"use client";

/** True when the section heading area is usable under the sticky nav. */
function isComfortablyInView(el: HTMLElement) {
  const rect = el.getBoundingClientRect();
  const vh = window.innerHeight || document.documentElement.clientHeight;
  const topClearance = 110;
  return (
    rect.top >= topClearance &&
    rect.top < vh * 0.55 &&
    rect.height > 0 &&
    rect.bottom > topClearance
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
        const form = document.getElementById(formId);
        // Scroll to the section so the heading isn't clipped under the sticky nav.
        // Attention highlight still targets the form card.
        const scrollTarget = (section ?? form) as HTMLElement | null;
        const attentionTarget = (form ?? section) as HTMLElement | null;
        const alreadyVisible = Boolean(
          scrollTarget && isComfortablyInView(scrollTarget),
        );

        if (scrollTarget) {
          if (alreadyVisible) {
            if (window.scrollY < 20) {
              window.scrollTo({ top: 40, behavior: "smooth" });
            }
          } else {
            scrollTarget.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
        }

        if (attentionTarget) {
          attentionTarget.classList.remove("is-attention");
          void attentionTarget.offsetWidth;
          attentionTarget.classList.add("is-attention");
          window.setTimeout(() => attentionTarget.classList.remove("is-attention"), 1800);
        }
      }}
    >
      {children}
    </button>
  );
}
