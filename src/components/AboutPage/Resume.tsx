"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const ResumeCard = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.section
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.9, ease: "easeOut" }}
        className="bg-light-secondary/10 dark:bg-dark-secondary/10 my-10 p-6 rounded-lg shadow-lg dark:shadow-none shadow-gray-500"
      >
        <h2 className="text-2xl font-bold mb-4">My Resume</h2>
        <div
          className="relative w-full max-w-4xl mx-auto aspect-[1101/584] bg-cover bg-center border cursor-pointer shadow-lg hover:scale-105 transition"
          style={{ backgroundImage: `url('/resume-preview.png')` }}
          onClick={() => setOpen(true)}
        >
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white font-semibold">
            Click to View
          </div>
        </div>
      </motion.section>

      {open && (
        <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-[1000]">
          <div className="relative w-full max-w-5xl h-[90vh]">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-2 right-2 text-white text-2xl hover:scale-110"
            >
              &times;
            </button>
            <iframe
              src="/resume_updated.pdf"
              className="w-full h-full border-none rounded"
            ></iframe>
          </div>
        </div>
      )}
    </>
  );
};

export default ResumeCard;
