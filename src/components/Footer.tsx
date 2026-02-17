const links = ["About", "Transparency", "Brewing Guide", "Contact", "Instagram"];

const Footer = () => (
  <footer className="px-6 py-12 md:px-12 lg:px-24 border-t border-border">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
      <p className="font-display text-xl text-cream font-semibold">BruwCraft</p>
      <nav className="flex flex-wrap gap-6 justify-center">
        {links.map((link) => (
          <a
            key={link}
            href="#"
            className="text-muted-foreground font-body text-sm link-hover hover:text-cream transition-colors duration-300"
          >
            {link}
          </a>
        ))}
      </nav>
      <p className="text-muted-foreground/50 font-body text-xs">
        © 2026 BruwCraft. All rights reserved.
      </p>
    </div>
  </footer>
);

export default Footer;
