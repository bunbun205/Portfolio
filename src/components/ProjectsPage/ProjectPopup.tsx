import { useState } from "react";
import { X, Heart, ChevronLeft, ChevronRight } from "react-feather";
import { motion, AnimatePresence } from "framer-motion";
import type { Project } from "../../utils/interfaces";

interface Props {
  project: Project;
  onClose: () => void;
}

const R2_URL = "https://pub-925169039ca2466a9fccafe6acd0d070.r2.dev";
const WORKER_URL = "https://portfolio-backend.mayank69123-5d3.workers.dev";
const API_KEY =
  "5fb10b5369a1a45689f95d6aa1fa97df8e5b59925101f93e6e4b790ec0c6782a";

export default function ProjectPopup({ project, onClose }: Props) {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(project.likes);
  const [current, setCurrent] = useState(0);

  const toggleLike = async () => {
    const newLiked = !liked;
    setLiked(newLiked);
    setLikesCount((prev) => prev + (newLiked ? 1 : -1));

    try {
      const response = await fetch(
        `${WORKER_URL}/rest/projects/${project.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
          body: JSON.stringify({
            likes: newLiked ? likesCount + 1 : likesCount - 1,
          }),
        }
      );
      if (!response.ok) {
        throw new Error(`Failed to update likes: ${response.statusText}`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % project.assets.length);
  };

  const prevSlide = () => {
    setCurrent(
      (prev) => (prev - 1 + project.assets.length) % project.assets.length
    );
  };

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "backInOut" }}
      className="fixed inset-0 bg-black/70 z-50 flex justify-center items-center p-4"
    >
      <div className="bg-light-background dark:bg-dark-background w-full max-w-8xl h-[90vh] rounded-lg shadow-lg overflow-hidden relative flex flex-col md:flex-row">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl text-light-text dark:text-dark-text hover:scale-110 z-50"
        >
          <X />
        </button>

        {/* Left - Slideshow */}
        <div className="relative w-full md:w-2/3 h-2/5 md:h-full bg-black flex items-center justify-center">
          <AnimatePresence initial={false} mode="wait">
            <motion.img
              key={current}
              src={`${R2_URL}/` + project.assets[current]}
              alt={`Asset ${current}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full object-contain absolute"
            />
          </AnimatePresence>
          {project.assets.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-2 top-1/2 -translate-y-1/2 text-white text-3xl z-10"
              >
                <ChevronLeft />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-white text-3xl z-10"
              >
                <ChevronRight />
              </button>
            </>
          )}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
            {project.assets.map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full ${
                  current === i ? "bg-white" : "bg-white/30"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Right - Details */}
        <div className="p-6 flex flex-col gap-3 md:w-1/3 h-full overflow-y-auto">
          <h2 className="text-2xl font-bold text-black dark:text-white">
            {project.title}
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-sm">
            {project.description ||
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
          </p>

          <div className="mt-auto flex items-center justify-between">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Category: {project.category}
            </div>
            <button onClick={toggleLike} className="flex items-center gap-1">
              <Heart
                fill={liked ? "red" : "none"}
                color={liked ? "red" : "gray"}
                size={20}
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {likesCount}
              </span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
