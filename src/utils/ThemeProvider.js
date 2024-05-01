import React, { createContext, useState, useEffect } from 'react';

// Create a context for the theme
export const ThemeContext = createContext();

// Create a provider for the theme context
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  // Switch the theme
  const switchTheme = (newTheme) => {
    setTheme(newTheme);
  };

  // Update CSS variables when theme changes
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.style.setProperty('--background-color', '#000000');
      document.documentElement.style.setProperty('--text-color', '#ffffff');
      document.documentElement.style.setProperty('--button-background', '#ffffff');
      document.documentElement.style.setProperty('--button-text-color', '#000000');
    } else {
      document.documentElement.style.setProperty('--background-color', '#ffffff');
      document.documentElement.style.setProperty('--text-color', '#000000');
      document.documentElement.style.setProperty('--button-background', 'transparent');
      document.documentElement.style.setProperty('--button-text-color', '#000000');
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, switchTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};