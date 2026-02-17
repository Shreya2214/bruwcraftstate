import { useScrollReveal } from "./useScrollReveal";

const testimonials = [
  "You actually tell me which farm my coffee is from.",
  "Better than specialty cafes.",
  "The starter kit with the South Indian filter was perfect.",
  "I show my friends the QR code on the packaging.",
  "Converted from instant and never going back.",
];

const TestimonialsSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="section-padding relative overflow-hidden" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <h2
          className={`text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-center text-cream mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          What People <span className="text-gradient italic">Say</span>
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((text, i) => (
            <div
              key={i}
              className={`glass-card-hover p-8 transition-all duration-700 group ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              } ${i === 3 ? "sm:col-span-1 lg:col-span-1" : ""}`}
              style={{ transitionDelay: `${200 + i * 120}ms` }}
            >
              <div className="text-copper text-3xl font-display mb-4 leading-none">"</div>
              <p className="text-foreground/90 font-body text-base leading-relaxed italic">
                {text}
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-copper/20" />
                <div>
                  <p className="text-sm text-cream font-body font-medium">Coffee Lover</p>
                  <p className="text-xs text-muted-foreground font-body">Verified Buyer</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
