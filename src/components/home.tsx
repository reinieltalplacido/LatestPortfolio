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

emailjs.init("3uTEW4Zev2niJ39DB"); // Replace with your Public Key

const Home = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [mounted, setMounted] = useState(false);
  const { toast } = useToast();
  const [isSending, setIsSending] = useState(false);

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
      title: "Event Countdown Timer",
      description: "Track upcoming events with a live countdown and notifications.",
      images: ["/CountdownTimer.JPG"],
      technologies: ["React", "JavaScript", "CSS"],
      fullDescription:
        "Developed an event countdown timer that lets users add custom events, shows live time remaining, and sends notifications as deadlines approach. Clean, responsive UI makes it easy to manage multiple events across devices.",
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

          {/* Terminal Section */}
          <section id="about" className="mb-16 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">About Me</h2>
            <div className="p-6 rounded-lg bg-card">
              <p className="mb-4">
                I'm a 3rd-year IT student from NEUST focused on front-end development while actively learning the backend to grow as a full-stack developer. I build clean, responsive websites and turn ideas into functional, user-friendly experiences through code and continuous practice.
              </p>
            </div>
          </section>

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
          <section id="contact" className="mb-16 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Reach me</h2>
            <div className="p-6 rounded-lg bg-card">
            <p className="mb-6">
  Whether it's building something awesome or just exchanging ideas—I'm always down to connect. Drop me a message anytime!
</p>


              <form
                className="space-y-4 mb-6"
                onSubmit={(e) => {
                  e.preventDefault();
                  setIsSending(true);

                  emailjs.sendForm('service_c8bzc5c', 'template_c0gy0v5', e.target as HTMLFormElement, '3uTEW4Zev2niJ39DB') // Replace with your Service ID, Template ID, and Public Key
                    .then((result) => {
                      console.log(result.text);
                      toast({
                        title: "Message Sent!",
                        description: "Your message has been sent successfully.",
                      });
                      // Reset form
                      const form = e.target as HTMLFormElement;
                      form.reset();
                      setIsSending(false);
                    }, (error) => {
                      console.log(error.text);
                      toast({
                        title: "Error",
                        description: "Failed to send message. Please try again later.",
                        variant: "destructive",
                      });
                      setIsSending(false);
                    });
                }}
              >
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full p-2 border border-border rounded-md text-foreground"
                      
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full p-2 border border-border rounded-md text-foreground"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    className="w-full p-2 border border-border rounded-md text-foreground"
                    
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    className="w-full p-2 border border-border rounded-md resize-none text-foreground"
                    
                  ></textarea>
                </div>
                <div className="flex justify-center">
                  <Button type="submit" className="w-full sm:w-auto" disabled={isSending}>
                    {isSending ? "Sending..." : "Send Message"}
                  </Button>
                </div>
              </form>

            
            </div>
          </section>
        </main>
        {/* Footer */}

      </div>
      <Toaster />
    </>
  );
};

export default Home;
