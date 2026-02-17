"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useScrollReveal } from "./useScrollReveal";

// Flavor data - percentages
const flavors = [
  { value: 30, label: "Chocolate", desc: "Deep, bittersweet dark chocolate from the medium roast development." },
  { value: 22, label: "Nutty", desc: "Warm hazelnut and almond notes — smooth, rounded, and comforting." },
  { value: 18, label: "Citrus", desc: "Bright, zesty notes of orange peel and lemon — clean, vibrant acidity." },
  { value: 15, label: "Floral", desc: "Delicate jasmine and honeysuckle aromatics that bloom with each sip." },
  { value: 15, label: "Acidity", desc: "Well-balanced, wine-like acidity that lifts the cup without sharpness." },
];

const FlavorBar = ({
  value,
  label,
  delay,
  isActive,
  onClick,
}: {
  value: number;
  label: string;
  delay: number;
  isActive: boolean;
  onClick: () => void;
}) => {
  return (
    <div 
      className="group relative flex flex-col items-center cursor-pointer" 
      onClick={onClick}
    >
      {/* Bar container */}
      <div className="relative w-16 sm:w-20 h-64 sm:h-80 flex items-end">
        {/* Background track */}
        <div className="absolute inset-0 rounded-2xl bg-card/30" />
        
        {/* Animated bar */}
        <motion.div
          initial={{ height: "0%" }}
          animate={{ height: `${value}%` }}
          transition={{ duration: 1, type: "spring", damping: 20, delay }}
          className={`relative w-full rounded-2xl flex items-start justify-center overflow-hidden ${
            isActive 
              ? "bg-gradient-to-t from-copper to-copper" 
              : "bg-gradient-to-t from-copper/80 to-copper/50"
          }`}
        >
          {/* Shine effect */}
          <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-white/20 to-transparent" />
          
          {/* Value label on top of bar */}
          <span className="absolute top-3 font-display text-sm font-bold text-white drop-shadow-md">
            {value}%
          </span>
        </motion.div>
      </div>

      {/* Label below bar */}
      <p className={`mt-4 font-body text-sm font-medium transition-colors ${
        isActive ? "text-copper" : "text-muted-foreground"
      }`}>
        {label}
      </p>
    </div>
  );
};

const FlavorWheel = () => {
  const { ref, isVisible } = useScrollReveal();
  const [activeFlavor, setActiveFlavor] = useState<number | null>(null);

  return (
    <section className="section-padding relative" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-cream mb-4">
            Flavor <span className="text-gradient italic">Experience</span>
          </h2>
          <p className="text-muted-foreground text-lg font-body">
            Explore what you'll taste in every cup.
          </p>
        </motion.div>

        {/* Bars container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-end justify-center gap-4 sm:gap-6 px-4"
        >
          {flavors.map((flavor, index) => (
            <FlavorBar
              key={flavor.label}
              value={flavor.value}
              label={flavor.label}
              delay={0.3 + index * 0.1}
              isActive={activeFlavor === index}
              onClick={() => setActiveFlavor(activeFlavor === index ? null : index)}
            />
          ))}
        </motion.div>

        {/* Active flavor description - shown below all bars */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="mt-16 text-center"
        >
          {activeFlavor !== null ? (
            <motion.div
              key={activeFlavor}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-6 inline-block max-w-lg"
            >
              <p className="text-copper font-display text-lg font-semibold">
                {flavors[activeFlavor].label} · {flavors[activeFlavor].value}%
              </p>
              <p className="text-foreground/80 font-body text-sm mt-2">
                {flavors[activeFlavor].desc}
              </p>
            </motion.div>
          ) : (
            <p className="text-muted-foreground font-body text-sm">
              Click any bar to explore the flavor profile.
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default FlavorWheel;
