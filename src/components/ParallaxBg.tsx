"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export default function ParallaxBg({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const media = mediaRef.current;
    if (!wrap || !media) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      media.style.transform = "translate3d(0, 0, 0) scale(1.05)";
      return;
    }

    let frame = 0;

    const update = () => {
      frame = 0;
      const section = wrap.parentElement;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const viewH = window.innerHeight;

      // Only animate while section is near the viewport
      if (rect.bottom < 0 || rect.top > viewH) return;

      const travel = viewH + rect.height;
      const progress = (viewH - rect.top) / travel;
      const clamped = Math.min(1, Math.max(0, progress));
      // Stronger drift so the effect reads clearly while scrolling
      const offset = (0.5 - clamped) * 220;
      media.style.transform = `translate3d(0, ${offset}px, 0) scale(1.28)`;
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={wrapRef} className={`final-cta-bg ${className}`.trim()}>
      <div ref={mediaRef} className="final-cta-parallax">
        <Image
          src={src}
          alt={alt}
          fill
          priority={false}
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>
    </div>
  );
}
