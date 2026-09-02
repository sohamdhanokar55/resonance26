import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MessageCircle, Download } from "lucide-react";

const DocumentsSection = () => {
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
          className="text-center mb-12"
        >
          <h2 className="font-display text-4xl md:text-6xl font-bold text-gradient-gold mb-4">
            Event Resources
          </h2>
          <p className="font-body text-lg text-foreground/70">
            Stay connected and get all the information you need
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* WhatsApp Group */}
          <motion.a
            href="https://chat.whatsapp.com/JxNgcxxIlSh3nI6wIsCmOK"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            whileHover={{ scale: 1.02 }}
            className="group"
          >
            <div className="glass-card p-8 border-whatsapp/20 hover:border-whatsapp/50 transition-all duration-500 h-full">
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-2xl bg-whatsapp/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  <MessageCircle className="text-whatsapp" size={40} />
                </div>
                <h3 className="font-display text-2xl font-bold text-foreground mb-3">
                  Join WhatsApp Group
                </h3>
                <p className="font-body text-foreground/70">
                  Get real-time updates, announcements, and connect with other
                  participants
                </p>
              </div>
            </div>
          </motion.a>

          {/* Download Brochure */}
          <motion.a
            href="/resonance/rulebook.pdf"
            download
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            whileHover={{ scale: 1.02 }}
            className="group"
          >
            <div className="glass-card p-8 border-secondary/20 hover:border-secondary/50 transition-all duration-500 h-full">
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-2xl bg-secondary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  <Download className="text-secondary" size={40} />
                </div>
                <h3 className="font-display text-2xl font-bold text-foreground mb-3">
                  Download Brochure
                </h3>
                <p className="font-body text-foreground/70">
                  Get the complete event brochure with all details, schedules,
                  and rules
                </p>
              </div>
            </div>
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default DocumentsSection;
