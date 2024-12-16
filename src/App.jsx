import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Activities from "./Components/Activities";
import SurahDetails from "./Components/SurahDetails";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Activities />} />
        <Route path="/surah/:surahNumber" element={<SurahDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
