/** Bump when replacing files in public/images so caches refresh */
const IMG_V = "20261020h";

const img = (publicPath: string) => `${publicPath}?v=${IMG_V}`;

export const SITE_NAME = "Psychiatric Services of the Rockies";
export const PROGRAM_NAME = "Adult Intensive Outpatient Program";

export const LOGO_DARK = img("/images/logo-dark.png");
export const LOGO_LIGHT = img("/images/logo-light.png");
export const FAVICON = img("/images/favicon.png");

export const IMAGES = {
  hero: img("/images/hero.jpg"),
  who: img("/images/connection.jpg"),
  approach: img("/images/approach.jpg"),
  connection: img("/images/who.jpg"),
} as const;

export const FORM_SECTION_ID = "request-info";
export const FINAL_CTA_ID = "final-cta";
export const DETAILS_SECTION_ID = "program-details";
export const ABOUT_SECTION_ID = "about-iop";
export const FIT_SECTION_ID = "who-its-for";
export const APPROACH_SECTION_ID = "approach";

export const PHONE_NUMBER = "(970) 436-4449";
export const PHONE_HREF = "tel:+19704364449";

export const ADDRESS_LINES = [
  "2121 Midpoint Dr, Suite 301",
  "Fort Collins, CO 80525",
] as const;

export const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=2121+Midpoint+Dr+Suite+301+Fort+Collins+CO+80525";

export const WEBSITE_URL = "https://www.psychiatricservicesoftherockies.com";

export const SCHEDULE = {
  days: "Mondays, Wednesdays & Thursdays",
  time: "12:30 PM to 3:30 PM",
  length: "Average program length: 8-12 weeks",
} as const;

export const BENEFITS = [
  "Learn and practice DBT skills",
  "Manage intense emotions",
  "Reduce stress and anxiety",
  "Improve relationships",
  "Build a life worth living",
] as const;

export const FIT_ITEMS = [
  "You're looking for additional support beyond weekly therapy.",
  "You want practical tools to manage emotions, stress, and everyday challenges.",
  "You're motivated to make positive changes and invest in your mental health.",
  "You want to develop healthier coping skills and relationships.",
] as const;

/** Placeholder consent copy. Confirm with client legal/intake before launch. */
export const PRIVACY_CONSENT =
  "By submitting this form, you consent to Psychiatric Services of the Rockies contacting you about the Adult IOP program by phone, email, or text. Message and data rates may apply. Reply STOP to opt out of texts. Your information is kept confidential and used only to respond to your inquiry. This form is not monitored for emergencies. If you are in crisis, call or text 988, or dial 911.";
