"use client";

import SmoothScrollProvider from "@/components/landing/SmoothScrollProvider";
import HeroSection from "@/components/landing/HeroSection";
import StatsBar from "@/components/landing/StatsBar";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import UseCasesSection from "@/components/landing/UseCasesSection";
import PricingSection from "@/components/landing/PricingSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import CTASection from "@/components/landing/CTASection";

export default function Home() {
  return (
    <SmoothScrollProvider>
      <main className="style-container flex flex-1 flex-col selection:bg-[var(--accent-red-glow)] selection:text-white">
        <HeroSection />
        <StatsBar />
        <HowItWorksSection />
        <FeaturesSection />
        <UseCasesSection />
        <PricingSection />
        <TestimonialsSection />
        <CTASection />
      </main>
    </SmoothScrollProvider>
  );
}
