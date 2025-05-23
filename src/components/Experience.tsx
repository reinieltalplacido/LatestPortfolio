import React from "react";
import { Card, CardContent } from "./ui/card";
import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

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

  return (
    <section className="py-12 w-full max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Experience</h2>

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
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center text-muted-foreground mt-12 space-y-4"
        >
          <AlertTriangle className="w-10 h-10 text-yellow-400" />
          <h3 className="text-lg font-semibold">404 - Experience Not Found</h3>
          <p className="max-w-md">
            Looks like I'm just getting started — and that's totally fine!{" "}
            <br />
            Every pro was once a beginner.
          </p>
        </motion.div>
      )}
    </section>
  );
};

export default Experience;
