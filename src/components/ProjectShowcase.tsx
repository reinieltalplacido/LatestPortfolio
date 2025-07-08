import React, { useState, useEffect } from "react";
import { FaReact, FaNodeJs, FaBootstrap, FaPencilRuler, FaRocket, FaFolderOpen } from "react-icons/fa";
import { SiMongodb, SiTypescript, SiTailwindcss, SiJavascript, SiCss3, SiFigma, SiHtml5, SiFirebase } from "react-icons/si";
import { motion, AnimatePresence } from "framer-motion";

interface Project {
  id: string;
  title: string;
  description: string;
  images: string[];
  technologies: string[];
  fullDescription: string;
  demoUrl?: string;
  repoUrl?: string;
  features?: string[];
}

interface ProjectCardProps {
  project: Project;
  onImageClick: (project: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = React.memo(({ project, onImageClick }) => {
  const techIcons: Record<string, JSX.Element> = {
    HTML: <SiHtml5 color="#E34F26" className="inline mr-1" />,
    CSS: <SiCss3 color="#1572B6" className="inline mr-1" />,
    JavaScript: <SiJavascript color="#F7DF1E" className="inline mr-1" />,
    React: <FaReact color="#61DAFB" className="inline mr-1" />,
    "Node.js": <FaNodeJs color="#339933" className="inline mr-1" />,
    MongoDB: <SiMongodb color="#47A248" className="inline mr-1" />,
    TypeScript: <SiTypescript color="#3178C6" className="inline mr-1" />,
    "Tailwind CSS": <SiTailwindcss color="#06B6D4" className="inline mr-1" />,
    Bootstrap: <FaBootstrap color="#7952B3" className="inline mr-1" />,
    Figma: <SiFigma color="#F24E1E" className="inline mr-1" />,
    Firebase: <SiFirebase color="#FFCA28" className="inline mr-1" />,
    "UI/UX Design": <FaPencilRuler color="#6366F1" className="inline mr-1" />,
  };

  return (
    <motion.div
      whileHover={{ scale: 1.035, y: -6, boxShadow: '0 8px 32px 0 rgba(80,80,180,0.10), 0 1.5px 8px 0 rgba(80,80,180,0.08)' }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-xl border bg-card text-card-foreground shadow transition-all duration-300 flex flex-col h-full cursor-pointer"
      onClick={() => onImageClick(project)}
    >
      <div className="relative overflow-hidden rounded-t-xl bg-card">
        <img
          src={project.images?.[0] || ''}
          alt={project.title}
          className="w-full h-40 object-contain transition-transform duration-300"
          loading="lazy"
        />
      </div>
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
        <p className="text-muted-foreground mb-4">{project.description}</p>
        <div className="mt-auto pt-4">
          <h4 className="font-semibold mb-2">Technologies</h4>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md flex items-center gap-1"
              >
                {techIcons[tech] || null}{tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
});

interface ProjectShowcaseProps {
  projects?: Project[];
  isDarkMode: boolean;
}

const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({
  projects = defaultProjects,
  isDarkMode,
}) => {
  const [previewProject, setPreviewProject] = useState<Project | null>(null);
  const [currentImageIdx, setCurrentImageIdx] = useState(0);

  useEffect(() => {
    if (previewProject) {
      setCurrentImageIdx(0);
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [previewProject]);

  const handleCardClick = (project: Project) => {
    setPreviewProject(project);
  };

  const closePreview = () => {
    setPreviewProject(null);
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIdx((idx) =>
      previewProject && idx > 0 ? idx - 1 : (previewProject?.images.length || 1) - 1
    );
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIdx((idx) =>
      previewProject && idx < (previewProject.images.length - 1) ? idx + 1 : 0
    );
  };

  const techIcons: Record<string, JSX.Element> = {
    HTML: <SiHtml5 color="#E34F26" className="inline mr-1" />,
    CSS: <SiCss3 color="#1572B6" className="inline mr-1" />,
    JavaScript: <SiJavascript color="#F7DF1E" className="inline mr-1" />,
    React: <FaReact color="#61DAFB" className="inline mr-1" />,
    "Node.js": <FaNodeJs color="#339933" className="inline mr-1" />,
    MongoDB: <SiMongodb color="#47A248" className="inline mr-1" />,
    TypeScript: <SiTypescript color="#3178C6" className="inline mr-1" />,
    "Tailwind CSS": <SiTailwindcss color="#06B6D4" className="inline mr-1" />,
    Bootstrap: <FaBootstrap color="#7952B3" className="inline mr-1" />,
    Figma: <SiFigma color="#F24E1E" className="inline mr-1" />,
    Firebase: <SiFirebase color="#FFCA28" className="inline mr-1" />,
    "UI/UX Design": <FaPencilRuler color="#6366F1" className="inline mr-1" />,
  };

  return (
    <section id="projects" className="w-full py-12 bg-background">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onImageClick={handleCardClick}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {previewProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-sm p-4 sm:p-6"
            onClick={closePreview}
            aria-modal="true"
            role="dialog"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="relative w-full max-w-[95vw] sm:max-w-5xl max-h-[90vh] sm:max-h-[85vh] bg-card text-card-foreground rounded-xl sm:rounded-2xl shadow-2xl border border-border mx-auto flex flex-col overflow-hidden"
              onClick={(e) => e.stopPropagation()}
              tabIndex={-1}
            >
              <button
                className="absolute top-2 right-2 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-lg sm:text-2xl text-card-foreground bg-muted bg-opacity-40 rounded-full hover:bg-opacity-70 transition leading-none p-0 z-10"
                onClick={closePreview}
                aria-label="Close"
              >
                <span className="flex items-center justify-center w-full h-full">&times;</span>
              </button>
              <div className="w-full bg-muted flex items-center justify-center overflow-hidden p-0 m-0 flex-shrink-0 relative">
                {previewProject.images && previewProject.images.length > 1 && (
                  <>
                    <button
                      className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 bg-muted bg-opacity-40 hover:bg-opacity-70 text-card-foreground rounded-full w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center z-10"
                      onClick={handlePrevImage}
                      aria-label="Previous image"
                    >
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
                    </button>
                    <button
                      className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 bg-muted bg-opacity-40 hover:bg-opacity-70 text-card-foreground rounded-full w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center z-10"
                      onClick={handleNextImage}
                      aria-label="Next image"
                    >
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
                    </button>
                  </>
                )}
                <img
                  src={previewProject.images?.[currentImageIdx] || ''}
                  alt={previewProject.title}
                  className="object-contain w-full h-48 sm:h-72 md:h-96 lg:h-[28rem] max-h-[28rem] bg-card mx-auto"
                  style={{ maxWidth: '100%' }}
                  loading="lazy"
                />
              </div>
              <div className="p-3 sm:p-6 md:p-8 pb-3 sm:pb-6 flex flex-col gap-2 sm:gap-3 md:gap-4 flex-1 overflow-y-auto custom-scrollbar">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1">{previewProject.title}</h2>
                <p className="text-sm sm:text-base md:text-lg text-foreground mb-1 sm:mb-2">{previewProject.description}</p>
                <p className="text-xs sm:text-sm md:text-base text-muted-foreground mb-2 sm:mb-3 md:mb-4">{previewProject.fullDescription}</p>
                {previewProject.features && (
                  <div className="mb-2 sm:mb-4">
                    <h3 className="font-semibold text-sm sm:text-base md:text-lg mb-2 sm:mb-3">Key Features</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                      {previewProject.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 bg-card rounded-lg px-3 sm:px-4 py-2 sm:py-3">
                          <span className="text-indigo-400">
                            <svg xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 20 20' className='w-4 h-4 sm:w-5 sm:h-5'><path fillRule='evenodd' d='M16.704 6.29a1 1 0 0 1 .006 1.414l-6.002 6.06a1 1 0 0 1-1.414.006l-3.002-2.96a1 1 0 1 1 1.408-1.42l2.294 2.263 5.295-5.345a1 1 0 0 1 1.415-.018z' clipRule='evenodd'/></svg>
                          </span>
                          <span className="text-xs sm:text-sm text-card-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <div className="flex flex-wrap gap-2 sm:gap-3 mt-1 sm:mt-2">
                  {previewProject.demoUrl && (
                    <a
                      href={previewProject.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold shadow hover:from-indigo-600 hover:to-purple-600 transition text-xs sm:text-sm border-none outline-none"
                    >
                      <FaRocket className="text-xs sm:text-base" />
                      View Live Demo
                    </a>
                  )}
                  {previewProject.repoUrl && (
                    <a
                      href={previewProject.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border border-indigo-400 text-indigo-400 font-semibold hover:bg-indigo-400 hover:text-white transition text-xs sm:text-sm bg-transparent"
                    >
                      <FaFolderOpen className="text-xs sm:text-base" />
                      View Source Code
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const defaultProjects: Project[] = [
  {
    id: "1",
    title: "E-Commerce Platform",
    description:
      "A full-featured online shopping platform with cart and payment integration.",
    images: [
      "/Educonnect.JPG"
    ],
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    fullDescription:
      "Built a complete e-commerce solution with user authentication, product catalog, shopping cart, and secure payment processing using Stripe. Implemented responsive design for optimal mobile experience and admin dashboard for inventory management.",
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
    title: "DevHub",
    description: "🚀 DevHub – Personal Space for Developers\nDevHub is a personal productivity hub built by a developer, for developers. It helps you stay focused by keeping your projects, tasks, notes, and favorite tools in one clean and simple space.",
    images: [
      "/devhub.jpg",
      "/dashbord devhub.jpg"
    ],
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
    id: "3",
    title: "Countdown Timer",
    description: "A customizable countdown timer for events.",
    images: [
      "/CountdownTimer.JPG"
    ],
    technologies: ["React", "JavaScript", "CSS"],
    fullDescription: "Built a countdown timer with adjustable time, alerts, and a clean UI. Perfect for tracking deadlines or events.",
  },
  {
    id: "4",
    title: "ASUS Login/Signup UI",
    description: "A clean and modern login/signup interface designed in Figma for ASUS branding.",
    images: [
      "/EHYYYY.jpg"
    ],
    technologies: ["Figma", "UI/UX Design"],
    fullDescription: "Designed a minimalistic and user-friendly login and signup interface tailored for ASUS, using Figma. The design emphasizes brand consistency, simplicity, and usability with clean forms, intuitive layout, and mobile responsiveness.",
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
];

export default ProjectShowcase;
export type { Project };
