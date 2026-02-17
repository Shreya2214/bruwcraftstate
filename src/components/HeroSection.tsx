"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import coffeeBag from "@/assets/coffee-bag.png";
import FloatingBeans from "./FloatingBeans";
import QRModal from "./QRModal";
import { cn } from "@/lib/utils";

// MagneticText Component
function MagneticText({ text = "CREATIVE", hoverText = "EXPLORE", className }: { text: string; hoverText?: string; className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const innerTextRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  const mousePos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setContainerSize({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

    const animate = () => {
      currentPos.current.x = lerp(currentPos.current.x, mousePos.current.x, 0.15);
      currentPos.current.y = lerp(currentPos.current.y, mousePos.current.y, 0.15);

      if (circleRef.current) {
        circleRef.current.style.transform = `translate(${currentPos.current.x}px, ${currentPos.current.y}px) translate(-50%, -50%)`;
      }

      if (innerTextRef.current) {
        innerTextRef.current.style.transform = `translate(${-currentPos.current.x}px, ${-currentPos.current.y}px)`;
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mousePos.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  }, []);

  const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mousePos.current = { x, y };
    currentPos.current = { x, y };
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn("relative inline-flex items-center justify-center cursor-none select-none", className)}
    >
      {/* Base text layer */}
      <span className="text-5xl md:text-6xl lg:text-7xl font-display font-bold tracking-tighter text-cream">{text}</span>

      <div
        ref={circleRef}
        className="absolute top-0 left-0 pointer-events-none rounded-full bg-copper overflow-hidden"
        style={{
          width: isHovered ? 180 : 0,
          height: isHovered ? 180 : 0,
          transition: "width 0.5s cubic-bezier(0.33, 1, 0.68, 1), height 0.5s cubic-bezier(0.33, 1, 0.68, 1)",
          willChange: "transform, width, height",
        }}
      >
        <div
          ref={innerTextRef}
          className="absolute flex items-center justify-center"
          style={{
            width: containerSize.width,
            height: containerSize.height,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            willChange: "transform",
          }}
        >
          <span className="text-5xl md:text-6xl lg:text-7xl font-display font-bold tracking-tighter text-espresso whitespace-nowrap">
            {hoverText}
          </span>
        </div>
      </div>
    </div>
  );
}

const HeroSection = () => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [qrOpen, setQrOpen] = useState(false);

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
            {/* Magnetic Text Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-bold leading-tight mb-6">
              <MagneticText 
                text="Single-Origin" 
                hoverText="Known Origin" 
                className="block mb-2"
              />
              Indian Coffee.{" "}
              <span className="text-gradient italic">Traceable to a Farm.</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-xl mb-10 font-body leading-relaxed mx-auto lg:mx-0">
              Known origin. Named growers. Pure transparency.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button onClick={() => setQrOpen(true)} className="glow-button text-center text-lg">
                Scan QR
              </button>
              <a href="#value" className="ghost-button text-center text-lg">
                ₹650 worth it?
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
      <QRModal open={qrOpen} onClose={() => setQrOpen(false)} />
    </section>
  );
};

export default HeroSection;
