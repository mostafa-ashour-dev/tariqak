import AboutSection from "@/components/about-section/AboutSection";
import CTASection from "@/components/cta-section/CTASection";
import FeaturesSection from "@/components/features-section/FeaturesSection";
import HeroSection from "@/components/hero-section/HeroSection";
import TestimonialSection from "@/components/testimonials-section/TestimonialSection";


export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <TestimonialSection />
      <CTASection />
    </main>
  );
}
