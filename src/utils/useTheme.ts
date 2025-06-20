import { useEffect, useState } from 'react';

export function useTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    const html = document.documentElement;
    const observer = new MutationObserver(() => {
      if (html.classList.contains('dark')) {
        setTheme('dark');
      } else {
        setTheme('light');
      }
    });

    observer.observe(html, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  return theme;
}
