import Image from "next/image";
import Reveal from "@/components/Reveal";
import { ABOUT_SECTION_ID, APPROACH_SECTION_ID, IMAGES } from "@/lib/constants";

export default function Approach() {
  return (
    <section id={APPROACH_SECTION_ID} className="section-padding scroll-mt-24 bg-sage-wash">
      <div className="container-main">
        <div className="approach-layout">
          <Reveal>
            <div className="approach-copy">
              <p className="section-eyebrow">Our approach: focused on DBT</p>
              <h2>Practical Skills for Real-Life Challenges</h2>
              <p className="mt-5 text-lead max-w-xl">
                Our IOP uses Dialectical Behavior Therapy (DBT) as its primary approach, helping
                participants develop real-world skills in a supportive and respectful environment.
              </p>
              <p className="approach-tagline">Together, we&apos;ll learn, share, and grow.</p>
              <a href={`#${ABOUT_SECTION_ID}`} className="btn btn-primary mt-8">
                Learn More About Our IOP
              </a>
            </div>
          </Reveal>

          <Reveal delay={2}>
            <div className="approach-media">
              <Image
                src={IMAGES.approach}
                alt="Calm Colorado mountain landscape reflecting quiet focus and renewal"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1023px) 100vw, 42vw"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
