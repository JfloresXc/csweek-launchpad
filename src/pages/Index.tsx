import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { CommunitySection } from "@/components/CommunitySection";
import { RegisterSection } from "@/components/RegisterSection";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";

// Nuevas secciones del evento
import { EventSpeakersSection } from "@/event-core/event-landing/sections/EventSpeakersSection";
import { EventSponsorsSection } from "@/event-core/event-landing/sections/EventSponsorsSection";

import { EventScheduleSection } from "@/event-core/event-landing/sections/EventScheduleSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <AboutSection />
      
      {/* Nuevas secciones del evento CS WEEK 2025 */}
      <EventSpeakersSection />
      <EventScheduleSection />
      <EventSponsorsSection />

      
      <CommunitySection />
      <RegisterSection />
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
