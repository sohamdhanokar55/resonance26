import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface EventCardProps {
  title: string;
  icon: LucideIcon;
  type: "audition" | "competition";
  onClick: () => void;
  index: number;
}

const EventCard = ({ title, icon: Icon, type, onClick, index }: EventCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      onClick={onClick}
      className="cursor-pointer group"
    >
      <div
        className={`relative p-6 rounded-2xl border transition-all duration-500 overflow-hidden ${
          type === "audition"
            ? "glass-card border-secondary/20 hover:border-secondary/50"
            : "glass-card border-crimson-glow/20 hover:border-crimson-glow/50"
        }`}
      >
        {/* Background glow */}
        <div
          className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
            type === "audition"
              ? "bg-gradient-to-br from-secondary/10 to-transparent"
              : "bg-gradient-to-br from-crimson-glow/10 to-transparent"
          }`}
        />

        {/* Icon */}
        <div
          className={`w-16 h-16 rounded-xl flex items-center justify-center mb-4 transition-all duration-500 group-hover:scale-110 ${
            type === "audition"
              ? "bg-secondary/10 text-secondary"
              : "bg-crimson-glow/10 text-crimson-glow"
          }`}
        >
          <Icon size={32} />
        </div>

        {/* Title */}
        <h3 className="font-display text-xl font-semibold text-foreground mb-2 group-hover:text-secondary transition-colors">
          {title}
        </h3>

        {/* Type badge */}
        <span
          className={`text-xs font-body uppercase tracking-wider px-3 py-1 rounded-full ${
            type === "audition"
              ? "bg-secondary/20 text-secondary"
              : "bg-crimson-glow/20 text-crimson-glow"
          }`}
        >
          {type}
        </span>

        {/* Shimmer effect */}
        <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </motion.div>
  );
};

export default EventCard;
