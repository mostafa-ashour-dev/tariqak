import SectionHeader from "../ui/SectionHeader";
import FeaturePart from "./FeaturePart";
import FeaturePartContent from "./FeaturePartContent";
import FeaturePartImg from "./FeaturePartImg";
import { features } from "@/constants/features.const";


export default function FeaturesSection() {
  return (
    <section className="section">
      <SectionHeader>مزايا التطبيق</SectionHeader>

      <div className="mt-[2rem] w-full flex items-center justify-center flex-col gap-[6rem]">
        
        {features && features.length > 0 ? features.map((feature, index) => {
          return (
            <FeaturePart index={feature.id} key={index}>
              <FeaturePartImg imgSrc={feature.img.src} imgAlt={feature.img.alt} width={"80%"} />
              <FeaturePartContent
                title={feature.content?.title}
                description={feature.content.description}
                callToAction={feature.content.callToAction}
                width={"50%"}
              />
            </FeaturePart>
          );
        }): ""}
        
      </div>
    </section>
  );
}
