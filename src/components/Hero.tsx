import Image from "next/image";
import LeadForm from "@/components/LeadForm";
import {
  ABOUT_SECTION_ID,
  FORM_SECTION_ID,
  IMAGES,
} from "@/lib/constants";

export default function Hero() {
  return (
    <section
      id={FORM_SECTION_ID}
      aria-labelledby="hero-heading"
      className="psr-hero scroll-mt-24"
    >
      <div className="psr-hero-shell">
        <div className="psr-hero-card">
          <div className="psr-hero-bg">
            <Image
              src={IMAGES.hero}
              alt="Person overlooking a bright alpine lake and snow-capped Rockies peaks under a clear blue sky"
              fill
              priority
              quality={90}
              sizes="100vw"
              className="psr-hero-img"
            />
          </div>
          <div className="psr-hero-veil" aria-hidden />

          <div className="psr-hero-inner">
            <div className="container-main">
              <div className="psr-hero-grid">
                <div className="psr-hero-copy psr-fade-up">
                  <p className="psr-hero-eyebrow">Adult Intensive Outpatient Program</p>

                  <h1 id="hero-heading" className="psr-hero-title">
                    Build Skills. Manage Life. Feel More You.
                  </h1>

                  <p className="psr-hero-lede">
                    Our Adult Intensive Outpatient Program (IOP) provides structured, supportive care
                    focused on building practical skills to help you navigate emotions, improve
                    relationships, and create a more balanced, meaningful life.
                  </p>

                  <div className="psr-hero-actions">
                    <a href={`#${ABOUT_SECTION_ID}`} className="btn btn-light">
                      Learn More About Our IOP
                      <ArrowIcon />
                    </a>
                  </div>
                </div>

                <div className="psr-hero-form-wrap psr-fade-up" style={{ animationDelay: "120ms" }}>
                  <LeadForm id="hero-lead-form" variant="panel" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ArrowIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      className="h-4 w-4 shrink-0"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
