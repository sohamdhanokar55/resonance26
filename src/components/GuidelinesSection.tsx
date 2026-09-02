import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const guidelines = [
  "Registration:- Participants must register before the deadline; no last-minute entries will be allowed.",
  "Respect & Decorum:- Maintain discipline and respect throughout the event. Any form of misconduct will lead to disqualification.",
  "Performance Guidelines:- All acts must be appropriate, respectful, and align with the institution's values.",
  "Time Limit:- Participants must adhere to the allotted time for each event to ensure smooth scheduling.",
  "Originality:- Any form of plagiarism or offensive content will result in immediate disqualification.",
  "Judging & Decisions:- The judges' and organizers' decisions will be final and cannot be challenged.",
  "Punctuality:- Participants should arrive on time and follow event schedules strictly.",
  "Property & Conduct:- Any damage to event property or inappropriate behavior towards others may result in penalties.",
  "Rule Amendments:- The organizing committee reserves the right to modify rules as necessary.",
];

const GuidelinesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="guidelines" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-crimson-deep/30 via-crimson-rich/20 to-background" />

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-4xl md:text-6xl font-bold text-gradient-gold mb-4">
            Event Guidelines
          </h2>
          <p className="font-body text-lg text-foreground/70">
            Please read and follow these rules for a smooth experience
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="glass-card p-8 md:p-12 border-secondary/20">
            <ul className="space-y-6">
              {guidelines.map((guideline, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.05 }}
                  className="flex items-start gap-4 font-body text-foreground/90"
                >
                  <span className="flex-shrink-0 w-3 h-3 rounded-full bg-gradient-to-br from-gold-metallic to-gold-bright mt-1.5 shadow-[0_0_10px_hsla(45,80%,50%,0.4)]" />
                  <span className="leading-relaxed">{guideline}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GuidelinesSection;
