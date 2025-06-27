import { useState, useMemo } from "react";
import { Heart } from "react-feather";
import type { Project } from "../../utils/interfaces";
import ProjectPopup from "./ProjectPopup";

const R2_URL = "https://pub-925169039ca2466a9fccafe6acd0d070.r2.dev";

interface Props {
  slug: string;
  projects: Project[];
}

export default function CategoryLayout({ slug, projects }: Props) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [liked, setLiked] = useState<Record<string, boolean>>({});

  // Map slug to display label
  const category = useMemo(() => {
    const map: Record<string, string> = {
      "3dassets": "3D Assets",
      "characters": "Characters",
      "environments": "Environments",
      "conceptart": "Concept Art",
      "gamedesign": "Game Design",
      "gamedevelopment": "Game Development",
    };
    return map[slug] || "Unknown Category";
  }, [slug]);

  // Filter projects
  const filteredProjects = useMemo(
    () =>
      projects.filter(
        (p) =>
          p.category.toLowerCase().replace(/\s+/g, "") === slug
      ),
    [projects, slug]
  );

  const toggleLike = (id: string) => {
    setLiked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="p-4">
      <h2 className="text-2xl font-bold mb-6">{category}</h2>

      {filteredProjects.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          No projects to display.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="relative group cursor-pointer border rounded overflow-hidden shadow hover:shadow-lg transition"
              onClick={() => setSelectedProject(project)}
            >
              <img
                src={`${R2_URL}/${project.thumbnail_url}`}
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
      )}

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
