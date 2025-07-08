import React from "react";
import { Card, CardContent } from "./ui/card";
import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  logo?: string;
}

interface ExperienceProps {
  experiences?: ExperienceItem[];
}

const Experience = ({ experiences = [] }: ExperienceProps) => {
  const hasExperience = experiences.length > 0;
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const notFoundRef = useRef<HTMLDivElement>(null);
  const aboutSectionRef = useRef<HTMLDivElement>(null);
  const aboutHeadingRef = useRef<HTMLHeadingElement>(null);
  const aboutBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    // About Me section (single animation)
    if (aboutSectionRef.current) {
      gsap.fromTo(
        aboutSectionRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.3,
          scrollTrigger: {
            trigger: aboutSectionRef.current,
            start: "top 85%",
          },
        }
      );
    }
    // Experience section (single animation)
    if (sectionRef.current) {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.3,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
          },
        }
      );
    }
    // 404 message (single animation)
    if (notFoundRef.current) {
      gsap.fromTo(
        notFoundRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.3,
          scrollTrigger: {
            trigger: notFoundRef.current,
            start: "top 90%",
          },
        }
      );
    }
  }, []);

  return (
    <>
      <section ref={aboutSectionRef} className="py-12 w-full max-w-3xl mx-auto bg-background text-foreground transition-colors duration-300">
        <h2 ref={aboutHeadingRef} className="text-2xl font-bold mb-6">About Me</h2>
        <div ref={aboutBoxRef} className="p-6 rounded-lg bg-card">
          <p className="mb-4">
            I'm a 3rd-year IT student from NEUST focused on front-end development while actively learning the backend to grow as a full-stack developer. I build clean, responsive websites and turn ideas into functional, user-friendly experiences through code and continuous practice.
          </p>
        </div>
      </section>
      <section ref={sectionRef} className="py-12 w-full max-w-3xl mx-auto bg-background text-foreground transition-colors duration-300">
        <h2 ref={headingRef} className="text-2xl font-bold mb-6">Experience</h2>

        {hasExperience ? (
          <div className="space-y-4">
            {experiences.map((exp, index) => (
              <Card
                key={index}
                className="overflow-hidden border border-border/50 hover:border-primary/30 transition-all duration-300"
              >
                <CardContent className="p-4 flex items-center">
                  <div className="mr-4 flex-shrink-0">
                    <img
                      src={
                        exp.logo ||
                        `https://api.dicebear.com/7.x/shapes/svg?seed=${exp.company}`
                      }
                      alt={exp.company}
                      className="w-12 h-12 rounded-md bg-muted"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-medium">{exp.company}</h3>
                    <p className="text-sm text-muted-foreground">{exp.role}</p>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {exp.period}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <motion.div
            ref={notFoundRef}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col w-full items-center justify-center text-center text-muted-foreground mt-12 space-y-4"
          >
            <AlertTriangle className="w-10 h-10 text-yellow-400" />
            <h3 className="text-lg font-semibold">404 - Experience Not Found</h3>
            <p className="max-w-md text-center mx-auto">
              Looks like I'm just getting started — and that's totally fine!{" "}
              <br />
              Every pro was once a beginner.
            </p>
          </motion.div>
        )}
      </section>
    </>
  );
};

export default Experience;
