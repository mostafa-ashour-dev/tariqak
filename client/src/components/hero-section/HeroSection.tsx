import FloatingIcon from "./FloatingIcon";
import HeroSectionContent from "./HeroSectionContent";
import HeroSectionViews from "./HeroSectionViews";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="h-[110vh] flex items-center justify-between px-[2rem]">
        <HeroSectionContent />
        <HeroSectionViews />
        {/* <FloatingIcon>
          <Image src="/icons/tow-truck.svg" className="w-[5rem]" alt="Truck" width={100} height={100} />
        </FloatingIcon> */}
    </section>
  )
}
