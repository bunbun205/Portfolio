import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "react-feather";
import { motion } from "framer-motion";
import type { Project } from "../../utils/interfaces";
import ProjectPopup from "./ProjectPopup";

const WORKER_URL = "https://portfolio-backend.mayank69123-5d3.workers.dev";
const API_KEY =
  "5fb10b5369a1a45689f95d6aa1fa97df8e5b59925101f93e6e4b790ec0c6782a";
const R2_URL = "https://pub-925169039ca2466a9fccafe6acd0d070.r2.dev";

interface Props {
  category: string;
  delay: number;
  projects: Project[];
}

export default function CategorySection({ category, delay, projects }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  const scrollByAmount = (amount: number) => {
    scrollRef.current?.scrollBy({ left: amount, behavior: "smooth" });
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (!el) return;

    el.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);

    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  // Construct slug from category
  const slug = category.toLowerCase().replace(/\s+/g, "");

  // Filter, sort, and slice
  const filteredProjects = projects
    .filter((p) => p.category === category)
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )
    .slice(0, 5);

  return (
    <motion.section
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, delay: delay, ease: "easeOut" }}
      className="p-6 relative w-full"
    >
      <div className="flex justify-between items-center mb-3 px-1">
        <h2 className="text-xl font-semibold">{category}</h2>
        <a href={`/projects/${slug}`} className="text-blue-500 hover:underline">
          View All
        </a>
      </div>

      {filteredProjects.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          No projects to display.
        </div>
      ) : (
        <>
          {canScrollLeft && (
            <button
              onClick={() => scrollByAmount(-260)}
              className="absolute left-0 top-1/2 translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-1 rounded-full"
            >
              <ChevronLeft size={24} />
            </button>
          )}

          {canScrollRight && (
            <button
              onClick={() => scrollByAmount(260)}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-1 rounded-full"
            >
              <ChevronRight size={24} />
            </button>
          )}

          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scroll-smooth pb-2 no-scrollbar pr-4"
          >
            {filteredProjects.map((p) => (
              <div
                key={p.id}
                onClick={() => setSelectedProject(p)}
                className="flex-none w-[260px] h-[180px] rounded-lg overflow-hidden shadow-lg bg-gray-200 dark:bg-gray-700 cursor-pointer"
              >
                  <img
                    src={`${R2_URL}/${p.thumbnail_url}`}
                    alt={p.title}
                    className="w-full h-full object-cover"
                  />
              </div>
            ))}
          </div>
        </>
      )}

      {selectedProject && (
        <ProjectPopup
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </motion.section>
  );
}
