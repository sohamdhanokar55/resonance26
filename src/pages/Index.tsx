import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ScrollToReveal from "@/components/ScrollToReveal";
import AboutSection from "@/components/AboutSection";
import EventSchedule from "@/components/EventSchedule";
import EventsSection from "@/components/EventsSection";
import DocumentsSection from "@/components/DocumentsSection";
import GuidelinesSection from "@/components/GuidelinesSection";
import AboutAPVSection from "@/components/AboutAPVSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <ScrollToReveal />
      <AboutSection />
      <EventSchedule />
      <EventsSection />
      <DocumentsSection />
      <GuidelinesSection />
      <AboutAPVSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
