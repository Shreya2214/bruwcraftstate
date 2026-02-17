import { useState } from "react";
import { useScrollReveal } from "./useScrollReveal";
import starterKit from "@/assets/starter-kit.png";

const StarterKitSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 15;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -15;
    setTilt({ x, y });
  };

  return (
    <section className="section-padding relative" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <h2
          className={`text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-center text-cream mb-4 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          New to Specialty Coffee?
        </h2>
        <p
          className={`text-muted-foreground text-center mb-16 text-lg font-body transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Everything you need to start brewing right.
        </p>

        <div
          className={`glass-card p-8 sm:p-12 flex flex-col lg:flex-row items-center gap-12 transition-all duration-700 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div
            className="flex-1"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setTilt({ x: 0, y: 0 })}
          >
            <img
              src={starterKit}
              alt="BruwCraft Starter Kit"
              className="rounded-lg w-full transition-transform duration-300"
              style={{
                transform: `perspective(800px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg) scale(1.02)`,
              }}
            />
          </div>

          <div className="flex-1 text-center lg:text-left">
            <h3 className="font-display text-2xl text-cream font-semibold mb-6">
              The Starter Kit
            </h3>
            <ul className="space-y-4 font-body text-foreground/80 mb-8">
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-copper flex-shrink-0" />
                250g Chikmagalur Estate Coffee
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-copper flex-shrink-0" />
                Traditional South Indian Filter
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-copper flex-shrink-0" />
                Brewing Guide Card
              </li>
            </ul>
            <a href="#order" className="glow-button inline-block text-lg">
              Start Your Upgrade
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StarterKitSection;
