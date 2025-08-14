import { motion } from 'framer-motion';
import { useState } from 'react';

type Skill = {
  name: string;
  level: number;
  experience: string; // e.g. "2.5"
  description: string;
};

const skills: Skill[] = [
  { name: 'Blender', level: 95, experience: '6', description: 'I have been dabbling in blender for both personal and professional projects. It\'s my 3D package of choice and is always a part of my 3D art workflow.' },
  { name: 'ZBrush', level: 80, experience: '4', description: ''},
  { name: 'Unreal Engine', level: 60, experience: '2', description: ''},
  { name: 'Unity', level: 75, experience: '2', description: ''},
  { name: 'Substance Painter', level: 60, experience: '3', description: ''},
  { name: 'Krita', level: 60, experience: '4', description: ''},
  { name: 'Inkscape', level: 50, experience: '2', description: ''},
  { name: 'DaVinci Resolve', level: 50, experience: '3', description: ''},
  { name: 'Affinity Suite', level: 40, experience: '1', description: ''},
  { name: 'FreeCAD', level: 70, experience: '1', description: ''},
  { name: 'Figma', level: 50, experience: '1', description: ''},
  { name: 'C++', level: 80, experience: '6', description: ''},
  { name: 'C#', level: 50, experience: '1', description: ''},
  { name: 'React', level: 60, experience: '1', description: ''},
  { name: 'Flutter', level: 50, experience: '1', description: ''},
  { name: 'AstroJS', level: 60, experience: '1', description: ''},
  { name: '3D Modelling', level: 95, experience: '6', description: ''},
  { name: 'Digital Sculpting', level: 80, experience: '4', description: ''},
  { name: 'Game Design', level: 90, experience: '2', description: ''},
  { name: 'Animation', level: 40, experience: '1', description: ''},
  { name: 'Web Design', level: 75, experience: '2', description: ''},
  { name: 'Game Development', level: 75, experience: '2', description: ''},
  { name: 'Digital Art', level: 80, experience: '5', description: ''},
  { name: 'UI/UX Design', level: 80, experience: '1', description: ''},
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
