import { useContext } from "react";
import { ThemeContext, TranslationContext } from "../context.jsx";
import { Link } from "react-router-dom";

const Header = () => {
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const { changeTranslation } = useContext(TranslationContext);

  return (
    <div className="p-4">
      <div>Header</div>
      <Link
        to={`/`}
        className="home text-lg font-medium text-gray-800 hover:text-blue-600"
      >
        Home
      </Link>
      <button
        onClick={toggleTheme}
        className="px-4 py-2 bg-blue-500 text-white rounded dark:bg-blue-700"
      >
        Toggle Theme (Current: {darkMode ? "dark" : "light"})
      </button>
      <button
        onClick={() => changeTranslation("id.indonesian")}
        className="px-4 py-2 bg-green-500 text-white rounded ml-2 dark:bg-green-700"
      >
        ID
      </button>
      <button
        onClick={() => changeTranslation("en.asad")}
        className="px-4 py-2 bg-red-500 text-white rounded ml-2 dark:bg-red-700"
      >
        EN
      </button>
    </div>
  );
};

export default Header;
