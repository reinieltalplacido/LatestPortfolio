import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { ExternalLink, Github, ChevronDown, ChevronUp } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  thumbnail: string;
  technologies: string[];
  fullDescription?: string;
  liveLink?: string;
  repoLink?: string;
  challenges?: string;
}

const ProjectCard = ({
  title = "Project Title",
  description = "A brief description of the project showcasing its key features and purpose.",
  thumbnail = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
  technologies = ["React", "TypeScript", "Tailwind CSS"],
  fullDescription = "This is a detailed description of the project that explains what it does, why it was built, and what problems it solves. It provides more context about the project's purpose and implementation details.",
  liveLink = "https://example.com",
  repoLink = "https://github.com/username/repo",
  challenges = "Some of the challenges faced during development included implementing responsive design, optimizing performance, and integrating with third-party APIs.",
}: ProjectCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full bg-background"
    >
      <Card className="overflow-hidden h-full flex flex-col border-2 hover:border-primary/50 transition-all duration-300">
        <div className="relative overflow-hidden">
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>

        <CardHeader>
          <CardTitle className="text-xl font-bold">{title}</CardTitle>
          <CardDescription className="line-clamp-2">
            {description}
          </CardDescription>
        </CardHeader>

        <CardContent className="flex-grow">
          <div className="flex flex-wrap gap-2 mb-4">
            {technologies.map((tech, index) => (
              <Badge key={index} variant="secondary">
                {tech}
              </Badge>
            ))}
          </div>

          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div>
                <h4 className="font-medium text-sm mb-1">Description</h4>
                <p className="text-sm text-muted-foreground">
                  {fullDescription}
                </p>
              </div>

              <div>
                <h4 className="font-medium text-sm mb-1">Challenges</h4>
                <p className="text-sm text-muted-foreground">{challenges}</p>
              </div>
            </motion.div>
          )}
        </CardContent>

        <CardFooter className="flex flex-col sm:flex-row gap-2 pt-2 border-t">
          <div className="flex gap-2">
            {liveLink && (
              <Button variant="outline" size="sm" asChild>
                <a href={liveLink} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Live Demo
                </a>
              </Button>
            )}

            {repoLink && (
              <Button variant="outline" size="sm" asChild>
                <a href={repoLink} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  Code
                </a>
              </Button>
            )}
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={toggleExpand}
            className="ml-auto"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="mr-2 h-4 w-4" />
                Less
              </>
            ) : (
              <>
                <ChevronDown className="mr-2 h-4 w-4" />
                More
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ProjectCard;
