import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const photos = Array(10)
  .fill(null)
  .map((_, i) => ({
    id: i + 1,
    image: `/resonance/Photos/${i + 1}.jpeg`,
  }));

const MarqueeRow = ({
  direction,
  offset,
}: {
  direction: "left" | "right";
  offset: number;
}) => {
  const duplicatedPhotos = [
    ...photos.slice(offset, offset + 6),
    ...photos.slice(offset, offset + 6),
  ];

  return (
    <div className="relative overflow-hidden py-3 w-full max-w-none">
      <div
        className={`flex gap-6 ${
          direction === "left" ? "marquee-left" : "marquee-right"
        }`}
        style={{ width: "200%" }}
      >
        {duplicatedPhotos.map((photo, index) => (
          <div
            key={`${photo.id}-${index}`}
            className={`flex-shrink-0 w-72 h-48 rounded-xl border border-secondary/20 shadow-lg overflow-hidden relative group`}
          >
            <img
              src={photo.image}
              alt={`Resonance Photo ${photo.id}`}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all duration-500" />
            <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        ))}
      </div>
    </div>
  );
};

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-crimson-deep/20 to-background" />

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-6xl font-bold text-gradient-gold mb-6">
            About Resonance
          </h2>
          <p className="font-body text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto leading-relaxed">
            Resonance is the flagship cultural festival of Agnel Polytechnic,
            Vashi — a grand celebration where creativity meets passion. From
            electrifying performances to fierce competitions, this is where
            talents shine and memories are made. Join us for two unforgettable
            days of glamour, art, and pure energy.
          </p>
        </motion.div>
      </div>

      {/* Photo Marquee Rows - Full Width */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="w-full max-w-none relative z-10"
      >
        <MarqueeRow direction="left" offset={0} />
        <MarqueeRow direction="right" offset={4} />
        <MarqueeRow direction="left" offset={2} />
      </motion.div>
    </section>
  );
};

export default AboutSection;
