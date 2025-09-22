import { Wrench } from "lucide-react";
import FloatingIcon from "./FloatingIcon";
import HeroSectionContent from "./HeroSectionContent";
import HeroSectionViews from "./HeroSectionViews";
import HeroSectionSocialLinks from "./HeroSectionSocialLinks";

export default function HeroSection() {
  return (
    <section className="h-[110vh] mb-[10rem] relative flex items-center justify-between px-[2rem]">
      <div className="mt-[5rem] flex flex-col h-[50%] items-between justify-between relative max-w-[45%]">
        <HeroSectionContent />
        <HeroSectionSocialLinks className="mt-[4rem]" />
      </div>

      <HeroSectionViews />
    </section>
  );
}
