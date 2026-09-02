import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Music,
  Mic2,
  Shirt,
  Map,
  Palette,
  Circle,
  MessageSquare,
  Laugh,
  LucideIcon,
  Camera,
} from "lucide-react";
import EventCard from "./EventCard";
import EventModal from "./EventModal";

interface EventData {
  id: string;
  title: string;
  icon: LucideIcon;
  type: "audition" | "competition";
  slug: string;
  description: string;
  rules: string[];
  registrationLink?: string;
}

const auditions = [
  {
    id: "dance",
    title: "Dance",
    icon: Music,
    type: "audition" as const,
    slug: "dance",
    description:
      "Showcase your dance moves in solo, duet, or group performances. All dance forms are welcome – from classical to contemporary, hip-hop to folk.",
    registrationLink:
      "https://docs.google.com/forms/d/e/1FAIpQLSfwgzBp4umd0PK70WmADKvlHr_z81jTGmKCIOsXKzOCCngK3g/viewform?usp=publish-editor",
    rules: [
      "Participation categories: Solo, Duo, or Group (no restrictions on group size)",
      "Solo performance time limit: 3 minutes maximum",
      "Duo/Group performance time limit: 5 minutes maximum",
      "Group members can be from any department (not restricted to single department)",
      "Costumes must be appropriate and approved by event in-charge before performance",
      "Music track must be submitted in advance (in specified format and timing)",
      "Props/accessories are allowed but must be handled by participants themselves",
      "Obscene, vulgar, or inappropriate dance moves are strictly prohibited",
      "Performance must strictly adhere to the allotted time limit",
      "Judging criteria: Coordination, expressions, choreography quality, stage presence, and overall entertainment value",
      "Technical issues during performance will not be grounds for re-performance",
      "Judges' decision is final and binding",
    ],
  },
  {
    id: "singing",
    title: "Singing",
    icon: Mic2,
    type: "audition" as const,
    slug: "singing",
    description:
      "Let your voice be heard! Whether you're into classical, pop, rock, or indie – this is your stage to shine.",
    registrationLink:
      "https://docs.google.com/forms/d/e/1FAIpQLSeqYFCzTMGmItBI0Sm7_73w047dn3cl0f-4enX1O-X6YnMTOA/viewform?usp=dialog",
    rules: [
      "Participation is allowed in Solo or Duet & Group only.",

      "Karaoke tracks must be submitted in advance (if required).",
      "Vulgar or inappropriate lyrics are strictly prohibited.",
      "Participants must follow the given time limit.",
      "Use of pre-recorded vocals is not allowed.",
    ],
  },
  {
    id: "fashion",
    title: "Fashion Show",
    icon: Shirt,
    type: "audition" as const,
    slug: "fashion-show",
    description:
      "Walk the ramp with style and confidence! Theme-based fashion show where creativity in outfits and presentation wins.",
    registrationLink:
      "https://docs.google.com/forms/d/e/1FAIpQLSc6M6QrFwrzweqy0WiPAp_3r6AooMK1-kosd_dmUzJjIDCeQA/viewform?usp=publish-editor",
    rules: [
      "Eligibility: Only 2nd and 3rd year students",
      "Individual participation (one model per entry)",
      "Outfit/attire must adhere to the announced theme",
      "Participants must maintain elegance, grace, and discipline throughout",
      "Vulgar, inappropriate outfits, or gestures are strictly prohibited",
      "Walking style, confidence, and personality are key evaluation factors",
      "Props are allowed but must align with the theme",
      "Judging criteria: Outfit design, ramp presence, confidence, personality, and theme interpretation",
    ],
  },
  {
    id: "street-play",
    title: "Street Play",
    icon: Laugh,
    type: "audition" as const,
    slug: "street-play",
    description:
      "Bring stories to life with theatrical performances! Street play is an engaging form of drama that connects with audiences directly.",
    registrationLink:
      "https://docs.google.com/forms/d/e/1FAIpQLScD7AdCWrBIZzcB-4GlTPM3XN5iecSAT5TpnVWknuUMJyw7_Q/viewform?usp=publish-editor",
    rules: [
      "Team participation allowed",
      "Performance time: 5-10 minutes",
      "Content must be original and appropriate",
      "Props and costumes allowed",
      "Vulgarity or offensive content is strictly prohibited",
    ],
  },
];

