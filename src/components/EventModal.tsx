import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Event {
  id: string;
  title: string;
  description: string;
  rules: string[];
  type: "audition" | "competition";
  slug: string;
  registrationLink?: string;
}

interface EventModalProps {
  event: Event | null;
  isOpen: boolean;
  onClose: () => void;
}

const EventModal = ({ event, isOpen, onClose }: EventModalProps) => {
  const navigate = useNavigate();

  if (!event) return null;

  const handleRegister = () => {
    if (event.registrationLink) {
      window.open(event.registrationLink, "_blank");
    } else if (event.type === "audition") {
      window.open("https://forms.gle/vu8ZnJu1xt8Q7Avo9", "_blank");
    } else {
      navigate(`/${event.slug}`);
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50"
          />

          {/* Bottom Sheet Modal */}
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 overflow-hidden rounded-t-3xl"
          >
            <div className="glass-card border-secondary/30 max-h-[85vh] overflow-y-auto w-full">
              {/* Drag Handle */}
              <div className="flex justify-center pt-3">
                <div className="w-12 h-1 rounded-full bg-secondary/30" />
              </div>

              {/* Header */}
              <div className="sticky top-0 flex items-center justify-between px-6 py-4 border-b border-secondary/20 bg-card/80 backdrop-blur-md">
                <div>
                  <h2 className="font-display text-2xl font-bold text-secondary">
                    {event.title}
                  </h2>
                  <span
                    className={`text-xs font-body uppercase tracking-wider px-3 py-1 rounded-full mt-2 inline-block ${
                      event.type === "audition"
                        ? "bg-secondary/20 text-secondary"
                        : "bg-crimson-glow/20 text-crimson-glow"
                    }`}
                  >
                    {event.type}
                  </span>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-secondary/10 transition-colors"
                  aria-label="Close modal"
                >
                  <X className="text-foreground" size={24} />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Description */}
                <div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-3">
                    Description
                  </h3>
                  <p className="font-body text-foreground/80 leading-relaxed">
                    {event.description}
                  </p>
                </div>

                {/* Rules */}
                <div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-3">
                    Rules
                  </h3>
                  <ul className="space-y-2">
                    {event.rules.map((rule, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 font-body text-foreground/80"
                      >
                        <span className="w-2 h-2 rounded-full bg-secondary mt-2 flex-shrink-0" />
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Footer */}
              <div className="sticky bottom-0 p-6 border-t border-secondary/20 bg-card/80 backdrop-blur-md">
                <button
                  onClick={handleRegister}
                  className={`w-full py-4 px-6 rounded-xl font-body font-semibold text-lg flex items-center justify-center gap-3 transition-all duration-300 ${
                    event.type === "audition"
                      ? "bg-gradient-to-r from-gold-dark to-gold-metallic text-background hover:from-gold-metallic hover:to-gold-bright"
                      : "bg-gradient-to-r from-crimson-rich to-crimson-glow text-foreground hover:from-crimson-glow hover:to-crimson-rich"
                  }`}
                >
                  Register Now
                  {event.type === "audition" ? (
                    <ExternalLink size={20} />
                  ) : (
                    <ArrowRight size={20} />
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default EventModal;
