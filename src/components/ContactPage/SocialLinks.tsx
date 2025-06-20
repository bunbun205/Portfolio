import { FaLinkedin, FaInstagram, FaYoutube, FaGithub } from 'react-icons/fa';
import { SiArtstation } from 'react-icons/si';
import { motion } from 'framer-motion';

export default function SocialLinks() {
  return (
    <motion.section 
    initial={{ y: -100, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.9, ease: "easeOut" }}
    className="py-10"
    >
      <h2 className="text-2xl mb-2">Hit me up!</h2>
    <div className="flex gap-4 text-2xl">
      <a
        href="https://www.linkedin.com/in/mayank-yadav-7873a1120/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaLinkedin className='hover:scale-110 transition-transform' />
      </a>
      <a
        href="https://www.instagram.com/may_ank.69/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaInstagram className='hover:scale-110 transition-transform' />
      </a>
      <a
        href="https://www.youtube.com/@zenthor3D/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaYoutube className='hover:scale-110 transition-transform' />
      </a>
      <a
        href="https://www.artstation.com/zenthor3d"
        target="_blank"
        rel="noopener noreferrer"
      >
        <SiArtstation className='hover:scale-110 transition-transform' />
      </a>
      <a
        href="https://www.github.com/bunbun205"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaGithub className='hover:scale-110 transition-transform' />
      </a>
    </div>
    </motion.section>
  );
}
