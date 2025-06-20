"use client";

import { motion } from "framer-motion";

const Hobbies = () => (
  <motion.section
    initial={{ y: -100, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.9, delay: 0.6, ease: "easeOut" }}
    className="bg-light-secondary/10 dark:bg-dark-secondary/10 my-10 p-6 rounded-lg shadow-lg dark:shadow-none shadow-gray-500"
  >
    <h2 className="text-2xl font-bold mb-4">Hobbies</h2>
    <ul className="list-disc list-inside space-y-1">
      <li>Sketching & Digital Painting</li>
      <li>Playing Indie Games</li>
      <li>Exploring Game Engines</li>
      <li>Photography</li>
    </ul>
  </motion.section>
);
export default Hobbies;
