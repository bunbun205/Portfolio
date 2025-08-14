import { motion } from "framer-motion";

const Introduction = () => (
  <motion.section
    initial={{ y: -100, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.9, ease: "easeOut" }}
    className="bg-light-secondary/10 dark:bg-dark-secondary/10 my-10 p-6 rounded-lg shadow-lg dark:shadow-none shadow-gray-500"
  >
    <h2 className="text-3xl font-bold mb-2">About Me</h2>
    <p className="text-lg">
      Hi! My name is <b>Mayank Yadav</b>, a <b>Developer</b>, <b>Artist</b>, and <b>Designer</b>. I am a generalist who combines by diverse skills to create amazing digital experiences, like this website. Checkout my projects and blog and connect with me if you would like to collaborate or hire me!
    </p>
  </motion.section>
);
export default Introduction;
