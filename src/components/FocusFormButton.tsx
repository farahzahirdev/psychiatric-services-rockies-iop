"use client";

const NAV_CLEARANCE = 120;
/** Keep the form nudge gentle so headings stay put on mobile + desktop. */
const SLIGHT_SCROLL_MAX = 96;

function isFormMostlyVisible(form: HTMLElement) {
  const rect = form.getBoundingClientRect();
  const vh = window.innerHeight || document.documentElement.clientHeight;
  const visible = Math.min(rect.bottom, vh) - Math.max(rect.top, NAV_CLEARANCE * 0.35);
  return visible > Math.min(rect.height * 0.4, vh * 0.22);
}

/**
 * Slight scroll toward the form, clamped so the section heading never
 * slides under the sticky nav (mobile or desktop).
 */
function slightScrollToForm(form: HTMLElement, section: HTMLElement | null) {
  const vh = window.innerHeight || document.documentElement.clientHeight;
  const formTop = form.getBoundingClientRect().top;
  const idealTop = Math.max(NAV_CLEARANCE + 20, vh * 0.34);
  let delta = formTop - idealTop;

  // Cap to a slight move.
  delta = Math.max(-SLIGHT_SCROLL_MAX, Math.min(SLIGHT_SCROLL_MAX, delta));

  // Never let the section top go above the sticky nav.
  if (section) {
    const sectionTop = section.getBoundingClientRect().top;
    const maxDown = sectionTop - NAV_CLEARANCE;
    if (delta > maxDown) delta = maxDown;
  }

  // If already aligned, still ease a few pixels toward the form when safe.
  if (Math.abs(delta) < 8) {
    let tiny = 28;
    if (section) {
      const sectionTop = section.getBoundingClientRect().top;
      tiny = Math.min(tiny, Math.max(0, sectionTop - NAV_CLEARANCE));
    }
    delta = tiny;
  }

  if (Math.abs(delta) >= 8) {
    window.scrollBy({ top: delta, behavior: "smooth" });
  }
}

function pulseAttention(el: HTMLElement) {
  el.classList.remove("is-attention");
  void el.offsetWidth;
  el.classList.add("is-attention");
  window.setTimeout(() => el.classList.remove("is-attention"), 2200);
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
        const scrollTarget = (section ?? form) as HTMLElement | null;
        const attentionTarget = (form ?? section) as HTMLElement | null;

        if (form && isFormMostlyVisible(form)) {
          // Form already on screen — slight scroll + pulse (heading stays clear).
          slightScrollToForm(form, section);
        } else if (scrollTarget) {
          // Coming from elsewhere — section first so the heading clears the nav,
          // then a slight form nudge after the smooth scroll settles.
          scrollTarget.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
          if (form) {
            window.setTimeout(() => slightScrollToForm(form, section), 420);
          }
        }

        if (attentionTarget) {
          pulseAttention(attentionTarget);
          window.setTimeout(() => pulseAttention(attentionTarget), 500);
        }
      }}
    >
      {children}
    </button>
  );
}
