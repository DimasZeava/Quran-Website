import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, TranslationProvider } from "./context.jsx";
import Header from "./Components/Header";
import SurahDetails from "./Components/SurahDetails";
import Surah from "./Components/Surah.jsx";

const App = () => {
  return (
    <ThemeProvider>
      <TranslationProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Surah />} />
            <Route path="/surah/:surahNumber" element={<SurahDetails />} />
          </Routes>
        </Router>
      </TranslationProvider>
    </ThemeProvider>
  );
};

export default App;
