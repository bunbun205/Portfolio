'use client';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

const SiteLegend = () => {
  const [segments, setSegments] = useState<string[]>([]);
  const [hrefs, setHrefs] = useState<string[]>([]);

  useEffect(() => {
    const path = window.location.pathname;
    if (path === '/') return;

    const parts = path.split('/').filter(Boolean);
    setSegments(parts.map(capitalize));

    const hrefs = parts.map((_, i) => '/' + parts.slice(0, i + 1).join('/'));
    setHrefs(hrefs);
  }, []);

  if (segments.length === 0) return null;

  return (
    <motion.div
      className="bg-light-background dark:bg-dark-background mt-24 text-light-secondary dark:text-dark-secondary px-6 py-3 border-b border-gray-300 dark:border-gray-700 shadow-sm z-40"
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center gap-2 text-sm">
        <button
          onClick={() => window.history.back()}
          className="hover:underline font-medium mr-4"
        >
          ← Back
        </button>

        <AnimatePresence mode="popLayout">
          <motion.a
            key="home"
            href="/"
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 8 }}
            transition={{ duration: 0.25 }}
            className="hover:underline"
          >
            Home
          </motion.a>
        </AnimatePresence>

        {segments.map((segment, index) => (
          <motion.span
            key={segment}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 8 }}
            transition={{ duration: 0.25, delay: 0.05 * (index + 1) }}
            className="flex items-center"
          >
            <span className="mx-1">/</span>
            <a
              href={hrefs[index]}
              className="hover:underline"
            >
              {segment}
            </a>
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
};

export default SiteLegend;
