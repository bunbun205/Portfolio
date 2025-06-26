import { useState } from "react";
import { Heart, X } from "react-feather";
import type { Project } from "../../utils/interfaces";
import { mockProjects } from "../../utils/mockProjects";
import ProjectPopup from "./ProjectPopup";

interface Props {
  category: string;
}

export default function CategoryLayout({ category }: Props) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [liked, setLiked] = useState<Record<string, boolean>>({});

  // Filter by category
  const projects: Project[] = mockProjects.filter(
    (p) => p.category.toLowerCase() === category.toLowerCase()
  );

  const toggleLike = (id: string) => {
    setLiked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="p-4">
      <h2 className="text-2xl font-bold mb-6">{category}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="relative group cursor-pointer border rounded overflow-hidden shadow hover:shadow-lg transition"
            onClick={() => setSelectedProject(project)}
          >
            <img
              src={project.thumbnail_url || project.assets?.[0]}
              alt={project.title}
              className="w-full h-48 object-cover"
            />

            <div className="p-2">
              <p className="font-semibold text-sm">{project.title}</p>
              <button
                className="absolute top-2 right-2 z-10 bg-white/80 rounded-full p-1 hover:scale-110 transition"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleLike(project.id);
                }}
              >
                <Heart
                  size={18}
                  fill={liked[project.id] ? "red" : "none"}
                  color={liked[project.id] ? "red" : "black"}
                />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Popup */}
      {selectedProject && (
        <ProjectPopup
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
