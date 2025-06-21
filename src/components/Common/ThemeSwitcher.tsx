'use client';
import { useEffect, useState } from 'react';

const ThemeSwitcher = () => {
	const [isDark, setIsDark] = useState(false);

	// Load theme on mount
	useEffect(() => {
		const storedTheme = localStorage.getItem('theme');
		const html = document.documentElement;

		if (storedTheme === 'dark') {
			html.classList.add('dark');
			setIsDark(true);
		}
	}, []);

	// Toggle theme
	const toggleTheme = () => {
		const html = document.documentElement;
		const nowDark = html.classList.contains('dark');

		if (nowDark) {
			html.classList.remove('dark');
			localStorage.setItem('theme', 'light');
			setIsDark(false);
		} else {
			html.classList.add('dark');
			localStorage.setItem('theme', 'dark');
			setIsDark(true);
		}
	};

	return (
		<button
			onClick={toggleTheme}
			aria-label="Toggle Theme"
			className="fixed bottom-25 left-1/2 -translate-x-1/2 lg:bottom-1/2 lg:left-auto lg:right-4 lg:translate-x-0 lg:translate-y-1/2 z-50 bg-light-accent dark:bg-dark-accent text-white p-2 rounded-full shadow-lg opacity-25 hover:opacity-100 hover:scale-110 transition-all duration-300"
		>
			<i className={`text-lg bx ${isDark ? 'bx-sun' : 'bx-moon'}`}></i>
		</button>
	);
};

export default ThemeSwitcher;
