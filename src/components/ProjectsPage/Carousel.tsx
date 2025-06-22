'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { mockProjects } from '../../utils/mockProjects';

export default function Carousel() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((current + 1) % mockProjects.length);
  const prev = () => setCurrent((current - 1 + mockProjects.length) % mockProjects.length);

  useEffect(() => {
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [current]);

  return (
    <div className="py-4 mb-4 relative w-full max-w-6xl mx-auto h-[500px] overflow-hidden rounded-xl">
      <AnimatePresence>
        {mockProjects.map((project, index) =>
          index === current ? (
            <motion.a
              key={project.id}
              href={project.link}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute w-full h-full"
            >
              <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4 text-white text-lg font-semibold">
                {project.title}
              </div>
            </motion.a>
          ) : null
        )}
      </AnimatePresence>

      <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 text-white text-3xl z-10">‹</button>
      <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 text-white text-3xl z-10">›</button>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {mockProjects.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full ${current === index ? 'bg-white' : 'bg-gray-400/50'}`}
          />
        ))}
      </div>
    </div>
  );
}
