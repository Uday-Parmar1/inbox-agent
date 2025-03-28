import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }) {
  // Try to get theme from localStorage, fallback to system preference or light
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme;
    }
    
    // Check user's system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  };

  const [theme, setTheme] = useState(getInitialTheme);

  // Apply theme to document when it changes
  useEffect(() => {
    const root = window.document.documentElement;
    
    // Remove old theme class
    root.classList.remove('light', 'dark');
    
    // Add new theme class
    root.classList.add(theme);
    
    // Save to localStorage
    localStorage.setItem('theme', theme);

    // Apply theme to document
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      // Set scrollbar colors for dark mode
      document.documentElement.style.setProperty('--scrollbar-thumb', '#1f2937');
      document.documentElement.style.setProperty('--scrollbar-track', '#374151');
    } else {
      document.documentElement.classList.remove('dark');
      // Set scrollbar colors for light mode
      document.documentElement.style.setProperty('--scrollbar-thumb', '#d1d5db');
      document.documentElement.style.setProperty('--scrollbar-track', '#f3f4f6');
    }
  }, [theme]);

  // Toggle theme function
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  };
  
  const value = {
    theme,
    isDark: theme === 'dark',
    toggleTheme
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
} 