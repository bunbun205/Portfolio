import React, { useState } from "react";
import { motion } from "framer-motion";

function CommissionsForm() {
  const [packageType, setPackageType] = useState("basic");

  return (
    <motion.section
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
      className="py-10"
    >
      <h2 className="text-2xl mb-2">Order a Commission</h2>
      <form className="space-y-4">
        <select
          className="w-full p-2 rounded bg-dark-background dark:bg-light-background text-dark-text dark:text-light-text"
          value={packageType}
          onChange={(e) => setPackageType(e.target.value)}
        >
          <option value="basic">Basic ($50)</option>
          <option value="premium">Premium ($100)</option>
          <option value="ultimate">Ultimate ($200)</option>
        </select>

        <input
          type="text"
          placeholder="Your Name"
          className="w-full p-2 rounded bg-dark-background dark:bg-light-background text-dark-text dark:text-light-text"
        />

        <input
          type="email"
          placeholder="Your Email"
          className="w-full p-2 rounded bg-dark-background dark:bg-light-background text-dark-text dark:text-light-text"
        />

        <button
          type="button"
          className="bg-light-primary dark:bg-dark-primary text-light-text dark:text-dark-text px-4 py-2 rounded"
          onClick={() => alert("Redirect to payment page or backend")}
        >
          Proceed to Payment
        </button>
      </form>
    </motion.section>
  );
}

export default CommissionsForm;
