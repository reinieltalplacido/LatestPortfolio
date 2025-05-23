import React, { useState } from "react";
import { FaReact, FaNodeJs, FaBootstrap, FaPencilRuler } from "react-icons/fa";
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
}

interface ProjectCardProps {
  project: Project;
  onImageClick: (thumbnailUrl: string) => void;
}

// Inline ProjectCard component since there seems to be an issue with the import
const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onImageClick,
}) => {
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
      className="rounded-xl border bg-card text-card-foreground shadow transition-all duration-300 flex flex-col h-full"
    >
      <div className="relative overflow-hidden rounded-t-xl bg-white cursor-pointer" onClick={() => onImageClick(project.thumbnail)}>
        <img
          src={project.thumbnail}
          alt={project.title}
          className="w-full h-40 object-contain transition-transform duration-300 hover:scale-110 "
        />
      </div>
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
        <p className="text-muted-foreground mb-4">{project.description}</p>
        <p className="text-muted-foreground">{project.fullDescription}</p>
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
};

interface ProjectShowcaseProps {
  projects?: Project[];
  isDarkMode: boolean;
}

const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({
  projects = defaultProjects,
  isDarkMode,
}) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleImageClick = (thumbnailUrl: string) => {
    setPreviewImage(thumbnailUrl);
  };

  const closePreview = () => {
    setPreviewImage(null);
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
              onImageClick={handleImageClick}
            />
          ))}
        </div>
      </div>

      {previewImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
          onClick={closePreview}
        >
          <div
            className="relative max-w-screen-lg max-h-screen-lg rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={previewImage}
              alt="Project Preview"
              className="w-full h-full object-contain"
            />
            <button
              className="absolute top-2 right-2 text-gray-800 text-2xl bg-white bg-opacity-75 rounded-full p-1"
              onClick={closePreview}
            >
              &times;
            </button>
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
    title: "Quiz",
    description: "A web-based quiz application.",
    thumbnail: "/Quiz.JPG",
    technologies: ["React", "TypeScript", "Tailwind CSS"],
    fullDescription: "Developed a quiz app with multiple question types, scoring, and instant feedback. Responsive design for all devices.",
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
];

export default ProjectShowcase;
export type { Project };
