import { useContext } from "react";
import { ThemeContext, TranslationContext } from "../context.jsx";

const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { changeTranslation } = useContext(TranslationContext);

  return (
    <div>
      <div>Header</div>
      <button onClick={toggleTheme}>Toggle Theme (Current: {theme})</button>
      <button onClick={() => changeTranslation("id.indonesian")}>
        Indonesian Translation
      </button>
      <button onClick={() => changeTranslation("en.asad")}>
        English Translation
      </button>
    </div>
  );
};

export default Header;
