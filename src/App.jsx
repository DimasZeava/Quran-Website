import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import {
  ThemeProvider,
  TranslationProvider,
  ThemeContext,
} from "./context.jsx";
import Header from "./Components/Header";
import SurahDetails from "./Components/SurahDetails";
import Surah from "./Components/Surah.jsx";
import Search from "./Components/Search";
import SearchResult from "./Components/SearchResult";
import "./index.css";

const AppContent = () => {
  const { darkMode } = useContext(ThemeContext);

  return (
    <div
      className={`w-screen min-h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <Header />
      <Search />
      <Routes>
        <Route path="/" element={<Surah />} />
        <Route path="/surah/:surahNumber" element={<SurahDetails />} />
        <Route path="/search" element={<SearchResult />} />
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
