import Hero from "@/components/Hero";
import WhatIsIop from "@/components/WhatIsIop";
import WhoItsFor from "@/components/WhoItsFor";
import Approach from "@/components/Approach";
import ProgramDetails from "@/components/ProgramDetails";
import Faq from "@/components/Faq";
import FinalCta from "@/components/FinalCta";

export default function Home() {
  return (
    <>
      <Hero />
      <WhatIsIop />
      <WhoItsFor />
      <Approach />
      <ProgramDetails />
      <Faq />
      <FinalCta />
    </>
  );
}
