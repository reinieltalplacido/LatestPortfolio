import React, { useState, useEffect } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Mail, FileText } from "lucide-react";
import { FaReact, FaBootstrap } from "react-icons/fa";
import { SiTailwindcss, SiFigma, SiHtml5, SiCss3, SiJavascript } from "react-icons/si";

interface HeroProps {
  name?: string;
  title?: string;
  description?: string;
  skills?: string[];
  location?: string;
  time?: string;
  availability?: boolean;
}

const Hero = ({
  name = "Reiniel Anjelo T. Talplacido",
  title = "Web Developer/Designer",
 description = "Currently a 3rd-year IT student who designs in Figma and develops modern, responsive websites using HTML, CSS, React, and Tailwind CSS.",
  skills = ["HTML", "CSS", "JavaScript", "React", "Tailwind CSS", "Bootstrap", "Figma"],
  location = "Philippines",
  time = "11:28 AM",
  availability = true,
}: HeroProps) => {
  const [currentTime, setCurrentTime] = useState(time);

  const skillIcons: Record<string, JSX.Element> = {
    HTML: <SiHtml5 color="#E34F26" className="inline mr-1" />,
    CSS: <SiCss3 color="#1572B6" className="inline mr-1" />,
    JavaScript: <SiJavascript color="#F7DF1E" className="inline mr-1" />,
    React: <FaReact color="#61DAFB" className="inline mr-1" />,
    "Tailwind CSS": <SiTailwindcss color="#06B6D4" className="inline mr-1" />,
    Bootstrap: <FaBootstrap color="#7952B3" className="inline mr-1" />,
    Figma: <SiFigma color="#F24E1E" className="inline mr-1" />,
  };

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format time for Philippines timezone (Asia/Manila)
      const options = {
        hour: "numeric" as "numeric" | "2-digit",
        minute: "numeric" as "numeric" | "2-digit",
        hour12: true,
        timeZone: "Asia/Manila",
      };
      setCurrentTime(now.toLocaleTimeString("en-US", options));
    };

    // Update time immediately
    updateTime();

    // Update time every minute
    const interval = setInterval(updateTime, 60000);

    return () => clearInterval(interval);
  }, []);
  return (
    <section className="py-12 w-full max-w-3xl mx-auto text-center md:text-left">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">{name}</h1>
      <p className="text-xl mb-6 text-muted-foreground">{title}</p>
      <p className="mb-6 max-w-2xl">{description}</p>
      <p className="mb-2">
        Currently focused on personal projects and growing as a solo developer, while occasionally freelancing and learning new tools.
      </p>
      <div className="flex items-center justify-center md:justify-start space-x-2 mb-6 mt-4">
        <span
          className={`inline-block w-2 h-2 rounded-full ${availability ? "bg-green-500" : "bg-gray-400"}`}
        ></span>
        <span className="text-sm">
          {availability
            ? "Available for new challenges"
            : "Currently unavailable"}
        </span>
      </div>
      <div className="flex flex-wrap gap-2 mb-6 justify-center md:justify-start">
        {skills.map((skill, index) => (
          <Badge key={index} variant="secondary" className="text-xs flex items-center gap-1">
            {skillIcons[skill] || null}{skill}
          </Badge>
        ))}
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3 mb-6">
        <a href="#contact">
          <Button variant="default" size="sm">
            <Mail className="mr-2 h-4 w-4" />
            Reach Me
          </Button>
        </a>
      </div>
      <p className="text-sm text-muted-foreground">
        {location}, local time: {currentTime}
      </p>
    </section>
  );
};

export default Hero;
