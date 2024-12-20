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
import SearchResult from "./Components/SearchResult";
import "./index.css";
import Juz from "./Components/Juz.jsx";
import JuzDetail from "./Components/JuzDetail.jsx";
import LandingPage from "./Components/LandingPage.jsx";
import Footer from "./Components/Footer.jsx";

const AppContent = () => {
  const { darkMode } = useContext(ThemeContext);

  return (
    <div
      className={`w-screen min-h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <LandingPage />
              <Juz />
              <Surah />
            </>
          }
        />
        <Route path="/juz/:juzNumber" element={<JuzDetail />} />
        <Route path="/surah/:surahNumber" element={<SurahDetails />} />
        <Route path="/search" element={<SearchResult />} />
      </Routes>
      <Footer />
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
