import { useState } from "react";
import coffeeBag from "@/assets/coffee-bag.png";
import FloatingBeans from "./FloatingBeans";

const HeroSection = () => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -20;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Animated crema gradient */}
      <div
        className="absolute inset-0 animate-crema-swirl"
        style={{
          background:
            "linear-gradient(135deg, hsl(24 30% 8%), hsl(24 25% 14%), hsl(30 20% 10%), hsl(24 30% 8%))",
          backgroundSize: "400% 400%",
        }}
      />
      <FloatingBeans />

      <div className="relative z-10 section-padding w-full">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Left: Content */}
          <div className="flex-1 text-center lg:text-left" style={{ animation: "fade-up 1s ease-out" }}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-bold leading-tight mb-6 text-cream">
              You Deserve to Know{" "}
              <span className="text-gradient italic">Your Coffee.</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-xl mb-10 font-body leading-relaxed mx-auto lg:mx-0">
              Single-origin Indian specialty coffee. Traceable to a named farm.
              Transparent pricing. No guessing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a href="#transparency" className="glow-button text-center text-lg">
                Explore the Estate
              </a>
              <a href="#value" className="ghost-button text-center text-lg">
                How is this ₹650 worth it?
              </a>
            </div>
          </div>

          {/* Right: 3D Coffee Bag */}
          <div
            className="flex-1 flex justify-center"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ animation: "fade-up 1s 0.3s ease-out both" }}
          >
            <div className="relative">
              <div
                className="glass-card p-6 sm:p-8 transition-transform duration-300 ease-out"
                style={{
                  transform: `perspective(1000px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
                }}
              >
                <img
                  src={coffeeBag}
                  alt="BruwCraft Chikmagalur Estate coffee bag"
                  className="w-48 sm:w-64 lg:w-72 mx-auto animate-float"
                />
                <div className="mt-6 text-center space-y-1">
                  <p className="font-display text-xl text-cream font-semibold">Chikmagalur Estate</p>
                  <p className="text-muted-foreground font-body text-sm">Medium Roast · 250g</p>
                  <p className="text-copper font-body font-bold text-2xl mt-2">₹650</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
