import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const AboutAPVSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-crimson-deep/10 to-background" />

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-6xl font-bold text-gradient-gold">
            About Agnel Polytechnic, Vashi
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="font-display text-2xl md:text-3xl font-semibold text-secondary">
              Agnel Polytechnic, Vashi
            </h3>
            <div className="space-y-4 font-body text-foreground/80 leading-relaxed">
              <p>
                The founder of Agnel Ashram, Fr. C. Rodrigues was a great
                visionary. His vision was to foster love and understanding among
                the various communities in India and to contribute to the
                development of self-reliance among the youth through education.
              </p>
              <p>
                Agnel Polytechnic in Vashi, Navi Mumbai, was started in 1983
                with only one program – Diploma in Civil Engineering. It has
                grown since then, and today we have five branches of study in
                the polytechnic – Civil Engineering, Mechanical Engineering,
                Automobile Engineering, Electronics & Computer Engineering and
                Artificial Intelligence & Machine learning.
              </p>
              <p>
                What makes Agnel Polytechnic a unique institution in Mumbai is
                its discipline and culture and the dedication of the faculty in
                imparting knowledge and expertise to the students in a
                cosmopolitan atmosphere
              </p>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-2xl overflow-hidden glass-card border-secondary/20">
              <img
                src="/resonance/apv.png"
                alt="Agnel Polytechnic, Vashi"
                className="w-full h-full object-cover"
              />
              {/* Decorative elements */}
              <div className="absolute top-4 left-4 w-16 h-16 border-l-2 border-t-2 border-secondary/30" />
              <div className="absolute bottom-4 right-4 w-16 h-16 border-r-2 border-b-2 border-secondary/30" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutAPVSection;
