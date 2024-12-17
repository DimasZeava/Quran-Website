import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();
export const TranslationContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem("displayMode") || "light";
    setDarkMode(savedMode === "dark");
    document.body.className = savedMode === "dark" ? "dark" : "";
  }, []);

  const toggleTheme = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      const mode = newMode ? "dark" : "light";
      localStorage.setItem("displayMode", mode);
      document.body.className = newMode ? "dark" : "";
      return newMode;
    });
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const TranslationProvider = ({ children }) => {
  const [translation, setTranslation] = useState("id.indonesian");

  const changeTranslation = (newTranslation) => {
    setTranslation(newTranslation);
  };

  return (
    <TranslationContext.Provider value={{ translation, changeTranslation }}>
      {children}
    </TranslationContext.Provider>
  );
};
