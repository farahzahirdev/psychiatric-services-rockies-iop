import FocusFormButton from "@/components/FocusFormButton";
import Reveal from "@/components/Reveal";
import { ABOUT_SECTION_ID, BENEFITS, FINAL_CTA_ID } from "@/lib/constants";

export default function WhatIsIop() {
  return (
    <section id={ABOUT_SECTION_ID} className="section-padding scroll-mt-24 bg-sand">
      <div className="container-main">
        <Reveal>
          <div className="section-intro">
            <p className="section-eyebrow">What is an Intensive Outpatient Program?</p>
            <h2>More Support. More Skills. More Confidence.</h2>
            <p className="text-lead mx-auto mt-4 max-w-2xl">
              An Intensive Outpatient Program (IOP) provides more structured support than
              traditional weekly therapy while allowing you to maintain your everyday
              responsibilities, including work, school, and family life.
            </p>
          </div>
        </Reveal>

        <ul className="benefit-list" aria-label="Program benefits">
          {BENEFITS.map((benefit, index) => (
            <Reveal key={benefit} delay={((index % 4) + 1) as 1 | 2 | 3 | 4}>
              <li className="benefit-item">
                <span className="benefit-check" aria-hidden>
                  <CheckIcon />
                </span>
                <span>{benefit}</span>
              </li>
            </Reveal>
          ))}
        </ul>

        <Reveal>
          <div className="mt-10 flex justify-center">
            <FocusFormButton
              formId="final-lead-form"
              sectionId={FINAL_CTA_ID}
              className="btn btn-primary"
            >
              Request More Information
            </FocusFormButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function CheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}
