"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import FocusFormButton from "@/components/FocusFormButton";
import {
  ABOUT_SECTION_ID,
  APPROACH_SECTION_ID,
  DETAILS_SECTION_ID,
  FIT_SECTION_ID,
  FORM_SECTION_ID,
  LOGO_DARK,
  PHONE_HREF,
  PHONE_NUMBER,
  SITE_NAME,
} from "@/lib/constants";

const NAV_ITEMS = [
  { href: `#${ABOUT_SECTION_ID}`, label: "About IOP" },
  { href: `#${FIT_SECTION_ID}`, label: "Is It Right for You" },
  { href: `#${APPROACH_SECTION_ID}`, label: "Our Approach" },
  { href: `#${DETAILS_SECTION_ID}`, label: "Schedule" },
] as const;

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <div
        className={`psr-nav-wrap${scrolled ? " is-scrolled" : ""}${open ? " is-menu-open" : ""}`}
      >
        <header className={`psr-nav-bar${scrolled ? " is-scrolled" : ""}`}>
          <Link
            href="/"
            className={`psr-nav-logo${scrolled ? " is-scrolled" : ""}`}
            onClick={close}
          >
            <Image
              src={LOGO_DARK}
              alt={SITE_NAME}
              width={220}
              height={110}
              className="h-10 w-auto max-w-[11rem] object-contain object-left sm:h-11 sm:max-w-[12.5rem]"
              priority
              unoptimized
            />
          </Link>

          <nav className="psr-nav-pill" aria-label="Main">
            {NAV_ITEMS.map((item) => (
              <a key={item.href} href={item.href} className="psr-nav-link">
                {item.label}
              </a>
            ))}
            <a href={PHONE_HREF} className="psr-nav-phone">
              {PHONE_NUMBER}
            </a>
            <FocusFormButton
              formId="hero-lead-form"
              sectionId={FORM_SECTION_ID}
              className="btn btn-primary !px-5 !py-2.5 !text-sm"
            >
              Get Started
            </FocusFormButton>
          </nav>

          <button
            type="button"
            className="mobile-nav-toggle relative z-[80] flex lg:hidden"
            onClick={() => setOpen((prev) => !prev)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>

          {open && (
            <div id="mobile-nav" className="mobile-nav-panel" aria-label="Mobile navigation">
              <p className="mobile-nav-label">Menu</p>
              {NAV_ITEMS.map((item) => (
                <a key={item.href} href={item.href} className="mobile-nav-link" onClick={close}>
                  {item.label}
                </a>
              ))}
              <FocusFormButton
                formId="hero-lead-form"
                sectionId={FORM_SECTION_ID}
                className="mobile-nav-cta"
                onAfterClick={close}
              >
                Get Started
              </FocusFormButton>
              <a
                href={PHONE_HREF}
                className="mt-1 rounded-xl px-3 py-3 text-center text-sm font-semibold text-ink"
                onClick={close}
              >
                Call {PHONE_NUMBER}
              </a>
            </div>
          )}
        </header>
      </div>

      {open && (
        <button
          type="button"
          className="mobile-nav-backdrop lg:hidden"
          aria-label="Close menu"
          onClick={close}
        />
      )}
    </>
  );
}

function MenuIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}
