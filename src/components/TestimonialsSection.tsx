"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollReveal } from "./useScrollReveal";
import { ArrowRight } from "lucide-react";

// Testimonial card data - 12 detailed testimonials
const testimonials = [
  {
    id: 1,
    text: "Scanning the QR code and seeing exactly which farm my coffee came from changed how I think about my morning cup. This is transparency done right.",
    author: "Rahul M.",
    role: "Bengaluru",
  },
  {
    id: 2,
    text: "The freshness is unreal. You can smell the difference the moment you open the bag. My local café coffee now tastes like water in comparison.",
    author: "Priya S.",
    role: "Mumbai",
  },
  {
    id: 3,
    text: "Started with the starter kit and haven't looked back. The South Indian filter was the perfect addition to my morning ritual.",
    author: "Arjun K.",
    role: "Chennai",
  },
  {
    id: 4,
    text: "At ₹26 per cup versus ₹350 at a café, the math is obvious. Great coffee doesn't have to cost a fortune.",
    author: "Sneha R.",
    role: "Delhi",
  },
  {
    id: 5,
    text: "I was skeptical about whole bean vs pre-ground, but the flavor difference is night and day. Worth the extra minute to grind.",
    author: "Vikram P.",
    role: "Hyderabad",
  },
  {
    id: 6,
    text: "The light roast single origin is exactly what I need. Not too acidic, not too bitter. Perfect balance.",
    author: "Anjali T.",
    role: "Pune",
  },
  {
    id: 7,
    text: "Gift this to my dad and he ditched his 20-year instant coffee habit. That's saying something!",
    author: "Karthik N.",
    role: "Bangalore",
  },
  {
    id: 8,
    text: "The medium dark roast is chef's kiss. Smooth, rich, with hints of chocolate. Exactly what I look for in South Indian coffee.",
    author: "Lakshmi G.",
    role: "Kochi",
  },
  {
    id: 9,
    text: "Knowing my coffee supports sustainable farming makes it taste even better. Transparency matters to me.",
    author: "Aditya W.",
    role: "Kolkata",
  },
  {
    id: 10,
    text: "From instant to artisanal in one switch. My colleagues at work now all order from BruwCraft.",
    author: "Meera S.",
    role: "Gurgaon",
  },
  {
    id: 11,
    text: "The packaging is beautiful and the QR code feature is so cool to show off. Feels premium without the café markup.",
    author: "Rohan J.",
    role: "Noida",
  },
  {
    id: 12,
    text: "I've tried specialty coffees from all over Bangalore. BruwCraft's quality and price combination is unbeatable.",
    author: "Divya L.",
    role: "Bangalore",
  },
];

const positionStyles = [
  { scale: 1, y: 16 },
  { scale: 0.92, y: -24 },
  { scale: 0.84, y: -64 },
];

const exitAnimation = { y: 400, scale: 1, zIndex: 10 };
const enterAnimation = { y: -24, scale: 0.92 };

function CardContent({ testimonial }: { testimonial: typeof testimonials[0] }) {
  return (
    <div className="flex h-full w-full flex-col justify-between p-8">
      {/* Quote Icon */}
      <div className="text-copper text-5xl font-display mb-2 leading-none">"</div>
      
      {/* Main Text */}
      <p className="text-foreground/90 font-body text-lg sm:text-xl leading-relaxed italic flex-1">
        {testimonial.text}
      </p>
      
      {/* Author Info */}
      <div className="mt-6 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-copper/20 flex items-center justify-center">
          <span className="text-copper font-medium">{testimonial.author.charAt(0)}</span>
        </div>
        <div>
          <p className="text-base text-cream font-body font-semibold">{testimonial.author}</p>
          <p className="text-sm text-copper/70 font-body">{testimonial.role}</p>
        </div>
      </div>
    </div>
  );
}

function AnimatedCard({ testimonial, index, isAnimating }: { testimonial: typeof testimonials[0]; index: number; isAnimating: boolean }) {
  const { scale, y } = positionStyles[index] ?? positionStyles[2];
  const zIndex = index === 0 && isAnimating ? 10 : 3 - index;

  const exitAnim = index === 0 ? exitAnimation : undefined;
  const initialAnim = index === 2 ? enterAnimation : undefined;

  return (
    <motion.div
      key={testimonial.id}
      initial={initialAnim}
      animate={{ y, scale }}
      exit={exitAnim}
      transition={{ type: "spring", duration: 1, bounce: 0 }}
      style={{ zIndex, left: "50%", x: "-50%", bottom: 0 }}
      className="absolute flex h-[340px] w-[92vw] max-w-3xl items-center justify-center overflow-hidden rounded-2xl border border-copper/20 bg-card/80 backdrop-blur-sm shadow-xl shadow-copper/5 will-change-transform sm:w-[700px] lg:w-[800px]"
    >
      <CardContent testimonial={testimonial} />
    </motion.div>
  );
}

export default function TestimonialsSection() {
  const { ref, isVisible } = useScrollReveal();
  const [cards, setCards] = useState(testimonials.slice(0, 3));
  const [isAnimating, setIsAnimating] = useState(false);
  const [nextId, setNextId] = useState(13);

  const handleAnimate = () => {
    setIsAnimating(true);
    const nextCards = [...cards.slice(1), { ...testimonials[(nextId - 1) % testimonials.length], id: nextId }];
    setCards(nextCards);
    setNextId((prev) => prev + 1);
    setIsAnimating(false);
  };

  return (
    <section className="section-padding relative flex flex-col items-center overflow-hidden" ref={ref}>
      {/* Header */}
      <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? "opacity-100" : "opacity-0"}`}>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-cream mb-4">
          What People <span className="text-gradient italic">Say</span>
        </h2>
      </div>

      {/* Animated Card Stack */}
      <div className="relative h-[400px] w-full max-w-4xl overflow-hidden flex justify-center px-4">
        <AnimatePresence initial={false}>
          {cards.slice(0, 3).map((testimonial, index) => (
            <AnimatedCard key={testimonial.id} testimonial={testimonial} index={index} isAnimating={isAnimating} />
          ))}
        </AnimatePresence>
      </div>

      {/* Animate Button */}
      <div className="relative z-10 -mt-2 flex w-full items-center justify-center border-t border-copper/20 py-6">
        <button
          onClick={handleAnimate}
          className="flex h-10 cursor-pointer select-none items-center gap-2 overflow-hidden rounded-full border border-copper/40 bg-copper/10 px-6 font-medium text-cream transition-all hover:bg-copper/25 hover:border-copper/60 hover:shadow-[0_0_20px_rgba(193,122,63,0.3)] active:scale-[0.98]"
        >
          Next Testimonial
          <ArrowRight className="w-4 h-4 text-copper" />
        </button>
      </div>
    </section>
  );
}
