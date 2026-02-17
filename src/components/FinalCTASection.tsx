import { useScrollReveal } from "./useScrollReveal";

const FinalCTASection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="order" className="section-padding relative" ref={ref}>
      <div className="max-w-3xl mx-auto text-center">
        <div
          className={`glass-card p-12 sm:p-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-cream mb-4">
            Stop Guessing.{" "}
            <span className="text-gradient italic">Start Knowing.</span>
          </h2>
          <p className="text-muted-foreground text-lg font-body mb-10">
            Single-origin. Transparent pricing. Farm-traceable.
          </p>
          <a
            href="#"
            className="glow-button inline-block text-lg animate-glow-pulse"
          >
            Order Chikmagalur Estate — ₹650
          </a>
        </div>
      </div>
    </section>
  );
};

export default FinalCTASection;
