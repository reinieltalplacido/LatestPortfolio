import React, { useState, useEffect, useRef } from "react";
import Terminal from "./Terminal";
import ProjectShowcase from "./ProjectShowcase";
import Navbar from "./Navbar";
import Hero from "./Hero";
import Experience from "./Experience";
import { Github, Linkedin, Mail } from "lucide-react";
import { Button } from "./ui/button";
import emailjs from '@emailjs/browser';
import { useToast } from "./ui/use-toast";
import { Toaster } from "./ui/toaster";
import { inject } from "@vercel/analytics";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollSmoother from "gsap/ScrollSmoother";

emailjs.init("3uTEW4Zev2niJ39DB"); // Replace with your Public Key

const Home = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [mounted, setMounted] = useState(false);
  const { toast } = useToast();
  const [isSending, setIsSending] = useState(false);
  const aboutSectionRef = useRef<HTMLDivElement>(null);
  const aboutHeadingRef = useRef<HTMLHeadingElement>(null);
  const aboutBoxRef = useRef<HTMLDivElement>(null);

  // Mock data for projects
  const projects = [
    {
      id: "1",
      title: "EduConnect Platform",
      description:
        "A role-based web app for managing courses, students, and communication in an academic setting.",
      images: ["/Educonnect.JPG"],
      technologies: ["HTML", "CSS", "JavaScript", "Firebase"],
      fullDescription:
        "EduConnect is a role-based education platform that lets teachers manage courses, post announcements, share files, and chat with students in real-time. Built with Firebase for authentication, Firestore for data storage, and responsive UI for a smooth user experience.",
      features: [
        "Quiz Builder: Timed, auto-graded quizzes",
        "Announcements: Real-time updates",
        "Assignment Uploads: Submit by course",
        "File Repository: Centralized materials",
        "Progress Dashboard: Track scores & tasks",
        "Course Chat: Group messaging"
      ],
      demoUrl: "https://educonnect-f70d6.web.app",
      repoUrl: "https://github.com/reinieltalplacido/Educonnect"
    },
    {
      id: "2",
      title: "ASUS Login/Signup UI",
      description:
        "A clean and modern login/signup interface designed in Figma for ASUS branding.",
      images: ["/iPhone 15 Pro.jpg"],
      technologies: ["Figma", "UI/UX Design"],
      fullDescription:
        "Designed a minimalistic and user-friendly login and signup interface tailored for ASUS, using Figma. The design emphasizes brand consistency, simplicity, and usability with clean forms, intuitive layout, and mobile responsiveness.",
      demoUrl: "https://example.com/asus-login-demo",
      repoUrl: "https://github.com/username/asus-login-ui",
      features: [
        "Modern ASUS branding",
        "Minimalist login/signup forms",
        "Mobile-responsive layout",
        "Consistent color palette",
        "Intuitive user flow",
        "Designed in Figma"
      ]
    },
    {
      id: "3",
      title: "DevHub",
      description: "🚀 DevHub – Personal Space for Developers\nDevHub is a personal productivity hub built by a developer, for developers. It helps you stay focused by keeping your projects, tasks, notes, and favorite tools in one clean and simple space.",
      images: ["/devhub.jpg", "/dashbord devhub.jpg"],
      technologies: ["React", "TypeScript", "Tailwind CSS", "shadcn/ui", "Vite"],
      fullDescription: "DevHub is a personal productivity and collaboration space built for developers, by a developer. It's designed to help manage your learning, tasks, and projects all in one place—clean, focused, and fast.",
      features: [
        "Project tracking dashboard",
        "Personal dev notes section",
        "To-do list for task management",
        "Quick-access tools panel",
        "Clean and minimal UI",
        "Organized dev workflow"
      ],
      demoUrl: "https://devhub-gules.vercel.app",
      repoUrl: "https://github.com/reinieltalplacido/devhub-personal-space"
    },
    {
      id: "4",
      title: "DevKits",
      description: "🎨 DevKits – Personal UI System\nA collection of reusable components and design patterns built with Next.js, TypeScript, and Tailwind CSS. It's still a work in progress, constantly evolving as I build new projects.",
      images: ["/Devkits.jpg"],
      technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
      fullDescription: "DevKits is my personal UI system and component library built using Next.js, Tailwind CSS, and TypeScript. It's under active development and meant to streamline my design workflow and speed up frontend development. Every component is handcrafted for consistency, minimalism, and reusability.",
      features: [
        "Reusable UI components",
        "Minimalist and clean design",
        "Tailwind-powered styling",
        "TypeScript support for type safety",
        "Easy to integrate into any project",
        "Built with Next.js App Router",
        "Still under construction — more components coming soon!"
      ]
    }
  ];

  useEffect(() => {
    setMounted(true);
    // Set initial theme based on system preference
    if (typeof window !== "undefined") {
      const systemPrefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setIsDarkMode(systemPrefersDark);
      document.documentElement.classList.toggle("dark", systemPrefersDark);
    }
    // Inject Vercel Analytics
    inject();

    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
    // About Me and Experience section animation (single style)
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
    // Initialize ScrollSmoother
    if (typeof window !== "undefined" && document.getElementById("smooth-wrapper")) {
      ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.2,
        effects: true,
      });
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    // Toggle the dark class on the document element
    document.documentElement.classList.toggle("dark");
  };

  // Avoid hydration mismatch
  if (!mounted) return null;

  return (
    <>
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
            {/* Header */}
            <header className="container mx-auto px-4">
              <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
            </header>
            {/* Main Content */}
            <main className="container mx-auto px-4 py-8">
              {/* Hero Section */}
              <div className="animate-fade-in" autoFocus>
                <Hero />
              </div>

              {/* Experience Section */}
              <Experience />

              {/* Projects Section */}
              <ProjectShowcase projects={projects} isDarkMode={isDarkMode} />

             

              <section id="terminal" className="mb-16 max-w-3xl mx-auto">
                <h2 className="text-2xl font-bold mb-6">Interactive Terminal</h2>
                <div className="rounded-lg overflow-hidden shadow-lg">
                  <Terminal isDarkMode={isDarkMode} projects={projects} />
                </div>
                <p className="text-sm text-center mt-2 text-muted-foreground">
                  Try typing 'help' in the terminal. 
                </p>
              </section>

              {/* Contact Section */}
              {/* Removed contact section */}
            </main>
            {/* Footer */}

          </div>
          <Toaster />
        </div>
      </div>
    </>
  );
};

export default Home;
