"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useScrollReveal } from "./useScrollReveal";
import { MapPin, Calendar, DollarSign, Coffee, LucideIcon } from "lucide-react";

// =========================================
// 1. DATA TYPES
// =========================================

export type ProductId = 'bruwcraft' | 'generic';

export interface FeatureMetric {
  label: string;
  value: number;
  icon: LucideIcon;
}

export interface ProductData {
  id: ProductId;
  label: string;
  title: string;
  description: string;
  colors: {
    gradient: string;
    glow: string;
    ring: string;
    bar: string;
  };
  features: FeatureMetric[];
  stats: {
    origin: string;
    price: string;
  };
}

// Coffee Data
const PRODUCT_DATA: Record<ProductId, ProductData> = {
  bruwcraft: {
    id: 'bruwcraft',
    label: 'BruwCraft',
    title: 'Full Traceability',
    description: 'Every bag tells a story. We source from named estates, roast in small batches, and print the roast date on every package. Complete transparency from farm to cup.',
    colors: {
      gradient: 'from-amber-600 to-orange-900',
      glow: 'bg-copper',
      ring: 'border-l-copper/50',
      bar: 'left-0 bg-copper',
    },
    stats: { origin: 'Chikmagalur Estate', price: '₹650 / 250g' },
    features: [
      { label: 'Origin Traceability', value: 100, icon: MapPin },
      { label: 'Freshness Guaranteed', value: 98, icon: Calendar },
      { label: 'Price Transparency', value: 95, icon: DollarSign },
    ],
  },
  generic: {
    id: 'generic',
    label: 'Generic Brand',
    title: 'Hidden Details',
    description: 'Most brands hide behind vague terms like "Premium Blend" or "Artisan Roasted." They rarely disclose origin, roast date, or fair pricing. You deserve better.',
    colors: {
      gradient: 'from-zinc-600 to-stone-900',
      glow: 'bg-muted-foreground',
      ring: 'border-r-muted-foreground/30',
      bar: 'right-0 bg-muted-foreground/50',
    },
    stats: { origin: 'Unknown Blend', price: '? Markup hidden' },
    features: [
      { label: 'Origin Transparency', value: 15, icon: MapPin },
      { label: 'Freshness Disclosure', value: 20, icon: Calendar },
      { label: 'Fair Pricing', value: 25, icon: DollarSign },
    ],
  },
};

// =========================================
// 2. ANIMATION VARIANTS
// =========================================

const ANIMATIONS = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  },
  item: {
    hidden: { opacity: 0, y: 20, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { type: 'spring' as const, stiffness: 100, damping: 20 },
    },
    exit: { opacity: 0, y: -10, filter: 'blur(5px)' },
  },
  icon: (isBruwcraft: boolean): Variants => ({
    initial: { opacity: 0, scale: 1.5, filter: 'blur(15px)', rotate: isBruwcraft ? -15 : 15 },
    animate: {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      rotate: 0,
      transition: { type: 'spring' as const, stiffness: 260, damping: 20 },
    },
    exit: { opacity: 0, scale: 0.6, filter: 'blur(20px)', transition: { duration: 0.25 } },
  }),
};

// =========================================
// 3. SUB-COMPONENTS
// =========================================

