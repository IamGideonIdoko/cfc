'use client';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setTheme('light');
    setMounted(true);
  }, [setTheme]);

  if (!mounted) return null;

  return (
    <label htmlFor="toggle" className="flex cursor-pointer items-center">
      <input
        checked={theme === 'light'}
        type="checkbox"
        id="toggle"
        className="peer sr-only"
        onChange={(e) => {
          setTheme(e.target.checked ? 'light' : 'dark');
        }}
      />
      <div className="relative block h-8 w-16 rounded-full bg-[var(--pri-color)] p-1 before:absolute before:left-1 before:h-6 before:w-6 before:rounded-full before:bg-black before:p-1 before:transition-all before:duration-500 peer-checked:before:left-8 peer-checked:before:bg-white"></div>
    </label>
  );
};

export default ThemeSwitch;
