import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { ThemeProvider, TranslationProvider, ThemeContext } from "./context.jsx";
import Header from "./Components/Header";
import SurahDetails from "./Components/SurahDetails";
import Surah from "./Components/Surah.jsx";
import Search from "./Components/Search";
import "./index.css";

const AppContent = () => {
  const { darkMode } = useContext(ThemeContext);

  const handleSearch = (query) => {
    console.log("Search query:", query);
    // Implement your search logic here
  };

  return (
    <div className={`w-screen min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <Header />
      <Search onSearch={handleSearch} />
      <Routes>
        <Route path="/" element={<Surah />} />
        <Route path="/surah/:surahNumber" element={<SurahDetails />} />
      </Routes>
    </div>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <TranslationProvider>
        <Router>
          <AppContent />
        </Router>
      </TranslationProvider>
    </ThemeProvider>
  );
};

export default App;