const competitions = [
  {
    id: "treasure-hunt",
    title: "Treasure Hunt",
    icon: Map,
    type: "competition" as const,
    slug: "treasure-hunt",
    description:
      "An adventurous quest across the campus! Solve riddles, find clues, and race against time to discover the hidden treasure.",
    rules: [
      "Team size: 4 members exactly",
      "Team members must be from the same department",
      "All clues must be found in the specified sequence only",
      "No mobile phones or digital devices allowed during the hunt",
      "Physical activities and movement across campus is involved",
      "First team to reach the destination with all clues wins",
      "Cheating or misbehavior will lead to immediate disqualification",
      "Time limit: 1.5 - 2 hours",
    ],
  },
  {
    id: "pot-painting",
    title: "Pot Painting",
    icon: Palette,
    type: "competition" as const,
    slug: "pot-painting",
    description:
      "Transform a simple earthen pot into a masterpiece! Unleash your artistic skills with colors, patterns, and creativity.",
    rules: [
      "Individual participation only (1 participant per entry)",
      "Earthen pots will be provided by the organizing committee",
      "Participants must bring their own paints, brushes, and painting materials",
      "No additional or replacement pots are allowed",
      "Artwork must be completed strictly within the time limit",
      "Time limit: 1.5 hours",
      "Judging criteria: Creativity, design, color combination, neatness, and theme adherence",
      "Use of stencils or templates is not allowed",
    ],
  },
  {
    id: "rangoli",
    title: "Rangoli",
    icon: Circle,
    type: "competition" as const,
    slug: "rangoli",
    description:
      "Create stunning floor art using colors, flowers, and traditional patterns. Let your creativity bloom!",
    rules: [
      "Team size: 2 members per entry",
      "Team members must be from the same department",
      "All rangoli materials must be brought by participants (colors, flowers, rice, etc.)",
      "Each team will be given a fixed floor area (demarcated)",
      "No artificial props, printed designs, or pre-made stencils are allowed",
      "Rangoli must be completed strictly within the boundary",
      "Time limit: 1.5 - 2 hours",
      "Judging criteria: Design originality, symmetry, color usage, neatness, and theme adherence",
    ],
  },
  {
    id: "debate",
    title: "Debate",
    icon: MessageSquare,
    type: "competition" as const,
    slug: "debate",
    description:
      "Present your arguments, defend your stance, and convince the judges with your oratory skills and logical reasoning.",
    rules: [
      "Team size: 2 members per entry (one speaker and one supporter)",
      "Both team members must be from the same department",
      "Topics will be announced before the event begins",
      "Preparation time: 10 minutes after topic announcement",
      "Each speaker gets: 3 minutes for opening statement, 2 minutes for rebuttal",
      "Time limits must be followed strictly (timekeeper will enforce this)",
      "Offensive language, personal attacks, or discriminatory remarks are prohibited",
      "Judging criteria: Logical reasoning, clarity of argument, presentation skills, and confidence",
    ],
  },
  {
    id: "reel-photography",
    title: "Reel and Photography Contest",
    icon: Camera,
    type: "competition" as const,
    slug: "reelandphotographycontest",
    description:
      "Showcase your creative lens! Capture stunning moments and create engaging reels that tell a story. Only event-related and BTS content is allowed.",
    rules: [
      "Only Resonance event-related and Behind-The-Scenes (BTS) content is allowed",
      "Content must be captured DURING the event (minimum 2 pieces per participant)",
      "Heavy editing or filters are strictly prohibited",
      "All videos/photos must be original content (no pre-recorded or sourced material)",
      "Video reels must be 15-60 seconds long (for social media posts)",
      "Photography submissions must be minimum 5 photos",
      "All submissions must include proper credits and tags",
      "Judging criteria: Creativity, composition, storytelling quality, and adherence to theme",
    ],
  },
];

const EventsSection = () => {
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const handleCardClick = (event: EventData) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  return (
    <section id="events" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-crimson-deep/15 to-background" />

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-6xl font-bold text-gradient-gold mb-4">
            Events
          </h2>
          <p className="font-body text-lg text-foreground/70">
            Showcase your talents in auditions or compete to win
          </p>
        </motion.div>

        {/* Auditions */}
        <div className="mb-16">
          <motion.h3
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="font-display text-2xl md:text-3xl font-semibold text-secondary mb-8 flex items-center gap-3"
          >
            <span className="w-12 h-0.5 bg-secondary" />
            Auditions
          </motion.h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {auditions.map((event, index) => (
              <EventCard
                key={event.id}
                title={event.title}
                icon={event.icon}
                type={event.type}
                onClick={() => handleCardClick(event)}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Competitions */}
        <div>
          <motion.h3
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-display text-2xl md:text-3xl font-semibold text-crimson-glow mb-8 flex items-center gap-3"
          >
            <span className="w-12 h-0.5 bg-crimson-glow" />
            Competitions
          </motion.h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {competitions.map((event, index) => (
              <EventCard
                key={event.id}
                title={event.title}
                icon={event.icon}
                type={event.type}
                onClick={() => handleCardClick(event)}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>

      <EventModal
        event={selectedEvent}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};

export default EventsSection;
