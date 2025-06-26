import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "react-feather";
import { motion } from "framer-motion";
import { mockProjects } from "../../utils/mockProjects";
import type { Project } from "../../utils/interfaces";
import ProjectPopup from "./ProjectPopup";

interface Props {
  category: string;
  slug: string;
  delay: number;
}

export default function CategorySection({ category, slug, delay }: Props) {
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

  const projects: Project[] = mockProjects
    .filter((p) => p.category === category)
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
        {projects.map((p) => (
          <div
            key={p.id}
            onClick={() => setSelectedProject(p)}
            className="flex-none w-[260px] h-[180px] rounded-lg overflow-hidden shadow-lg bg-gray-200 dark:bg-gray-700"
          >
            <img
              src={p.thumbnail_url}
              alt={p.title}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
      {selectedProject && (
        <ProjectPopup
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </motion.section>
  );
}
