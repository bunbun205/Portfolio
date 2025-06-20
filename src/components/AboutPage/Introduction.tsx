"use client";

import { motion } from "framer-motion";

const IntroSection = () => (
  <motion.section
    initial={{ y: -100, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.9, ease: "easeOut" }}
    className="bg-light-secondary/10 dark:bg-dark-secondary/10 my-10 p-6 rounded-lg shadow-lg dark:shadow-none shadow-gray-500"
  >
    <h2 className="text-3xl font-bold mb-2">About Me</h2>
    <p className="text-lg">
      I'm a 3D generalist and game designer/developer passionate about creating
      interactive experiences and digital art.
    </p>
  </motion.section>
);
export default IntroSection;
