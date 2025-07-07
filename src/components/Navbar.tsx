import React, { useState, useEffect } from "react";
import { MoonIcon, SunIcon, Home, User, Settings, Mail, Phone, Menu, X } from "lucide-react";
import { Button } from "./ui/button";

interface NavbarProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const menuItems = [
  { icon: Home, label: "Home", href: "#" },
  { icon: User, label: "About", href: "#about" },
  { icon: Settings, label: "Projects", href: "#projects" },
  { icon: Mail, label: "Reach Me", href: "#contact" },
];

const Navbar = ({ isDarkMode, toggleTheme }: NavbarProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  // Prevent background scroll when drawer is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full max-w-4xl mx-auto bg-background dark:bg-black">
      <div className="flex justify-between items-center py-6 px-4 md:px-0">
        <div className="flex items-center"></div>
        {/* Desktop nav */}
        <div className="hidden md:flex items-center space-x-6">
          {menuItems.map((item) => (
            <a key={item.label} href={item.href} className="hover:text-primary transition-colors flex items-center gap-1">
              <item.icon className="h-4 w-4" />
              {item.label}
            </a>
          ))}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full"
            aria-label="Toggle theme"
          >
            {isDarkMode ? (
              <SunIcon className="h-5 w-5" />
            ) : (
              <MoonIcon className="h-5 w-5" />
            )}
          </Button>
        </div>
        {/* Hamburger for mobile */}
        <div className="md:hidden flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileOpen((v) => !v)}
            className="rounded-full"
            aria-label="Open mobile menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>
      {/* Mobile side drawer with animated menu */}
      <div
        className={`fixed inset-0 z-40 bg-black/30 dark:bg-black/70 transition-opacity duration-300 ${mobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => setMobileOpen(false)}
        aria-label="Close mobile menu overlay"
      />
      <div
        className={`fixed top-0 right-0 h-full w-full md:w-80 bg-background shadow-2xl border-l border-border transform transition-transform duration-300 ease-in-out z-50 ${mobileOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Menu Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">Menu</h2>
          <button
            onClick={() => setMobileOpen(false)}
            className="p-2 hover:bg-muted rounded-full transition-colors duration-200"
            aria-label="Close menu"
          >
            <X size={20} className="text-muted-foreground" />
          </button>
        </div>
        {/* Menu Items */}
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className={`flex items-center space-x-3 p-3 rounded-lg hover:bg-muted transition-all duration-200 transform hover:translate-x-2 ${mobileOpen ? "animate-slide-in" : ""}`}
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => setMobileOpen(false)}
                >
                  <item.icon size={20} className="text-muted-foreground" />
                  <span className="text-foreground font-medium">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        {/* Theme Toggle */}
        <div className="px-4 pb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full"
            aria-label="Toggle theme"
          >
            {isDarkMode ? (
              <SunIcon className="h-5 w-5" />
            ) : (
              <MoonIcon className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
      {/* Slide-in animation */}
      <style>{`
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-slide-in {
          animation: slide-in 0.4s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
