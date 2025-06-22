import React, { useState, useEffect } from "react";
import { FaReact, FaNodeJs, FaBootstrap, FaPencilRuler, FaRocket, FaFolderOpen } from "react-icons/fa";
import { SiMongodb, SiTypescript, SiTailwindcss, SiJavascript, SiCss3, SiFigma, SiHtml5, SiFirebase } from "react-icons/si";

interface Project {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
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
    <div
      className="rounded-xl border bg-card text-card-foreground shadow transition-all duration-300 flex flex-col h-full cursor-pointer hover:scale-[1.02]"
      onClick={() => onImageClick(project)}
    >
      <div className="relative overflow-hidden rounded-t-xl bg-white">
        <img
          src={project.thumbnail}
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
    </div>
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

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (previewProject) {
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

      {previewProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm transition-opacity duration-300 animate-fadeIn"
          onClick={closePreview}
          aria-modal="true"
          role="dialog"
        >
          <div
            className="relative w-full max-w-4xl md:max-w-4xl max-h-[90vh] bg-[#181c2a] text-white rounded-2xl shadow-2xl border border-neutral-800 mx-2 sm:mx-auto transition-all duration-300 transform animate-scaleIn flex flex-col"
            onClick={(e) => e.stopPropagation()}
            tabIndex={-1}
          >
            {/* Close Button - moved outside image container for better alignment */}
            <button
              className="absolute top-2 right-2 w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-xl sm:text-2xl text-white bg-black bg-opacity-40 rounded-full hover:bg-opacity-70 transition leading-none p-0 z-10"
              onClick={closePreview}
              aria-label="Close"
            >
              <span className="flex items-center justify-center w-full h-full">&times;</span>
            </button>
            {/* Image */}
            <div className="w-full bg-[#23263a] flex items-center justify-center rounded-t-2xl overflow-hidden p-0 m-0 flex-shrink-0">
              <img
                src={previewProject.thumbnail}
                alt={previewProject.title}
                className="object-cover w-full h-40 sm:h-56 md:h-64 max-h-64"
                style={{ borderTopLeftRadius: '1rem', borderTopRightRadius: '1rem' }}
                loading="lazy"
              />
            </div>
            {/* Content */}
            <div className="p-4 sm:p-8 pb-4 sm:pb-6 flex flex-col gap-3 sm:gap-4 flex-1 overflow-y-auto custom-scrollbar">
              <h2 className="text-2xl sm:text-3xl font-bold mb-1">{previewProject.title}</h2>
              <p className="text-base sm:text-lg text-gray-300 mb-2">{previewProject.description}</p>
              <p className="text-gray-400 mb-3 sm:mb-4 text-sm sm:text-base">{previewProject.fullDescription}</p>
              {previewProject.features && (
                <div className="mb-4">
                  <h3 className="font-semibold text-base sm:text-lg mb-3">Key Features</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {previewProject.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 bg-[#23263a] rounded-lg px-4 py-3">
                        <span className="text-indigo-400">
                          <svg xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 20 20' className='w-5 h-5'><path fillRule='evenodd' d='M16.704 6.29a1 1 0 0 1 .006 1.414l-6.002 6.06a1 1 0 0 1-1.414.006l-3.002-2.96a1 1 0 1 1 1.408-1.42l2.294 2.263 5.295-5.345a1 1 0 0 1 1.415-.018z' clipRule='evenodd'/></svg>
                        </span>
                        <span className="text-sm text-white">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div>
                <h3 className="font-semibold text-base sm:text-lg mb-2">Technologies</h3>
                <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
                  {previewProject.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md flex items-center gap-1 border border-primary/20"
                    >
                      {techIcons[tech] || null}{tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex gap-3 sm:gap-4 mt-2">
                {previewProject.demoUrl && (
                  <a
                    href={previewProject.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold shadow hover:from-indigo-600 hover:to-purple-600 transition text-sm border-none outline-none"
                  >
                    <FaRocket className="text-base" />
                    View Live Demo
                  </a>
                )}
                {previewProject.repoUrl && (
                  <a
                    href={previewProject.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-400 text-indigo-400 font-semibold hover:bg-indigo-400 hover:text-white transition text-sm bg-transparent"
                  >
                    <FaFolderOpen className="text-base" />
                    View Source Code
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

const defaultProjects: Project[] = [
  {
    id: "1",
    title: "E-Commerce Platform",
    description:
      "A full-featured online shopping platform with cart and payment integration.",
    thumbnail:
      "/Educonnect.JPG",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    fullDescription:
      "Built a complete e-commerce solution with user authentication, product catalog, shopping cart, and secure payment processing using Stripe. Implemented responsive design for optimal mobile experience and admin dashboard for inventory management.",
    features: [
      "Role-based access control (Teachers/Students)",
      "Real-time messaging and announcements",
      "Course management and file sharing",
      "Secure Firebase authentication",
      "Cloud-based data storage with Firestore",
      "Mobile-responsive design"
    ]
  },
  {
    id: "2",
    title: "Task Management App",
    description:
      "A productivity app for organizing tasks with drag-and-drop functionality.",
    thumbnail:
      "/PINAKA HOME PAGE NG PUMA.png",
    technologies: ["React", "TypeScript", "Firebase", "Tailwind CSS"],
    fullDescription:
      "Developed a task management application featuring drag-and-drop task organization, priority levels, due dates, and real-time synchronization across devices. Implemented user authentication and data persistence with Firebase.",
    demoUrl: "https://example.com/taskapp-demo",
    repoUrl: "https://github.com/username/task-management-app",
  },
  {
    id: "3",
    title: "DevHub",
    description: "🚀 DevHub – Personal Space for Developers\nDevHub is a personal productivity hub built by a developer, for developers. It helps you stay focused by keeping your projects, tasks, notes, and favorite tools in one clean and simple space.",
    thumbnail: "/Devhub.JPG",
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
    title: "Countdown Timer",
    description: "A customizable countdown timer for events.",
    thumbnail: "/CountdownTimer.JPG",
    technologies: ["React", "JavaScript", "CSS"],
    fullDescription: "Built a countdown timer with adjustable time, alerts, and a clean UI. Perfect for tracking deadlines or events.",
  },
  {
    id: "5",
    title: "Fitness Tracker",
    description:
      "Mobile app for tracking workouts and nutrition with progress visualization.",
    thumbnail:
      "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&q=80",
    technologies: ["React Native", "Redux", "Node.js", "MongoDB"],
    fullDescription:
      "Developed a mobile fitness application that allows users to track workouts, set goals, monitor nutrition, and visualize progress over time. Implemented features like custom workout plans, calorie tracking, and achievement badges.",
    demoUrl: "https://example.com/fitness-demo",
    repoUrl: "https://github.com/username/fitness-tracker",
  },
  {
    id: "6",
    title: "AI Image Generator",
    description:
      "Web app that generates unique images using machine learning algorithms.",
    thumbnail:
      "https://images.unsplash.com/photo-1561736778-92e52a7769ef?w=800&q=80",
    technologies: ["Python", "TensorFlow", "Flask", "React"],
    fullDescription:
      "Created a web application that generates unique images using machine learning algorithms. Users can adjust parameters to influence the style and content of generated images. Implemented with a Python/Flask backend using TensorFlow and a React frontend.",
    demoUrl: "https://example.com/ai-image-demo",
    repoUrl: "https://github.com/username/ai-image-generator",
  },
  {
    id: "7",
    title: "ASUS Login/Signup UI",
    description: "A clean and modern login/signup interface designed in Figma for ASUS branding.",
    thumbnail: "/EHYYYY.jpg",
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
