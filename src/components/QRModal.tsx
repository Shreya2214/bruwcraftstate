import { useState } from "react";
import { X } from "lucide-react";

const flavors = [
  { name: "Chocolate", pct: 35, desc: "Rich dark chocolate undertones from the medium roast profile." },
  { name: "Hazelnut", pct: 25, desc: "Smooth, buttery nut notes that linger on the palate." },
  { name: "Citrus", pct: 15, desc: "Bright, mild orange zest acidity for balance." },
  { name: "Bloom", pct: 15, desc: "Floral aromatics that emerge during the first pour." },
  { name: "Caramel", pct: 10, desc: "Sweet caramel finish from careful roast development." },
];

const pricingBreakdown = [
  { label: "Green coffee (farm gate)", value: "₹180" },
  { label: "Processing & washing", value: "₹60" },
  { label: "Roasting (small batch)", value: "₹120" },
  { label: "Packaging & QR tracing", value: "₹90" },
  { label: "Logistics & handling", value: "₹80" },
  { label: "Farmer premium", value: "₹120" },
];

interface QRModalProps {
  open: boolean;
  onClose: () => void;
}

const QRModal = ({ open, onClose }: QRModalProps) => {
  const [activeFlavor, setActiveFlavor] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"origin" | "flavor" | "pricing">("origin");

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-espresso/80 backdrop-blur-sm" />
      <div
        className="relative glass-card w-full max-w-2xl max-h-[85vh] overflow-y-auto p-6 sm:p-10"
        style={{ animation: "fade-up 0.5s ease-out" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-cream transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* QR Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4 rounded-xl border-2 border-copper/40 flex items-center justify-center bg-copper/5">
            <svg viewBox="0 0 40 40" className="w-10 h-10 text-copper">
              <rect x="4" y="4" width="12" height="12" rx="2" fill="currentColor" opacity="0.8" />
              <rect x="24" y="4" width="12" height="12" rx="2" fill="currentColor" opacity="0.6" />
              <rect x="4" y="24" width="12" height="12" rx="2" fill="currentColor" opacity="0.6" />
              <rect x="24" y="24" width="12" height="12" rx="2" fill="currentColor" opacity="0.4" />
              <rect x="18" y="18" width="4" height="4" rx="1" fill="currentColor" />
            </svg>
          </div>
          <h3 className="font-display text-2xl text-cream font-bold mb-1">
            Chikmagalur Estate
          </h3>
          <p className="text-muted-foreground font-body text-sm">
            Lot #CE-2026-014 · Roasted Jan 28, 2026
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex gap-2 mb-8 justify-center">
          {(["origin", "flavor", "pricing"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full text-sm font-body font-medium transition-all duration-300 ${
                activeTab === tab
                  ? "bg-copper text-primary-foreground"
                  : "glass-card text-muted-foreground hover:text-cream"
              }`}
            >
              {tab === "origin" ? "Origin" : tab === "flavor" ? "Tasting" : "Pricing"}
            </button>
          ))}
        </div>

        {/* Origin Tab */}
        {activeTab === "origin" && (
          <div className="space-y-4" style={{ animation: "fade-up 0.4s ease-out" }}>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="glass-card p-5">
                <p className="text-copper text-xs font-body font-semibold mb-1 uppercase tracking-wider">Farm</p>
                <p className="text-cream font-display text-lg">Chikmagalur Estate</p>
                <p className="text-muted-foreground font-body text-sm mt-1">Karnataka, Western Ghats</p>
              </div>
              <div className="glass-card p-5">
                <p className="text-copper text-xs font-body font-semibold mb-1 uppercase tracking-wider">Altitude</p>
                <p className="text-cream font-display text-lg">1,200m</p>
                <p className="text-muted-foreground font-body text-sm mt-1">High-altitude Arabica</p>
              </div>
              <div className="glass-card p-5">
                <p className="text-copper text-xs font-body font-semibold mb-1 uppercase tracking-wider">Grower</p>
                <p className="text-cream font-display text-lg">Estate Direct</p>
                <p className="text-muted-foreground font-body text-sm mt-1">No middlemen, fully traceable</p>
              </div>
              <div className="glass-card p-5">
                <p className="text-copper text-xs font-body font-semibold mb-1 uppercase tracking-wider">Process</p>
                <p className="text-cream font-display text-lg">Washed · Medium</p>
                <p className="text-muted-foreground font-body text-sm mt-1">Cupping score: 84+</p>
              </div>
            </div>
          </div>
        )}

        {/* Flavor Tab */}
        {activeTab === "flavor" && (
          <div style={{ animation: "fade-up 0.4s ease-out" }}>
            <div className="flex justify-center mb-6">
              <div className="relative w-56 h-56">
                <svg viewBox="0 0 200 200" className="w-full h-full">
                  {flavors.map((f, i) => {
                    const startAngle = flavors.slice(0, i).reduce((s, fl) => s + (fl.pct / 100) * 360, 0) - 90;
                    const sweep = (f.pct / 100) * 360;
                    const midAngle = startAngle + sweep / 2;
                    const rad = (midAngle * Math.PI) / 180;
                    const isActive = activeFlavor === i;
                    const r = isActive ? 72 : 68;
                    const x1 = 100 + 68 * Math.cos((startAngle * Math.PI) / 180);
                    const y1 = 100 + 68 * Math.sin((startAngle * Math.PI) / 180);
                    const x2 = 100 + 68 * Math.cos(((startAngle + sweep) * Math.PI) / 180);
                    const y2 = 100 + 68 * Math.sin(((startAngle + sweep) * Math.PI) / 180);
                    const largeArc = sweep > 180 ? 1 : 0;
                    const labelX = 100 + 50 * Math.cos(rad);
                    const labelY = 100 + 50 * Math.sin(rad);

                    return (
                      <g
                        key={f.name}
                        onClick={() => setActiveFlavor(isActive ? null : i)}
                        className="cursor-pointer"
                      >
                        <path
                          d={`M100,100 L${x1},${y1} A68,68 0 ${largeArc},1 ${x2},${y2} Z`}
                          fill={`hsl(30 ${40 + i * 10}% ${35 + i * 8}%)`}
                          stroke="hsl(var(--background))"
                          strokeWidth="2"
                          className="transition-all duration-300"
                          style={{ transform: isActive ? `scale(1.06)` : "scale(1)", transformOrigin: "100px 100px" }}
                        />
                        <text
                          x={labelX}
                          y={labelY}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          className="fill-cream font-body text-[7px] pointer-events-none"
                        >
                          {f.name}
                        </text>
                      </g>
                    );
                  })}
                  <circle cx="100" cy="100" r="28" fill="hsl(var(--background))" />
                  <text x="100" y="97" textAnchor="middle" className="fill-copper font-display text-[9px] font-bold">
                    Flavor
                  </text>
                  <text x="100" y="108" textAnchor="middle" className="fill-muted-foreground font-body text-[6px]">
                    Wheel
                  </text>
                </svg>
              </div>
            </div>
            {activeFlavor !== null && (
              <div className="glass-card p-4 text-center" style={{ animation: "fade-up 0.3s ease-out" }}>
                <p className="text-copper font-display font-semibold">{flavors[activeFlavor].name}</p>
                <p className="text-muted-foreground font-body text-sm mt-1">{flavors[activeFlavor].desc}</p>
              </div>
            )}
            {activeFlavor === null && (
              <p className="text-center text-muted-foreground font-body text-sm">
                Tap a wedge to explore tasting notes
              </p>
            )}
          </div>
        )}

        {/* Pricing Tab */}
        {activeTab === "pricing" && (
          <div style={{ animation: "fade-up 0.4s ease-out" }}>
            <div className="space-y-3">
              {pricingBreakdown.map((item) => (
                <div key={item.label} className="flex justify-between items-center py-2 border-b border-border">
                  <span className="text-foreground/80 font-body text-sm">{item.label}</span>
                  <span className="text-copper font-body font-semibold text-sm">{item.value}</span>
                </div>
              ))}
              <div className="flex justify-between items-center pt-3">
                <span className="text-cream font-display font-semibold">Total</span>
                <span className="text-copper font-display font-bold text-xl">₹650</span>
              </div>
            </div>
            <p className="text-muted-foreground font-body text-xs text-center mt-4">
              Zero hidden margins. You see exactly where every rupee goes.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QRModal;
