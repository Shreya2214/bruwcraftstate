import { useState } from "react";
import { useScrollReveal } from "./useScrollReveal";

const timelineCards = [
  {
    title: "Chikmagalur Estate",
    region: "Karnataka, Western Ghats",
    altitude: "1,200m above sea level",
    climate: "Tropical monsoon. Cool nights, warm days.",
    growerQuote: "\"We've been growing coffee here for three generations. The soil speaks.\"",
    crop: "Harvested Nov–Feb. Cherry-picked at peak ripeness.",
  },
  {
    title: "Shade-Grown Arabica",
    region: "Under silver oak & pepper vines",
    altitude: "Canopy coverage: 40%",
    climate: "Natural shade regulates temperature and moisture.",
    growerQuote: "\"Shade-growing takes longer, but the flavor depth is unmatched.\"",
    crop: "Slow maturation yields denser, sweeter beans.",
  },
  {
    title: "Washed Processing",
    region: "On-site wet mill",
    altitude: "Fermented 18–24 hours",
    climate: "Clean mountain spring water used throughout.",
    growerQuote: "\"Washing gives the cleanest cup. You taste the origin, not the process.\"",
    crop: "Sun-dried on raised beds for 10–14 days.",
  },
  {
    title: "Small-Batch Roasting",
    region: "Roasted within 48hrs of order",
    altitude: "Profile: Medium development",
    climate: "First crack + 1:30. Balanced sweetness.",
    growerQuote: "\"We roast to highlight chocolate and nut, never to mask the bean.\"",
    crop: "Cupping score: 84+. QR-traced to lot number.",
  },
];

const OriginTimeline = () => {
  const { ref, isVisible } = useScrollReveal();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <section id="origin-story" className="section-padding relative overflow-hidden" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <h2
          className={`text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-center text-cream mb-4 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          From Seed to <span className="text-gradient italic">Your Cup</span>
        </h2>
        <p
          className={`text-muted-foreground text-center mb-12 text-lg font-body transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Follow the journey of your coffee.
        </p>

        {/* Horizontal scroll container */}
        <div className="overflow-x-auto pb-4 -mx-6 px-6 scrollbar-hide">
          <div className="flex gap-6 min-w-max">
            {timelineCards.map((card, i) => {
              const isHovered = hoveredCard === i;
              return (
                <div key={i} className="flex items-center">
                  <div
                    className={`glass-card w-72 sm:w-80 p-7 transition-all duration-500 cursor-default ${
                      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    }`}
                    style={{
                      transitionDelay: `${300 + i * 150}ms`,
                      transform: isHovered
                        ? "translateY(-8px) rotateY(2deg)"
                        : isVisible
                        ? "translateY(0)"
                        : "translateY(32px)",
                      boxShadow: isHovered
                        ? "0 16px 48px rgba(193, 122, 63, 0.2)"
                        : undefined,
                      borderColor: isHovered
                        ? "rgba(193, 122, 63, 0.3)"
                        : undefined,
                    }}
                    onMouseEnter={() => setHoveredCard(i)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <span className="w-8 h-8 rounded-full bg-copper/15 text-copper font-display font-bold text-sm flex items-center justify-center">
                        {i + 1}
                      </span>
                      <h3 className="font-display text-lg text-cream font-semibold">
                        {card.title}
                      </h3>
                    </div>
                    <p className="text-copper text-sm font-body mb-3">{card.region}</p>
                    <div className="space-y-2 text-sm text-muted-foreground font-body">
                      <p>🏔 {card.altitude}</p>
                      <p>🌤 {card.climate}</p>
                      <p>🌿 {card.crop}</p>
                    </div>
                    <p className="text-foreground/70 font-body text-sm italic mt-4 border-t border-border pt-4">
                      {card.growerQuote}
                    </p>
                  </div>
                  {/* Bean path connector */}
                  {i < timelineCards.length - 1 && (
                    <div className="flex items-center px-2">
                      <div className="flex gap-1.5 items-center">
                        {[0, 1, 2].map((dot) => (
                          <div
                            key={dot}
                            className="w-1.5 h-2 rounded-full bg-copper/30"
                            style={{
                              animation: `float ${2 + dot * 0.3}s ease-in-out infinite`,
                              animationDelay: `${dot * 0.2}s`,
                            }}
                          />
                        ))}
                        <div className="w-6 h-px bg-copper/20" />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OriginTimeline;
