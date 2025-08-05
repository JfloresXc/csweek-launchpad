import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { CommunitySection } from "@/components/CommunitySection";
import { RegisterSection } from "@/components/RegisterSection";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <CommunitySection />
      <RegisterSection />
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
