import { Testimonial } from "@/interfaces/testimonials.interface";
import SectionHeader from "../ui/SectionHeader";
import { testimonials } from "@/constants/testimonials.const";
import TestimonialCard from "../cards/TestimonialCard";
import { dividArray } from "@/helpers/divid-array.helper";
import Btn from "../ui/Btn";


export default function TestimonialSection() {
  
  const dividedArray = dividArray<Testimonial>(testimonials.slice(0, 6), 2);

  return(
    <section className="section section-gap">
      <SectionHeader>المراجع والتقييمات</SectionHeader>

      <div className="w-full grid grid-cols-3 gap-[1rem]">
        {dividedArray.map((group, index) => (
          <div
            key={index}
            className="flex flex-col items-start justify-start gap-[1rem]"
          >
            {group.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                user={testimonial.user}
                content={testimonial.content}
                createdAt={testimonial.createdAt}
              />
            ))}
          </div>
        ))}
      </div>

      <Btn className="btn">
        عرض المزيد
      </Btn>
    </section>
  );
}
