import SectionNavigation, { type SectionConfig } from "@/components/layout/SectionNavigation";
import HeroSection from "@/components/home/HeroSection";
import ServicesSection from "@/components/home/ServicesSection";
import StatsSection from "@/components/home/StatsSection";
import AboutSection from "@/components/home/AboutSection";
import IndustriesSection from "@/components/home/IndustriesSection";
import WhyChooseUsSection from "@/components/home/WhyChooseUsSection";
import InsightsSection from "@/components/home/InsightsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import ContactSection from "@/components/home/ContactSection";

const sections: SectionConfig[] = [
  { id: "hero", label: "Home", theme: "yellow", content: <HeroSection /> },
  { id: "services", label: "Services", theme: "black", content: <ServicesSection /> },
  { id: "stats", label: "Our Impact", theme: "yellow", content: <StatsSection /> },
  { id: "about", label: "About Us", theme: "cream", content: <AboutSection /> },
  { id: "industries", label: "Industries", theme: "black", content: <IndustriesSection /> },
  { id: "why-us", label: "Why Choose Us", theme: "yellow", content: <WhyChooseUsSection /> },
  { id: "insights", label: "Insights", theme: "black", content: <InsightsSection /> },
  { id: "testimonials", label: "Testimonials", theme: "cream", content: <TestimonialsSection /> },
  { id: "contact", label: "Contact", theme: "black", content: <ContactSection /> },
];

export default function Home() {
  return <SectionNavigation sections={sections} />;
}
