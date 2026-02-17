"use client";

import { Footer } from "@/components/ui/modem-animated-footer";
import { Coffee, Instagram, Mail } from "lucide-react";

export default function FooterDemo() {
  const socialLinks = [
    {
      icon: <Instagram className="w-6 h-6" />,
      href: "https://instagram.com",
      label: "Instagram",
    },
    {
      icon: <Mail className="w-6 h-6" />,
      href: "mailto:hello@bruwcraft.com",
      label: "Email",
    },
  ];

  const navLinks = [
    { label: "About", href: "#" },
    { label: "Transparency", href: "#" },
    { label: "Brewing Guide", href: "#" },
    { label: "Contact", href: "#" },
  ];

  return (
    <Footer
      brandName="BruwCraft"
      brandDescription="Artisanal small-batch coffee roasted with precision. Experience the perfect brew crafted for coffee enthusiasts."
      socialLinks={socialLinks}
      navLinks={navLinks}
      creatorName="BruwCraft"
      creatorUrl="https://bruwcraft.com"
      brandIcon={<Coffee className="w-8 sm:w-10 md:w-14 h-8 sm:h-10 md:h-14 text-background drop-shadow-lg" />}
    />
  );
}
