import React, { useState, useEffect, useRef } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Mail, FileText, Github, Clipboard } from "lucide-react";
import { FaReact, FaBootstrap, FaGithub, FaGitAlt } from "react-icons/fa";
import { SiTailwindcss, SiHtml5, SiCss3, SiJavascript, SiTypescript, SiCplusplus, SiNextdotjs, SiPhp, SiMysql } from "react-icons/si";
import gsap from "gsap";
import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover";
import { useToast } from "./ui/use-toast";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
  const sectionRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);
  const email = "your.email@example.com";
  const { toast } = useToast();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

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

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(email);
    toast({ title: "Copied!", description: "Email address copied to clipboard." });
  };

  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    if (sectionRef.current) {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1 }
      );
    }
    if (headingRef.current) {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, scale: 0.9, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 0.8, delay: 0.1, ease: "back.out(1.7)" }
      );
    }
    if (subtitleRef.current) {
      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, delay: 0.3 }
      );
    }
    if (descRef.current) {
      gsap.fromTo(
        descRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, delay: 0.5 }
      );
    }
    if (skillsRef.current) {
      gsap.fromTo(
        skillsRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          scrollTrigger: {
            trigger: skillsRef.current,
            start: "top 80%",
          },
        }
      );
    }
    if (buttonsRef.current) {
      gsap.fromTo(
        buttonsRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          scrollTrigger: {
            trigger: buttonsRef.current,
            start: "top 85%",
          },
        }
      );
    }
    return;
  }, []);

  return (
    <section ref={sectionRef} className="py-12 w-full max-w-3xl mx-auto text-left bg-background text-foreground transition-colors duration-300">
      <h1 ref={headingRef} className="text-4xl md:text-5xl font-bold mb-4">{name}</h1>
      <p ref={subtitleRef} className="text-xl mb-6 text-muted-foreground">{title}</p>
      <p ref={descRef} className="mb-6 max-w-2xl text-left">{description}</p>
      <div ref={skillsRef} className="flex flex-wrap gap-2 mb-6 justify-center md:justify-start">
        {skills.map((skill, index) => (
          <Badge key={index} variant="clear" className="text-xs flex items-center gap-1">
            {skillIcons[skill] || null}{skill}
          </Badge>
        ))}
      </div>
      <div ref={buttonsRef} className="flex flex-row items-center justify-center md:justify-start gap-3 mb-6">
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
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2 transition-all duration-300 overflow-hidden relative text-base"
          style={{ minWidth: "7rem" }}
        >
          <Mail className="h-4 w-4" />
          <span className="text-sm" style={{ whiteSpace: "nowrap", overflow: "hidden" }}>
            reinieltalplacido529@gmail.com
          </span>
        </Button>
      </div>
    </section>
  );
};

export default Hero;
