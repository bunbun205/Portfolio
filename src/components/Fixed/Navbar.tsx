'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

const NavBar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const toggleMenu = () => setIsOpen(!isOpen);

	return (
		<motion.nav 
			initial={{ y: -100, opacity: 0 }}
			animate={{ y: 0, opacity: 1}}
			transition={{ duration: 0.6, ease: 'easeOut' }}
			className="fixed w-full z-50 bg-gradient-to-r from-light-accent to-light-primary dark:from-dark-accent dark:to-dark-primary text-light-text dark:text-dark-text shadow-md shadow-gray-500 dark:shadow-black py-4"
		>
			<div className="container mx-auto relative flex justify-between items-center px-4">
				<div className="text-4xl font-bold">Mayank Yadav</div>

				{/* Hamburger Icon (Mobile Only) */}
				<button
					className="lg:hidden text-3xl hover:scale-110 transition-transform"
					onClick={toggleMenu}
					aria-label="Toggle menu"
				>
					<i className={`bx ${isOpen ? 'bx-x' : 'bx-menu'}`}></i>
				</button>

				{/* Desktop Links */}
				<div className="hidden lg:flex space-x-6 text-lg">
					<a href="/" className="hover:text-blue-600">Home</a>
					<a href="/about" className="hover:text-blue-600">About</a>
					<a href="/contact" className="hover:text-blue-600">Contact Me</a>
				</div>

				{/* Mobile Dropdown Menu */}
				<div
					className={`absolute top-full left-0 w-full overflow-hidden transition-all duration-300 ease-in-out ${
						isOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
					} bg-light-accent dark:bg-dark-accent`}
				>
					<div className="flex flex-col px-4 py-3 space-y-2 text-lg">
						<a href="/" onClick={() => setIsOpen(false)} className="hover:text-blue-600">Home</a>
						<a href="/about" onClick={() => setIsOpen(false)} className="hover:text-blue-600">About Me</a>
						<a href="/contact" onClick={() => setIsOpen(false)} className="hover:text-blue-600">Contact Me</a>
					</div>
				</div>
			</div>
		</motion.nav>
	);
};

export default NavBar;
