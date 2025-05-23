import React from "react";
import { MoonIcon, SunIcon } from "lucide-react";
import { Button } from "./ui/button";

interface NavbarProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const Navbar = ({ isDarkMode, toggleTheme }: NavbarProps) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center py-6 w-full max-w-4xl mx-auto bg-background/80 backdrop-blur-md">
      <div className="flex items-center">
      
      </div>
      <div className="flex items-center space-x-6">
        <a href="#" className="hover:text-primary transition-colors">
          Home
        </a>
        <a href="#about" className="hover:text-primary transition-colors">
          About
        </a>
        <a href="#projects" className="hover:text-primary transition-colors">
          Projects
        </a>
       
        <a href="#contact" className="hover:text-primary transition-colors">
          Reach Me
        </a>
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
    </nav>
  );
};

export default Navbar;
