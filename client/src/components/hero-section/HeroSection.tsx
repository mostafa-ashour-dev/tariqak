import { Wrench } from "lucide-react";
import FloatingIcon from "./FloatingIcon";
import HeroSectionContent from "./HeroSectionContent";
import HeroSectionViews from "./HeroSectionViews";

export default function HeroSection() {
  return (
    <section className="h-[110vh] relative flex items-center justify-between px-[2rem]">
        <HeroSectionContent />
        <HeroSectionViews />
        {/* <FloatingIcon x={50} y={50}>
           <Wrench size={120}/>
        </FloatingIcon>
        <FloatingIcon x={100} y={10}>
           <Wrench size={120}/>
        </FloatingIcon> */}
    </section>
  )
}
