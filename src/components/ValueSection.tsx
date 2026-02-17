import { useState } from "react";
import { useScrollReveal } from "./useScrollReveal";

const ValueSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const [sliderValue, setSliderValue] = useState(50);

  const bruwPercent = sliderValue;
  const savings = Math.round((bruwPercent / 100) * 8100);

  return (
    <section id="value" className="section-padding relative" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <h2
          className={`text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-center text-cream mb-4 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          ₹650 for 250g?
        </h2>
        <p
          className={`text-muted-foreground text-center mb-16 text-lg transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Let's do the math.
        </p>

        <div
          className={`glass-card p-8 sm:p-12 transition-all duration-700 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Labels */}
          <div className="flex justify-between mb-8">
            <div className="text-center">
              <p className="text-muted-foreground font-body text-sm mb-1">Cafe Coffee</p>
              <p className="text-3xl sm:text-4xl font-display font-bold text-foreground">₹350</p>
              <p className="text-muted-foreground text-xs font-body">per cup</p>
            </div>
            <div className="text-center">
              <p className="text-copper font-body text-sm mb-1 font-semibold">BruwCraft</p>
              <p className="text-3xl sm:text-4xl font-display font-bold text-copper">₹26</p>
              <p className="text-copper/60 text-xs font-body">per cup (25 cups/bag)</p>
            </div>
          </div>

          {/* Slider */}
          <div className="relative mb-8">
            <div className="h-3 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-200"
                style={{
                  width: `${sliderValue}%`,
                  background: "linear-gradient(90deg, hsl(var(--muted-foreground)), hsl(var(--copper)))",
                }}
              />
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={sliderValue}
              onChange={(e) => setSliderValue(Number(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>

          {/* Savings reveal */}
          <div
            className={`text-center transition-all duration-500 ${
              sliderValue > 70 ? "opacity-100 scale-100" : "opacity-40 scale-95"
            }`}
          >
            <p className="text-2xl sm:text-3xl font-display font-bold text-copper mb-2">
              You save ₹{savings.toLocaleString("en-IN")}
            </p>
            <p className="text-muted-foreground font-body text-sm">over 25 cups</p>
          </div>
        </div>

        <p
          className={`text-center mt-8 text-lg font-body text-muted-foreground italic transition-all duration-700 delay-500 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          Premium coffee isn't expensive. Cafes are.
        </p>
      </div>
    </section>
  );
};

export default ValueSection;
