import React, { useState, useEffect, useRef } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Mail, FileText, Github } from "lucide-react";
import { FaReact, FaBootstrap, FaGithub, FaGitAlt } from "react-icons/fa";
import { SiTailwindcss, SiHtml5, SiCss3, SiJavascript, SiTypescript, SiCplusplus, SiNextdotjs, SiPhp, SiMysql } from "react-icons/si";
import gsap from "gsap";

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
  description,
  skills = ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Tailwind CSS", "Bootstrap", "C++", "Next.js", "PHP", "SQL", "Git", "GitHub"],
  location = "Philippines",
  time = "11:28 AM",
  availability = true,
}: HeroProps) => {
  const [currentTime, setCurrentTime] = useState(time);
  const sectionRef = useRef<HTMLDivElement>(null);

  const skillIcons: Record<string, JSX.Element> = {
    HTML: <SiHtml5 color="#E34F26" className="inline mr-1" />,
    CSS: <SiCss3 color="#1572B6" className="inline mr-1" />,
    JavaScript: <SiJavascript color="#F7DF1E" className="inline mr-1" />,
    TypeScript: <SiTypescript color="#3178C6" className="inline mr-1" />,
    React: <FaReact color="#61DAFB" className="inline mr-1" />,
    "Tailwind CSS": <SiTailwindcss color="#06B6D4" className="inline mr-1" />,
    Bootstrap: <FaBootstrap color="#7952B3" className="inline mr-1" />,
    "C++": <SiCplusplus color="#00599C" className="inline mr-1" />,
    "Next.js": <SiNextdotjs className="inline mr-1" color="currentColor" />,
    PHP: <SiPhp color="#777BB4" className="inline mr-1" />,
    SQL: <SiMysql className="inline mr-1" color="currentColor" />,
    Git: <FaGitAlt color="#F05032" className="inline mr-1" />,
    GitHub: <FaGithub className="inline mr-1" color="currentColor" />,
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

  useEffect(() => {
    if (sectionRef.current) {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1 }
      );
    }
  }, []);

  return (
    <section ref={sectionRef} className="py-12 w-full max-w-3xl mx-auto text-left">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">{name}</h1>
      <p className="text-xl mb-6 text-muted-foreground">{title}</p>
      <p className="mb-6 max-w-2xl text-left">{description}</p>
      <div className="flex flex-wrap gap-2 mb-6 justify-center md:justify-start">
        {skills.map((skill, index) => (
          <Badge key={index} variant="clear" className="text-xs flex items-center gap-1">
            {skillIcons[skill] || null}{skill}
          </Badge>
        ))}
      </div>
      <div className="flex flex-row items-center justify-center md:justify-start gap-3 mb-6">
        <a href="#contact">
          <Button variant="default" size="sm">
            <Mail className="mr-2 h-4 w-4" />
            Reach Me
          </Button>
        </a>
        <a
          href="https://github.com/reinieltalplacido"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="outline" size="sm" className="flex items-center">
            <Github className="mr-2 h-4 w-4" />
            GitHub
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
