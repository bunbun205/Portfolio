import { useState } from 'react';
import { X, Heart, ChevronLeft, ChevronRight } from 'react-feather';
import type { Project } from '../../utils/interfaces';

interface Props {
  project: Project;
  onClose: () => void;
}

export default function ProjectPopup({ project, onClose }: Props) {
  const [liked, setLiked] = useState(false);
  const [current, setCurrent] = useState(0);

  const toggleLike = () => setLiked((prev) => !prev);
  const nextSlide = () => setCurrent((current + 1) % project.assets.length);
  const prevSlide = () =>
    setCurrent((current - 1 + project.assets.length) % project.assets.length);

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex justify-center items-center p-4">
      <div className="bg-light-background dark:bg-dark-background w-full max-w-8xl h-[90vh] rounded-lg shadow-lg overflow-hidden relative flex flex-col md:flex-row">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl text-light-text dark:text-dark-text hover:scale-110 z-50"
        >
          <X />
        </button>

        {/* Left - Slideshow */}
        <div className="relative w-full md:w-2/3 h-2/5 md:h-full bg-black">
          <img
            src={project.assets[current]}
            alt={`Asset ${current}`}
            className="w-full h-full object-contain"
          />
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
                  current === i ? 'bg-white' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Right - Details */}
        <div className="p-6 flex flex-col gap-3 md:w-1/3 h-full overflow-y-auto">
          <h2 className="text-2xl font-bold text-black dark:text-white">{project.title}</h2>
          <p className="text-gray-700 dark:text-gray-300 text-sm">
            {project.description || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'}
          </p>

          <div className="mt-auto flex items-center justify-between">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Category: {project.category}
            </div>
            <button onClick={toggleLike} className="flex items-center gap-1">
              <Heart
                fill={liked ? 'red' : 'none'}
                color={liked ? 'red' : 'gray'}
                size={20}
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {project.likes + (liked ? 1 : 0)}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
