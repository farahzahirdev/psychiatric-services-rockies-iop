import FocusFormButton from "@/components/FocusFormButton";
import GhlLeadForm from "@/components/GhlLeadForm";
import ParallaxBg from "@/components/ParallaxBg";
import { FINAL_CTA_ID, IMAGES, PHONE_HREF, PHONE_NUMBER } from "@/lib/constants";

export default function FinalCta() {
  return (
    <section id={FINAL_CTA_ID} className="final-cta scroll-mt-24" aria-labelledby="final-cta-heading">
      <ParallaxBg
        src={IMAGES.connection}
        alt="Psychiatric Services of the Rockies Fort Collins office exterior"
      />
      <div className="final-cta-veil" aria-hidden />

      <div className="container-main relative z-[1] section-padding">
        <div className="final-cta-grid">
          <div className="final-cta-copy">
            <h2 id="final-cta-heading">Ready to Take the Next Step?</h2>
            <p>
              Take the next step toward building practical skills, finding connection, and creating
              a life you value. Contact our team to learn more about the Adult IOP program or
              schedule an assessment.
            </p>
            <div className="final-cta-actions">
              <FocusFormButton
                formId="final-lead-form"
                sectionId={FINAL_CTA_ID}
                className="btn btn-light"
              >
                Get Started
              </FocusFormButton>
              <a href={PHONE_HREF} className="btn btn-ghost-light">
                Call {PHONE_NUMBER}
              </a>
            </div>
          </div>

          <div className="final-cta-form-anchor">
            <GhlLeadForm
              id="final-lead-form"
              iframeId="inline-3nzZ5tLz1y1783JfTnfU-final"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
