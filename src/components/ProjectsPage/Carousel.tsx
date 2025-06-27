import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Project } from "../../utils/interfaces";
import ProjectPopup from "./ProjectPopup";

const R2_URL = "https://pub-925169039ca2466a9fccafe6acd0d070.r2.dev";

interface Props {
  projects: Project[];
}

export default function Carousel({ projects }: Props) {
  const [current, setCurrent] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = projects
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )
    .slice(0, 5);

  const total = filteredProjects.length;

  const next = () =>
    setCurrent((prev) => (prev + 1) % total);

  const prev = () =>
    setCurrent((prev) => (prev - 1 + total) % total);

  useEffect(() => {
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [total]);

  if (total === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        No projects to display.
      </div>
    );
  }

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      className="mb-4 relative w-full max-w-4xl mx-auto h-[400px] overflow-hidden rounded-3xl"
    >
      <AnimatePresence>
        {filteredProjects.map((project, index) =>
          index === current ? (
            <motion.div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute w-full h-full cursor-pointer"
            >
              <img
                src={`${R2_URL}/${project.thumbnail_url}`}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4 text-white text-lg font-semibold">
                {project.title}
              </div>
            </motion.div>
          ) : null
        )}
      </AnimatePresence>

      <button
        onClick={prev}
        className="absolute left-2 top-1/2 -translate-y-1/2 text-white text-3xl z-10"
      >
        ‹
      </button>
      <button
        onClick={next}
        className="absolute right-2 top-1/2 -translate-y-1/2 text-white text-3xl z-10"
      >
        ›
      </button>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {filteredProjects.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full ${
              current === index ? "bg-white" : "bg-gray-400/50"
            }`}
          />
        ))}
      </div>

      {selectedProject && (
        <ProjectPopup
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </motion.div>
  );
}
