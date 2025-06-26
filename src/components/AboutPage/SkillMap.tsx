import { motion } from 'framer-motion';
import { useState } from 'react';

type Skill = {
  name: string;
  level: number;
  experience: string; // e.g. "2.5"
  description: string;
};

const skills: Skill[] = [
  { name: 'Blender', level: 90, experience: '3.2', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Maya', level: 85, experience: '2.9', description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
  { name: 'ZBrush', level: 80, experience: '2.4', description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco.' },
  { name: 'Substance Painter', level: 75, experience: '1.7', description: 'Duis aute irure dolor in reprehenderit in voluptate velit.' },
  { name: 'Unreal Engine', level: 80, experience: '2.8', description: 'Cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat.' },
  { name: 'Unity', level: 70, experience: '2.1', description: 'Cupidatat non proident, sunt in culpa qui officia deserunt.' },
  { name: 'C++', level: 65, experience: '3.0', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { name: 'Python', level: 70, experience: '2.5', description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
  { name: 'JavaScript', level: 60, experience: '2.0', description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco.' },
  { name: 'TypeScript', level: 60, experience: '1.8', description: 'Duis aute irure dolor in reprehenderit in voluptate velit.' },
];

const SkillMap = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <motion.section
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, delay: 0.3, ease: 'easeOut' }}
      className="bg-light-secondary/10 dark:bg-dark-secondary/10 my-10 p-6 rounded-lg shadow-lg shadow-gray-500 dark:shadow-none col-span-6"
    >
      <h2 className="text-2xl font-bold mb-4 text-center">Skill Map</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="relative group"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div
              className='flex flex-col gap-1 p-4 rounded-lg border border-transparent transition-shadow hover:bg-light-secondary/20 hover:dark:bg-dark-secondary/20 bg-light-deep/30 dark:bg-dark-deep/30 shadow-md shadow-black/10 dark:shadow-none'
            >
              <div className="flex justify-between text-sm font-medium">
                <span>{skill.name}</span>
                <span>{skill.level}%</span>
              </div>
              <div className="w-full bg-gray-300 dark:bg-gray-700 h-3 rounded-full">
                <div
                  className="bg-blue-500 h-3 rounded-full transition-all duration-500 ease-in-out"
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
            </div>

            {hoveredIndex === index && (
              <div className="absolute top-full left-0 mt-2 z-10 w-full p-3 text-sm rounded-lg bg-light-accent dark:bg-dark-accent text-light-text dark:text-dark-text shadow-lg border dark:border-white/10 border-black/10">
                <p className="font-semibold text-blue-600">Experience: {skill.experience} years</p>
                <p className="text-xs text-gray-800 dark:text-gray-300 mt-1">{skill.description}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </motion.section>
  );
};

export default SkillMap;
