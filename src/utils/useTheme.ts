import { useEffect, useState } from 'react';

export function useTheme() {
  const getCurrentTheme = () => {
    const html = document.documentElement;
    if (html.classList.contains('light')) return 'light';
    if (html.classList.contains('dark')) return 'dark';
    return 'light'; // default fallback
  };

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      return getCurrentTheme();
    }
    return 'light'; // SSR fallback
  });

  useEffect(() => {
    const html = document.documentElement;
    const observer = new MutationObserver(() => {
      const currentTheme = getCurrentTheme();
      setTheme(currentTheme);
    });

    observer.observe(html, { attributes: true, attributeFilter: ['class'] });

    // Set initial theme once more on client mount (covers hydration edge case)
    setTheme(getCurrentTheme());

    return () => observer.disconnect();
  }, []);

  return theme;
}
