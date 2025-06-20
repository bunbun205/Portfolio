"use client";

import { motion } from "framer-motion";

type Skill = {
  name: string;
  level: number;
};

const skills: Skill[] = [
  { name: "Blender", level: 90 },
  { name: "Maya", level: 85 },
  { name: "ZBrush", level: 80 },
  { name: "Substance Painter", level: 75 },
  { name: "Unreal Engine", level: 80 },
  { name: "Unity", level: 70 },
  { name: "C++", level: 65 },
  { name: "Python", level: 70 },
  { name: "JavaScript", level: 60 },
  { name: "TypeScript", level: 60 },
];

const SkillMap = () => {
  return (
    <motion.section
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, delay:0.3, ease: "easeOut" }}
      className="bg-light-secondary/10 dark:bg-dark-secondary/10 my-10 p-6 rounded-lg shadow-lg shadow-gray-500 dark:shadow-none col-span-6"
    >
      <h2 className="text-2xl font-bold mb-4 text-center">Skill Map</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {skills.map((skill, index) => (
          <div key={index} className="flex flex-col gap-1">
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
        ))}
      </div>
    </motion.section>
  );
};

export default SkillMap;
