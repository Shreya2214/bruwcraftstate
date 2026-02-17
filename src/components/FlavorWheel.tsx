import { useState } from "react";
import { useScrollReveal } from "./useScrollReveal";

const flavors = [
  { name: "Citrus", pct: 18, color: "30 60% 55%", desc: "Bright, zesty notes of orange peel and lemon — a clean, vibrant acidity." },
  { name: "Chocolate", pct: 30, color: "24 40% 30%", desc: "Deep, bittersweet dark chocolate from the medium roast development." },
  { name: "Nut", pct: 22, color: "30 45% 42%", desc: "Warm hazelnut and almond notes — smooth, rounded, and comforting." },
  { name: "Bloom", pct: 15, color: "340 30% 45%", desc: "Delicate jasmine and honeysuckle aromatics that bloom with each sip." },
  { name: "Acidity", pct: 15, color: "45 50% 50%", desc: "Well-balanced, wine-like acidity that lifts the cup without sharpness." },
];

const FlavorWheel = () => {
  const { ref, isVisible } = useScrollReveal();
  const [activeFlavor, setActiveFlavor] = useState<number | null>(null);

  const buildPath = (index: number) => {
    const startAngle = flavors.slice(0, index).reduce((s, f) => s + (f.pct / 100) * 360, 0) - 90;
    const sweep = (flavors[index].pct / 100) * 360;
    const r = 90;
    const cx = 100, cy = 100;
    const x1 = cx + r * Math.cos((startAngle * Math.PI) / 180);
    const y1 = cy + r * Math.sin((startAngle * Math.PI) / 180);
    const x2 = cx + r * Math.cos(((startAngle + sweep) * Math.PI) / 180);
    const y2 = cy + r * Math.sin(((startAngle + sweep) * Math.PI) / 180);
    const largeArc = sweep > 180 ? 1 : 0;
    const midAngle = startAngle + sweep / 2;
    const labelR = 62;
    const lx = cx + labelR * Math.cos((midAngle * Math.PI) / 180);
    const ly = cy + labelR * Math.sin((midAngle * Math.PI) / 180);
    return { path: `M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${largeArc},1 ${x2},${y2} Z`, lx, ly };
  };

  return (
    <section className="section-padding relative" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <h2
          className={`text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-center text-cream mb-4 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Flavor <span className="text-gradient italic">Experience</span>
        </h2>
        <p
          className={`text-muted-foreground text-center mb-12 text-lg font-body transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Explore what you'll taste in every cup.
        </p>

        <div
          className={`flex flex-col items-center gap-8 transition-all duration-700 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="relative w-64 h-64 sm:w-80 sm:h-80">
            <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-lg">
              {flavors.map((f, i) => {
                const { path, lx, ly } = buildPath(i);
                const isActive = activeFlavor === i;
                return (
                  <g
                    key={f.name}
                    onClick={() => setActiveFlavor(isActive ? null : i)}
                    className="cursor-pointer"
                  >
                    <path
                      d={path}
                      fill={`hsl(${f.color})`}
                      stroke="hsl(var(--background))"
                      strokeWidth="1.5"
                      className="transition-all duration-300 hover:brightness-125"
                      style={{
                        transform: isActive ? "scale(1.05)" : "scale(1)",
                        transformOrigin: "100px 100px",
                        filter: isActive ? "brightness(1.3)" : undefined,
                      }}
                    />
                    <text
                      x={lx}
                      y={ly}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="fill-cream font-body text-[8px] sm:text-[9px] pointer-events-none font-medium"
                    >
                      {f.name}
                    </text>
                  </g>
                );
              })}
              <circle cx="100" cy="100" r="32" fill="hsl(var(--background))" stroke="hsl(var(--border))" strokeWidth="1" />
              <text x="100" y="96" textAnchor="middle" className="fill-copper font-display text-[10px] font-bold">
                Taste
              </text>
              <text x="100" y="108" textAnchor="middle" className="fill-muted-foreground font-body text-[7px]">
                Profile
              </text>
            </svg>
          </div>

          <div className="w-full max-w-md min-h-[80px]">
            {activeFlavor !== null ? (
              <div className="glass-card p-6 text-center" style={{ animation: "fade-up 0.3s ease-out" }}>
                <p className="text-copper font-display text-lg font-semibold mb-2">
                  {flavors[activeFlavor].name} · {flavors[activeFlavor].pct}%
                </p>
                <p className="text-foreground/80 font-body text-sm leading-relaxed">
                  {flavors[activeFlavor].desc}
                </p>
              </div>
            ) : (
              <p className="text-center text-muted-foreground font-body text-sm py-6">
                Tap any wedge to explore the flavor.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FlavorWheel;
