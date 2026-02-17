import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TransparencySection from "@/components/TransparencySection";
import ValueSection from "@/components/ValueSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import StarterKitSection from "@/components/StarterKitSection";
import FinalCTASection from "@/components/FinalCTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <TransparencySection />
      <ValueSection />
      <TestimonialsSection />
      <StarterKitSection />
      <FinalCTASection />
      <Footer />
    </div>
  );
};

export default Index;
