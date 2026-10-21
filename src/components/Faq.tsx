"use client";

import Image from "next/image";
import { useId, useState } from "react";
import FocusFormButton from "@/components/FocusFormButton";
import Reveal from "@/components/Reveal";
import {
  FAQ_ITEMS,
  FAQ_SECTION_ID,
  FORM_SECTION_ID,
  IMAGES,
  SITE_NAME,
} from "@/lib/constants";

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const baseId = useId();

  return (
    <section id={FAQ_SECTION_ID} className="section-padding scroll-mt-24 bg-sage-wash">
      <div className="container-main">
        <div className="psr-faq-layout">
          <Reveal className="psr-faq-media">
            <div className="psr-faq-media-frame">
              <Image
                src={IMAGES.faq}
                alt={`${SITE_NAME} Fort Collins office reception with wall logo`}
                fill
                className="object-cover object-center"
                sizes="(max-width: 1023px) 100vw, 48vw"
              />
            </div>
          </Reveal>

          <div className="psr-faq-content">
            <Reveal>
              <div className="psr-faq-intro">
                <p className="section-eyebrow">FAQ</p>
                <h2>Common Questions About Adult IOP</h2>
                <p className="text-lead mt-4 max-w-xl">
                  Quick answers about the program so you can take the next step with confidence.
                </p>
              </div>
            </Reveal>

            <Reveal delay={2}>
              <div className="psr-faq-list">
                {FAQ_ITEMS.map((item, index) => {
                  const open = openIndex === index;
                  const panelId = `${baseId}-panel-${index}`;
                  const buttonId = `${baseId}-btn-${index}`;

                  return (
                    <div
                      key={item.question}
                      className={`psr-faq-item${open ? " is-open" : ""}`}
                    >
                      <button
                        type="button"
                        id={buttonId}
                        className="psr-faq-trigger"
                        aria-expanded={open}
                        aria-controls={panelId}
                        onClick={() => setOpenIndex(open ? null : index)}
                      >
                        <span>{item.question}</span>
                        <span className="psr-faq-icon" aria-hidden>
                          +
                        </span>
                      </button>
                      <div
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        className="psr-faq-panel"
                      >
                        <div className="psr-faq-panel-inner">
                          <p>{item.answer}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Reveal>

            <Reveal delay={3}>
              <div className="psr-faq-cta">
                <p className="psr-faq-cta-prompt">Still have questions?</p>
                <FocusFormButton
                  formId="hero-lead-form"
                  sectionId={FORM_SECTION_ID}
                  className="btn btn-primary"
                >
                  Get Started
                </FocusFormButton>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
