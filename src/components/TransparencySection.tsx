import { useState } from "react";
import { useScrollReveal } from "./useScrollReveal";
import { Sprout, User, FlaskConical } from "lucide-react";

const cards = [
  {
    icon: Sprout,
    title: "Farm",
    subtitle: "Chikmagalur Estate, Karnataka",
    short: "Named farm. High-altitude Arabica.",
    detail:
      "Grown at 1,200m altitude in the Western Ghats. Shade-grown under silver oak and pepper vines. Hand-picked at peak ripeness.",
  },
  {
    icon: User,
    title: "Grower",
    subtitle: "Estate-Sourced",
    short: "Traceable to a real estate with direct sourcing.",
    detail:
      "We work directly with the estate owner — no middlemen, no commodity markets. Every bag can be traced back to the specific lot it came from.",
  },
  {
    icon: FlaskConical,
    title: "Process",
    subtitle: "Washed · Medium Roast",
    short: "Chocolate, hazelnut, mild citrus notes.",
    detail:
      "Washed processing for clean flavors. Roasted in small batches within 48 hours of your order. Cupping score: 84+.",
  },
];

const TransparencySection = () => {
  const { ref, isVisible } = useScrollReveal();
  const [expanded, setExpanded] = useState<number | null>(null);
  const [showComparison, setShowComparison] = useState(false);

  return (
    <section id="transparency" className="section-padding relative" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <h2
          className={`text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-center text-cream mb-4 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Not Just Coffee.{" "}
          <span className="text-gradient italic">A Known Origin.</span>
        </h2>
        <p className={`text-muted-foreground text-center mb-16 text-lg max-w-2xl mx-auto transition-all duration-700 delay-200 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}>
          Every detail, traceable. Every step, transparent.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {cards.map((card, i) => {
            const Icon = card.icon;
            const isOpen = expanded === i;
            return (
              <div
                key={card.title}
                className={`glass-card-hover cursor-pointer p-8 transition-all duration-500 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${300 + i * 150}ms` }}
                onClick={() => setExpanded(isOpen ? null : i)}
              >
                <div className="w-12 h-12 rounded-full bg-copper/10 flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6 text-copper" />
                </div>
                <h3 className="font-display text-xl text-cream font-semibold mb-1">
                  {card.title}
                </h3>
                <p className="text-copper text-sm font-body mb-3">{card.subtitle}</p>
                <p className="text-muted-foreground font-body text-sm leading-relaxed">
                  {card.short}
                </p>
                <div
                  className={`overflow-hidden transition-all duration-500 ${
                    isOpen ? "max-h-40 mt-4 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="pt-4 border-t border-border">
                    <p className="text-foreground/80 font-body text-sm leading-relaxed">
                      {card.detail}
                    </p>
                  </div>
                </div>
                <p className="text-copper/60 text-xs mt-4 font-body">
                  {isOpen ? "Click to collapse" : "Click to learn more"}
                </p>
              </div>
            );
          })}
        </div>

        {/* Comparison toggle */}
        <div className="text-center">
          <button
            onClick={() => setShowComparison(!showComparison)}
            className="ghost-button text-sm"
          >
            {showComparison ? "Hide comparison" : "See what most coffee brands hide"}
          </button>

          <div
            className={`mt-8 grid md:grid-cols-2 gap-6 max-w-3xl mx-auto transition-all duration-700 ${
              showComparison ? "opacity-100 max-h-[500px]" : "opacity-0 max-h-0 overflow-hidden"
            }`}
          >
            <div className="glass-card p-8 border-copper/30 border">
              <p className="text-copper font-display text-lg font-semibold mb-3">BruwCraft</p>
              <ul className="space-y-2 text-sm text-foreground/80 font-body">
                <li>✓ Chikmagalur Estate, Karnataka</li>
                <li>✓ Single-origin Arabica</li>
                <li>✓ Washed process, medium roast</li>
                <li>✓ Roast date on every bag</li>
                <li>✓ ₹650 / 250g — transparent</li>
              </ul>
            </div>
            <div className="glass-card p-8 relative overflow-hidden">
              <div className="absolute inset-0 backdrop-blur-sm bg-background/40" />
              <div className="relative">
                <p className="text-muted-foreground font-display text-lg font-semibold mb-3">
                  Generic Brand
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground/60 font-body">
                  <li>? Origin: "Blend"</li>
                  <li>? Variety: Unknown</li>
                  <li>? Process: Not disclosed</li>
                  <li>? Roast date: Missing</li>
                  <li>? Price: Markup unknown</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TransparencySection;
