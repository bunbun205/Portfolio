import { FaLinkedin, FaInstagram, FaYoutube, FaGithub } from 'react-icons/fa';
import { SiArtstation } from 'react-icons/si';

export default function Footer() {
  return (
    <footer className="w-full px-4 py-6 border-t border-white/10 bg-gradient-to-b from-light-accent/50 to-light-primary/50 dark:from-dark-accent/50 dark:to-dark-primary/50 backdrop-blur-xs text-light-text dark:text-dark-text flex flex-col sm:flex-row justify-between items-center gap-4">
      
      {/* Left - Copyright */}
      <a href="/copyright" className="text-sm hover:underline">
        © {new Date().getFullYear()} Mayank Yadav. All rights reserved.
      </a>

      {/* Center - Help Palestine */}
      <div className="text-sm text-center">
        <span role="img" aria-label="Palestinian Flag">🇵🇸</span>{' '}
        <a
          href="https://www.pcrf.net"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          Help Palestine
        </a>{' '}
        •{' '}
        <a
          href="https://linktr.ee/fundsforgaza"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          Funds for Gaza
        </a>
      </div>

      {/* Right - Socials */}
      <div className="flex gap-4 text-xl">
        <a href="https://www.linkedin.com/in/mayank-yadav-7873a1120/" target="_blank" rel="noopener noreferrer">
          <FaLinkedin />
        </a>
        <a href="https://www.instagram.com/may_ank.69/" target="_blank" rel="noopener noreferrer">
          <FaInstagram />
        </a>
        <a href="https://www.youtube.com/@zenthor3D/" target="_blank" rel="noopener noreferrer">
          <FaYoutube />
        </a>
        <a href="https://www.artstation.com/zenthor3d" target="_blank" rel="noopener noreferrer">
          <SiArtstation />
        </a>
        <a href="https://github.com/bunbun205" target="_blank" rel="noopener noreferrer">
          <FaGithub />
        </a>
      </div>
    </footer>
  );
}
