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
import Juz from "./Components/Juz.jsx";
import JuzDetail from "./Components/JuzDetail.jsx";

const AppContent = () => {
  const { darkMode } = useContext(ThemeContext);

  return (
    <div
      className={`w-screen min-h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <Header />
      <div className="hero">
        <h1 className="title"> Qur&apos;an Website</h1>
        <h3 className="description">
          Mari baca Al-Qur&apos;an dan mendekat kepada Allah Swt.
        </h3>
        <Search />
      </div>
      <Routes>
        <Route path="/" element={<><Juz /><Surah /></>} />
        <Route path="/juz/:juzNumber" element={<JuzDetail />} />
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
