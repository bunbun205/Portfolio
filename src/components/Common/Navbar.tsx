'use client';
import { useState } from 'react';

const NavBar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const toggleMenu = () => setIsOpen((prev) => !prev);

	return (
		<nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-light-accent to-light-primary dark:from-dark-accent dark:to-dark-primary text-light-text dark:text-dark-text shadow-md shadow-gray-500 dark:shadow-black"
		>
			<div className="relative container mx-auto flex justify-between items-center px-4 py-6">
				<div className="text-4xl font-bold">Mayank Yadav</div>

				{/* Hamburger Button */}
				<button
					className="lg:hidden text-3xl hover:scale-110 transition-transform"
					onClick={toggleMenu}
					aria-label="Toggle menu"
				>
					<i className={`bx ${isOpen ? 'bx-x' : 'bx-menu'}`}></i>
				</button>

				{/* Desktop Navigation */}
				<div className="hidden lg:flex space-x-6 text-lg">
					<a href="/" className="hover:text-blue-600">Home</a>
					<a href="/about" className="hover:text-blue-600">About</a>
					<a href="/projects" className="hover:text-blue-600">Projects</a>
					<a href="/blog" className="hover:text-blue-600">Blog</a>
					<a href="/contact" className="hover:text-blue-600">Contact Me</a>
				</div>

				{/* Mobile Dropdown */}
				<div
					className={`absolute top-full left-0 w-full bg-light-accent dark:bg-dark-accent z-40 overflow-hidden transition-all duration-700 ease-in-out
					${isOpen ? 'max-h-[500px]' : 'max-h-0'}`}
				>
					<div className="flex flex-col px-4 py-4 space-y-4 text-lg overflow-y-auto max-h-[75vh]">
						<a href="/" onClick={toggleMenu} className="hover:text-blue-600">Home</a>
						<a href="/about" onClick={toggleMenu} className="hover:text-blue-600">About</a>
						<a href="/projects" onClick={toggleMenu} className="hover:text-blue-600">Projects</a>
						<a href="/blog" onClick={toggleMenu} className="hover:text-blue-600">Blog</a>
						<a href="/contact" onClick={toggleMenu} className="hover:text-blue-600">Contact Me</a>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default NavBar;
