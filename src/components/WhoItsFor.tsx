import Image from "next/image";
import FocusFormButton from "@/components/FocusFormButton";
import Reveal from "@/components/Reveal";
import { FIT_ITEMS, FIT_SECTION_ID, FORM_SECTION_ID, IMAGES } from "@/lib/constants";

export default function WhoItsFor() {
  return (
    <section id={FIT_SECTION_ID} className="section-padding scroll-mt-24 bg-cream">
      <div className="container-main">
        <div className="who-layout">
          <Reveal>
            <div className="who-media">
              <Image
                src={IMAGES.who}
                alt="Smiling couple walking hand in hand through a sunlit snowy forest"
                fill
                className="object-cover"
                sizes="(max-width: 1023px) 100vw, 48vw"
              />
            </div>
          </Reveal>

          <Reveal delay={2}>
            <div className="who-copy">
              <p className="section-eyebrow">Who is this program for?</p>
              <h2>Is Our Adult IOP Right for You?</h2>
              <p className="mt-4 text-lead">This program may be a good fit if:</p>

              <ul className="fit-list">
                {FIT_ITEMS.map((item) => (
                  <li key={item}>
                    <span className="fit-dot" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <p className="fit-callout">No prior DBT experience needed!</p>

              <FocusFormButton
                formId="hero-lead-form"
                sectionId={FORM_SECTION_ID}
                className="btn btn-primary mt-8"
              >
                Get Started
              </FocusFormButton>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
