// themeContext.js
import React, { createContext, useState, useContext } from 'react';

const ThemeContext = createContext('green');

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('green'); // 'light' o 'dark'

  const changeTheme = (newTheme) => setTheme(newTheme);

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
