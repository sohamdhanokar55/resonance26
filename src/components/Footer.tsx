import { motion } from "framer-motion";
import { Youtube, Linkedin, Instagram } from "lucide-react";

const socialLinks = [
  {
    name: "YouTube",
    icon: Youtube,
    href: "https://www.youtube.com/@apvmedia0423",
    color: "hover:text-youtube",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    href: "https://www.linkedin.com/company/agnel-polytechnic-vashi-council/",
    color: "hover:text-linkedin",
  },
  {
    name: "Instagram",
    icon: Instagram,
    href: "https://www.instagram.com/apv_council",
    color: "hover:text-accent",
  },
];

const Footer = () => {
  return (
    <footer className="relative py-16 border-t border-secondary/20">
      <div className="absolute inset-0 bg-gradient-to-t from-crimson-deep/20 to-background" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Follow Us */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h3 className="font-display text-2xl font-semibold text-secondary mb-8">
            Follow Us
          </h3>
          <div className="flex items-center justify-center gap-6">
            {socialLinks.map((social) => (
              <motion.a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2 }}
                className={`w-14 h-14 rounded-full glass-card flex items-center justify-center text-foreground/70 transition-colors duration-300 ${social.color}`}
                aria-label={`Follow us on ${social.name}`}
              >
                <social.icon size={24} />
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-secondary/30 to-transparent mb-8" />

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="font-body text-sm text-foreground/60">
            © {new Date().getFullYear()} APV Council. All rights reserved.
          </p>
          <p className="font-body text-xs text-foreground/40 mt-2">
            Designed and Developed by APV Council
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
