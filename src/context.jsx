import { createContext, useState } from 'react';

export const ThemeContext = createContext();
export const TranslationContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const TranslationProvider = ({ children }) => {
  const [translation, setTranslation] = useState('id.indonesian');

  const changeTranslation = (newTranslation) => {
    setTranslation(newTranslation);
  };

  return (
    <TranslationContext.Provider value={{ translation, changeTranslation }}>
      {children}
    </TranslationContext.Provider>
  );
};