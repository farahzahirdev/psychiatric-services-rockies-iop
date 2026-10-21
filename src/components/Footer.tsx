import Image from "next/image";
import Link from "next/link";
import {
  ABOUT_SECTION_ID,
  ADDRESS_LINES,
  DETAILS_SECTION_ID,
  FIT_SECTION_ID,
  FORM_SECTION_ID,
  LOGO_LIGHT,
  MAPS_URL,
  PHONE_HREF,
  PHONE_NUMBER,
  SITE_NAME,
  WEBSITE_URL,
} from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container-main grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <Image
            src={LOGO_LIGHT}
            alt={SITE_NAME}
            width={220}
            height={110}
            className="h-14 w-auto object-contain object-left"
            unoptimized
          />
          <p className="mt-4 max-w-md text-sm leading-relaxed text-white/75">
            Adult Intensive Outpatient Program in Fort Collins. Structured, DBT-focused support
            for building skills and feeling more like yourself.
          </p>
        </div>

        <div>
          <p className="font-semibold text-white">Contact</p>
          <address className="mt-3 space-y-2 text-sm not-italic text-white/75">
            <p>
              <a href={PHONE_HREF} className="transition-colors hover:text-white">
                {PHONE_NUMBER}
              </a>
            </p>
            <p>
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-white"
              >
                {ADDRESS_LINES[0]}
                <br />
                {ADDRESS_LINES[1]}
              </a>
            </p>
          </address>
        </div>

        <div>
          <p className="font-semibold text-white">Explore</p>
          <nav className="mt-3 flex flex-col gap-2 text-sm text-white/75">
            <a href={`#${ABOUT_SECTION_ID}`} className="transition-colors hover:text-white">
              About IOP
            </a>
            <a href={`#${FIT_SECTION_ID}`} className="transition-colors hover:text-white">
              Who It&apos;s For
            </a>
            <a href={`#${DETAILS_SECTION_ID}`} className="transition-colors hover:text-white">
              Schedule &amp; Location
            </a>
            <a href={`#${FORM_SECTION_ID}`} className="transition-colors hover:text-white">
              Request Information
            </a>
            <Link href={WEBSITE_URL} className="transition-colors hover:text-white">
              Main Website
            </Link>
          </nav>
        </div>
      </div>

      <div className="container-main border-t border-white/15 pb-8 pt-8">
        <div className="max-w-4xl space-y-3 text-xs leading-relaxed text-white/60">
          <p className="font-semibold text-white/80">Important information</p>
          <p>
            This page is for educational purposes and does not replace medical advice. Program
            participation is determined through a clinical assessment. Individual results vary.
          </p>
          <p className="font-medium text-earth-light">
            If you are in danger or having thoughts of suicide, call or text 988, or dial 911.
          </p>
        </div>

        <div className="mt-6 flex flex-col items-start justify-between gap-2 border-t border-white/15 pt-5 text-xs text-white/55 sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
          <p>Adult IOP · Fort Collins, CO</p>
        </div>
      </div>
    </footer>
  );
}
