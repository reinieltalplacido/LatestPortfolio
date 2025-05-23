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
      thumbnail: "/Educonnect.JPG",
      technologies: ["HTML", "CSS", "JavaScript", "Firebase"],
      fullDescription:
        "EduConnect is a role-based education platform that lets teachers manage courses, post announcements, share files, and chat with students in real-time. Built with Firebase for authentication, Firestore for data storage, and responsive UI for a smooth user experience.",
    },
    {
      id: "2",
      title: "ASUS Login/Signup UI",
      description:
        "A clean and modern login/signup interface designed in Figma for ASUS branding.",
      thumbnail: "/iPhone 15 Pro.jpg",
      technologies: ["Figma", "UI/UX Design"],
      fullDescription:
        "Designed a minimalistic and user-friendly login and signup interface tailored for ASUS, using Figma. The design emphasizes brand consistency, simplicity, and usability with clean forms, intuitive layout, and mobile responsiveness.",
    },
    // ... existing code ...
    {
      id: "3",
      title: "Documents to Quiz",
      description: "Turn documents into interactive quizzes for practice and review.",
      thumbnail: "/Quiz.JPG",
      technologies: ["React", "JavaScript", "Tailwind CSS"],
      fullDescription:
        "Built a web app that converts documents into customizable quizzes for studying and self-assessment. Supports various question types, real-time feedback, and responsive design for seamless use on any device. Ideal for reviewing notes and enhancing retention.",
    },
    
    {
      id: "4",
      title: "Event Countdown Timer",
      description: "Track upcoming events with a live countdown and notifications.",
      thumbnail: "/CountdownTimer.JPG",
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
            <div className="p-6 rounded-lg bg-card shadow-lg">
              <p className="mb-4">
                Hi there! I'm a 3rd-year IT student from NEUST focused on
                front-end web development and UI design. I enjoy building
                responsive, user-friendly websites using React, Tailwind CSS, and
                modern JavaScript tools.
              </p>
              <p className="mb-4">
                My journey into tech began when I discovered how exciting it was
                to design in Figma and bring those ideas to life through code.
                Since then, I've been working on school projects, practicing on my
                own, and sharpening my skills one build at a time.
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
              Try typing 'help', 'view projects', or 'goto about' in the terminal
            </p>
          </section>

          {/* Contact Section */}
          <section id="contact" className="mb-16 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Reach me</h2>
            <div className="p-6 rounded-lg bg-card shadow-lg">
              <p className="mb-6">
                I'm always open to new opportunities and collaborations. Feel free
                to reach out!
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
