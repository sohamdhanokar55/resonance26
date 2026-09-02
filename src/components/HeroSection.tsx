import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Box reveal animations
  const boxLeftX = useTransform(scrollYProgress, [0, 0.5], ["0%", "-100%"]);
  const boxRightX = useTransform(scrollYProgress, [0, 0.5], ["0%", "100%"]);
  const boxTopY = useTransform(scrollYProgress, [0, 0.5], ["0%", "-100%"]);
  const boxBottomY = useTransform(scrollYProgress, [0, 0.5], ["0%", "100%"]);
  const contentOpacity = useTransform(scrollYProgress, [0.2, 0.5], [0, 1]);
  const contentScale = useTransform(scrollYProgress, [0.2, 0.5], [0.8, 1]);
  const boxOpacity = useTransform(scrollYProgress, [0.3, 0.5], [1, 0]);

  return (
    <section ref={containerRef} className="relative h-[200vh]">
      {/* Sticky container */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden bg-gradient-radial-crimson">
        {/* Background particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-secondary/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* The Box Panels */}
        <motion.div
          style={{ x: boxLeftX, opacity: boxOpacity }}
          className="absolute left-0 top-0 w-1/2 h-full bg-gradient-to-r from-crimson-deep to-crimson-rich z-20 border-r-4 border-secondary/40"
        >
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyMTMsMTc1LDgwLDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-50" />
        </motion.div>

        <motion.div
          style={{ x: boxRightX, opacity: boxOpacity }}
          className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-crimson-deep to-crimson-rich z-20 border-l-4 border-secondary/40"
        >
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyMTMsMTc1LDgwLDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-50" />
        </motion.div>

        <motion.div
          style={{ y: boxTopY, opacity: boxOpacity }}
          className="absolute left-0 top-0 w-full h-1/4 bg-gradient-to-b from-crimson-deep to-crimson-rich z-30 border-b-4 border-secondary/40"
        />

        <motion.div
          style={{ y: boxBottomY, opacity: boxOpacity }}
          className="absolute left-0 bottom-0 w-full h-1/4 bg-gradient-to-t from-crimson-deep to-crimson-rich z-30 border-t-4 border-secondary/40"
        />

        {/* Center Content */}
        <motion.div
          style={{ opacity: contentOpacity, scale: contentScale }}
          className="relative z-10 text-center px-4"
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mb-6"
          >
            <span className="font-body text-secondary/80 text-sm md:text-base tracking-[0.3em] uppercase">
              Agnel Polytechnic Vashi Presents
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.8 }}
            className="font-display text-6xl md:text-8xl lg:text-9xl font-bold text-gradient-gold mb-6 gold-glow"
          >
            RESONANCE
            <span className="block text-4xl md:text-6xl lg:text-7xl mt-2">
              2K26
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="font-display text-xl md:text-3xl text-foreground/90 italic mb-8"
          >
            "Jazzed in Glam & Spark"
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="inline-flex items-center gap-2 px-8 py-4 glass-card gold-border"
          >
            <span className="font-body text-lg md:text-xl font-medium text-secondary">
              6th - 7th February 2026
            </span>
          </motion.div>

          <motion.div style={{ opacity: contentOpacity }} className="mt-16">
            <div className="flex flex-col items-center gap-2 text-secondary/60">
              <span className="text-sm font-body">Scroll to explore</span>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-6 h-10 border-2 border-secondary/40 rounded-full flex justify-center"
              >
                <motion.div
                  animate={{ y: [0, 16, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-1.5 h-1.5 bg-secondary rounded-full mt-2"
                />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Decorative corners */}
        <div className="absolute top-8 left-8 w-24 h-24 border-l-2 border-t-2 border-secondary/30" />
        <div className="absolute top-8 right-8 w-24 h-24 border-r-2 border-t-2 border-secondary/30" />
        <div className="absolute bottom-8 left-8 w-24 h-24 border-l-2 border-b-2 border-secondary/30" />
        <div className="absolute bottom-8 right-8 w-24 h-24 border-r-2 border-b-2 border-secondary/30" />
      </div>
    </section>
  );
};

export default HeroSection;
