import { motion } from "framer-motion";

export default function ContactForm() {
  return (
    <motion.section
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, delay: 0.6, ease: "easeOut" }}
      className="py-10"
    >
      <h2 className="text-2xl mb-2">Have a message? Let me know!</h2>
      <form className="space-y-4">
        <input
          type="text"
          placeholder="Your Name"
          className="w-full p-2 rounded bg-dark-background text-dark-text dark:bg-light-background dark:text-light-text"
        />
        <input
          type="email"
          placeholder="Your Email"
          className="w-full p-2 rounded bg-dark-background text-dark-text dark:bg-light-background dark:text-light-text"
        />
        <input
          type="text"
          placeholder="Your Message"
          className="w-full h-25 p-2 rounded bg-dark-background text-dark-text dark:bg-light-background dark:text-light-text"
        />

        <button
          type="submit"
          className="bg-light-primary dark:bg-dark-primary text-light-text dark:text-dark-text px-4 py-2 rounded"
        >
          Send Message
        </button>
      </form>
    </motion.section>
  );
}
