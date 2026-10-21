import FocusFormButton from "@/components/FocusFormButton";
import Reveal from "@/components/Reveal";
import {
  ADDRESS_LINES,
  DETAILS_SECTION_ID,
  FINAL_CTA_ID,
  MAPS_URL,
  SCHEDULE,
} from "@/lib/constants";

export default function ProgramDetails() {
  return (
    <section id={DETAILS_SECTION_ID} className="section-padding scroll-mt-24 bg-cream">
      <div className="container-main">
        <Reveal>
          <div className="section-intro">
            <p className="section-eyebrow">Program details</p>
            <h2>Program Schedule &amp; Location</h2>
          </div>
        </Reveal>

        <div className="details-grid">
          <Reveal delay={1}>
            <div className="detail-block">
              <span className="detail-icon" aria-hidden>
                <CalendarIcon />
              </span>
              <div>
                <p className="detail-label">Schedule</p>
                <p className="detail-value">{SCHEDULE.days}</p>
                <p className="detail-meta">{SCHEDULE.time}</p>
                <p className="detail-meta">{SCHEDULE.length}</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={2}>
            <div className="detail-block">
              <span className="detail-icon" aria-hidden>
                <ClockIcon />
              </span>
              <div>
                <p className="detail-label">Session time</p>
                <p className="detail-value">{SCHEDULE.time}</p>
                <p className="detail-meta">Three afternoons each week</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={3}>
            <div className="detail-block">
              <span className="detail-icon" aria-hidden>
                <PinIcon />
              </span>
              <div>
                <p className="detail-label">Location</p>
                <p className="detail-value">{ADDRESS_LINES[0]}</p>
                <p className="detail-meta">{ADDRESS_LINES[1]}</p>
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="detail-link"
                >
                  Open in Maps
                </a>
              </div>
            </div>
          </Reveal>
        </div>

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

function CalendarIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-6 w-6"
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path strokeLinecap="round" d="M8 3v4M16 3v4M3 10h18" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-6 w-6"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path strokeLinecap="round" d="M12 7v5l3 2" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-6 w-6"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 21s7-5.2 7-11a7 7 0 10-14 0c0 5.8 7 11 7 11z"
      />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}
