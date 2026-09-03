import { useState } from "react";
import { motion } from "framer-motion";

const API_BASE = "https://portfolio-backend.mayank69123-5d3.workers.dev";

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus("error");
      setErrorMessage("Please fill out all fields.");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch(`${API_BASE}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Failed to send message.");
      }

      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(err.message || "Something went wrong. Please try again.");
    }
  };

  return (
      <motion.section
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
          className="py-10"
      >
        <h2 className="text-2xl mb-2">Have a message? Let me know!</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={status === "submitting"}
              className="w-full p-2 rounded bg-dark-background text-dark-text dark:bg-light-background dark:text-light-text disabled:opacity-50"
          />
          <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === "submitting"}
              className="w-full p-2 rounded bg-dark-background text-dark-text dark:bg-light-background dark:text-light-text disabled:opacity-50"
          />
          <textarea
              placeholder="Your Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={status === "submitting"}
              className="w-full h-40 p-2 rounded bg-dark-background text-dark-text dark:bg-light-background dark:text-light-text disabled:opacity-50"
          />

          {status === "error" && (
              <p className="text-red-500 text-sm">{errorMessage}</p>
          )}
          {status === "success" && (
              <p className="text-green-500 text-sm">
                Message sent! I'll get back to you soon.
              </p>
          )}

          <button
              type="submit"
              disabled={status === "submitting"}
              className="bg-light-primary dark:bg-dark-primary text-light-text dark:text-dark-text px-4 py-2 rounded disabled:opacity-50"
          >
            {status === "submitting" ? "Sending..." : "Send Message"}
          </button>
        </form>
      </motion.section>
  );
}