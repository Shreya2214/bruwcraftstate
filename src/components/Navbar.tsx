import { useState, useEffect } from "react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass-card rounded-none py-3" : "py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        <a href="#" className="font-display text-xl text-cream font-bold">
          BruwCraft
        </a>
        <div className="hidden md:flex items-center gap-8">
          <a href="#transparency" className="text-muted-foreground font-body text-sm link-hover hover:text-cream transition-colors">
            Origin
          </a>
          <a href="#value" className="text-muted-foreground font-body text-sm link-hover hover:text-cream transition-colors">
            Value
          </a>
          <a href="#order" className="glow-button !px-6 !py-2 text-sm">
            Order Now
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
