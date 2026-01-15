'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

interface ThemeContextType {
  theme: 'light' | 'dark' | 'system';
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'system' | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;
    const body = document.body;

    // Remove existing theme classes
    root.removeAttribute('data-theme');
    body.classList.remove('dark-mode', 'light-mode');

    if (theme === 'dark') {
      root.setAttribute('data-theme', 'dark');
      body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
      localStorage.setItem('bricks-dark-mode', 'true');
    } else if (theme === 'light') {
      root.setAttribute('data-theme', 'light');
      body.classList.add('light-mode');
      localStorage.setItem('theme', 'light');
      localStorage.setItem('bricks-dark-mode', 'false');
    } else {
      // System preference
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      if (mediaQuery.matches) {
        body.classList.add('dark-mode');
        localStorage.setItem('bricks-dark-mode', 'true');
      } else {
        body.classList.add('light-mode');
        localStorage.setItem('bricks-dark-mode', 'false');
      }
      localStorage.setItem('theme', 'system');
    }
  }, [theme, mounted]);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}