import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Linkedin, Phone, MessageCircle } from "lucide-react";

const contacts = [
  {
    name: "Olivia",
    role: "General Secretary",
    image: "/resonance/Team/Olivia.webp",
    linkedin: "https://www.linkedin.com/in/olivia-nereparambil-239966356/",
    phone: "+91 9967427007",
    whatsapp: "9967427007",
  },
  {
    name: "Samriti",
    role: "Cultural Secretary",
    image: "/resonance/Team/Samriti.webp",
    linkedin: "https://www.linkedin.com/in/samriti-vishwakarma-99a0882a1/",
    phone: "+91 9892862025",
    whatsapp: "9892862025",
  },
  {
    name: "Jatin",
    role: "Cultural Secretary",
    image: "/resonance/Team/Jatin.webp",
    linkedin: "https://www.linkedin.com/in/jatin-sharma-75895b378/",
    phone: "+91 9220049222",
    whatsapp: "9220049222",
  },
  {
    name: "Soham",
    role: "OCM Head",
    image: "/resonance/Team/Soham.webp",
    linkedin: "https://www.linkedin.com/in/soham-dhanokar-13807a355/",
    phone: "+91 9321895202",
    whatsapp: "9321895202",
  },
];

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-crimson-deep/15 to-background" />

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-6xl font-bold text-gradient-gold mb-4">
            Contact Us
          </h2>
          <p className="font-body text-lg text-foreground/70">
            Get in touch with our organizing team
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {contacts.map((contact, index) => (
            <motion.div
              key={contact.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group flex flex-col"
            >
              <div className="relative">
                {/* Photo with hover overlay */}
                <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-4">
                  <img
                    src={contact.image}
                    alt={contact.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Hover overlay with icons */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center gap-4">
                    <span className="font-display text-lg font-semibold text-white text-center px-4 mb-2">
                      Connect With
                    </span>
                    <div className="flex gap-4">
                      <a
                        href={contact.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-full bg-blue-600/80 flex items-center justify-center hover:bg-blue-600 transition-all duration-300 transform hover:scale-110 shadow-lg"
                        aria-label={`${contact.name}'s LinkedIn`}
                        title="LinkedIn"
                      >
                        <Linkedin size={20} className="text-white" />
                      </a>
                      <a
                        href={`tel:${contact.phone}`}
                        className="w-12 h-12 rounded-full bg-secondary/80 flex items-center justify-center hover:bg-secondary transition-all duration-300 transform hover:scale-110 shadow-lg"
                        aria-label={`Call ${contact.name}`}
                        title="Phone"
                      >
                        <Phone size={20} className="text-white" />
                      </a>
                      <a
                        href={`https://wa.me/${contact.whatsapp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-full bg-green-500/80 flex items-center justify-center hover:bg-green-500 transition-all duration-300 transform hover:scale-110 shadow-lg"
                        aria-label={`WhatsApp ${contact.name}`}
                        title="WhatsApp"
                      >
                        <MessageCircle size={20} className="text-white" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-card p-6 text-center border-secondary/10 hover:border-secondary/30 transition-all duration-500 flex-grow">
                <h3 className="font-display text-lg font-semibold text-foreground mb-1">
                  {contact.name}
                </h3>
                <p className="font-body text-sm text-secondary">
                  {contact.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