const BackgroundGradient = ({ isBruwcraft }: { isBruwcraft: boolean }) => (
  <div className="fixed inset-0 pointer-events-none">
    <motion.div
      animate={{
        background: isBruwcraft
          ? 'radial-gradient(circle at 50% 30%, rgba(193, 122, 63, 0.15), transparent 50%)'
          : 'radial-gradient(circle at 50% 30%, rgba(80, 80, 80, 0.15), transparent 50%)',
      }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="absolute inset-0"
    />
  </div>
);

const ProductVisual = ({ data, isBruwcraft }: { data: ProductData; isBruwcraft: boolean }) => (
  <motion.div layout="position" className="relative group shrink-0">
    {/* Animated Rings */}
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      className={`absolute inset-[-20%] rounded-full border border-dashed border-white/10 ${data.colors.ring}`}
    />
    <motion.div
      animate={{ scale: [1, 1.05, 1] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      className={`absolute inset-0 rounded-full bg-gradient-to-br ${data.colors.gradient} blur-2xl opacity-40`}
    />

    {/* Icon Container */}
    <div className="relative h-64 w-64 md:h-80 md:w-80 rounded-full border border-white/5 shadow-2xl flex items-center justify-center overflow-hidden bg-black/20 backdrop-blur-sm">
      <motion.div
        animate={{ y: [-10, 10, -10] }}
        transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
        className="relative z-10 w-full h-full flex items-center justify-center"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={data.id}
            variants={ANIMATIONS.icon(isBruwcraft)}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex flex-col items-center justify-center gap-4"
          >
            <div className={`w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br ${data.colors.gradient} flex items-center justify-center shadow-lg`}>
              <Coffee className="w-12 h-12 md:w-16 md:h-16 text-cream" />
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>

    {/* Stats Label */}
    <motion.div layout="position" className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
      <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-zinc-500 bg-zinc-950/80 px-4 py-2 rounded-full border border-white/5 backdrop-blur">
        <span className={`h-1.5 w-1.5 rounded-full ${data.colors.glow} animate-pulse`} />
        {data.stats.origin}
      </div>
    </motion.div>
  </motion.div>
);

const ProductDetails = ({ data, isBruwcraft }: { data: ProductData; isBruwcraft: boolean }) => {
  const alignClass = isBruwcraft ? 'items-start text-left' : 'items-end text-right';
  const flexDirClass = isBruwcraft ? 'flex-row' : 'flex-row-reverse';

  return (
    <motion.div variants={ANIMATIONS.container} initial="hidden" animate="visible" exit="exit" className={`flex flex-col ${alignClass}`}>
      <motion.h2 variants={ANIMATIONS.item} className="text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground mb-2">
        {data.label}
      </motion.h2>
      <motion.h1 variants={ANIMATIONS.item} className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-2 text-transparent bg-clip-text bg-gradient-to-b from-cream to-copper">
        {data.title}
      </motion.h1>
      <motion.p variants={ANIMATIONS.item} className={`text-muted-foreground mb-8 max-w-sm leading-relaxed ${isBruwcraft ? 'mr-auto' : 'ml-auto'}`}>
        {data.description}
      </motion.p>

      {/* Feature Grid */}
      <motion.div variants={ANIMATIONS.item} className="w-full space-y-6 bg-card/40 p-6 rounded-2xl border border-border backdrop-blur-sm">
        {data.features.map((feature, idx) => (
          <div key={feature.label} className="group">
            <div className={`flex items-center justify-between mb-3 text-sm ${flexDirClass}`}>
              <div className="flex items-center gap-2 text-foreground">
                <feature.icon size={16} className="text-copper" /> <span>{feature.label}</span>
              </div>
              <span className="font-mono text-xs text-muted-foreground">{feature.value}%</span>
            </div>
            <div className="relative h-2 w-full bg-muted rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${feature.value}%` }}
                transition={{ duration: 1, delay: 0.4 + idx * 0.15 }}
                className={`absolute top-0 bottom-0 ${data.colors.bar} opacity-80`}
              />
            </div>
          </div>
        ))}
      </motion.div>

      {/* Price */}
      <motion.div variants={ANIMATIONS.item} className={`mt-6 flex items-center gap-3 text-copper ${flexDirClass}`}>
        <DollarSign size={16} />
        <span className="text-sm font-medium font-body">{data.stats.price}</span>
      </motion.div>
    </motion.div>
  );
};

const Switcher = ({ activeId, onToggle }: { activeId: ProductId; onToggle: (id: ProductId) => void }) => {
  const options = Object.values(PRODUCT_DATA).map(p => ({ id: p.id, label: p.label }));

  return (
    <div className="flex justify-center z-50">
      <motion.div layout className="flex items-center gap-1 p-1.5 rounded-full bg-card/80 backdrop-blur-2xl border border-border shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
        {options.map((opt) => (
          <motion.button
            key={opt.id}
            onClick={() => onToggle(opt.id)}
            whileTap={{ scale: 0.96 }}
            className="relative w-28 h-12 rounded-full flex items-center justify-center text-sm font-medium focus:outline-none"
          >
            {activeId === opt.id && (
              <motion.div
                layoutId="island-surface"
                className="absolute inset-0 rounded-full bg-gradient-to-b from-copper/20 to-copper/5 shadow-inner"
                transition={{ type: 'spring', stiffness: 220, damping: 22 }}
              />
            )}
            <span className={`relative z-10 transition-colors duration-300 ${activeId === opt.id ? 'text-cream' : 'text-muted-foreground hover:text-foreground'}`}>
              {opt.label}
            </span>
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
};

// =========================================
// 4. MAIN COMPONENT
// =========================================

export default function TransparencySection() {
  const [activeSide, setActiveSide] = useState<ProductId>('bruwcraft');
  const { ref, isVisible } = useScrollReveal();
  
  const currentData = PRODUCT_DATA[activeSide];
  const isBruwcraft = activeSide === 'bruwcraft';

  return (
    <section id="transparency" className="section-padding relative min-h-screen bg-background flex flex-col items-center justify-center" ref={ref}>
      <BackgroundGradient isBruwcraft={isBruwcraft} />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        className="text-center mb-12"
      >
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-cream mb-4">
          Not Just Coffee.{" "}
          <span className="text-gradient italic">A Known Origin.</span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Every detail, traceable. Every step, transparent.
        </p>
      </motion.div>

      {/* Main Content */}
      <main className="relative z-10 w-full px-6 flex flex-col justify-center max-w-7xl mx-auto">
        <motion.div
          layout
          transition={{ type: 'spring', bounce: 0, duration: 0.9 }}
          className={`flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20 w-full ${
            isBruwcraft ? 'md:flex-row' : 'md:flex-row-reverse'
          }`}
        >
          {/* Left: Visual */}
          <ProductVisual data={currentData} isBruwcraft={isBruwcraft} />

          {/* Right: Content */}
          <motion.div layout="position" className="w-full max-w-md">
            <AnimatePresence mode="wait">
              <ProductDetails key={activeSide} data={currentData} isBruwcraft={isBruwcraft} />
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </main>

      {/* Switcher */}
      <div className="mt-16">
        <Switcher activeId={activeSide} onToggle={setActiveSide} />
      </div>
    </section>
  );
}
