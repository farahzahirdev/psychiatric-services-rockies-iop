"use client";

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

        (form ?? root ?? section)?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });

        if (form) {
          form.classList.remove("is-attention");
          void (form as HTMLElement).offsetWidth;
          form.classList.add("is-attention");
          window.setTimeout(() => form.classList.remove("is-attention"), 1800);
        }

        window.setTimeout(() => {
          input?.focus({ preventScroll: true });
        }, 450);
      }}
    >
      {children}
    </button>
  );
}
