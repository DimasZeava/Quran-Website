import { useContext, useRef, useEffect } from "react";
import { ThemeContext, TranslationContext } from "../context.jsx";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon, faHome } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const { changeTranslation } = useContext(TranslationContext);
  const iconRef = useRef(null);
  const homeRef = useRef(null);
  const toggleButtonRef = useRef(null);

  const handleClick = () => {
    gsap.to(iconRef.current, {
      rotate: 360,
      duration: 0.2,
      ease: "power2.inOut",
      onComplete: toggleTheme,
    });
  };

  useEffect(() => {
    gsap.fromTo(
      homeRef.current,
      { scale: 1 },
      {
        scale: 1.1,
        duration: 0.2,
        ease: "power2.inOut",
        paused: true,
        repeat: -1,
        yoyo: true,
        onHover: true,
      }
    );

    gsap.fromTo(
      toggleButtonRef.current,
      { scale: 1 },
      {
        scale: 1.1,
        duration: 0.2,
        ease: "power2.inOut",
        paused: true,
        repeat: -1,
        yoyo: true,
        onHover: true,
      }
    );
  }, []);

  return (
    <div className="p-4 flex justify-end">
      <Link
        to={`/`}
        className="home text-lg px-4 py-2 font-medium bg-white text-black dark:bg-gray-900 dark:text-white"
        ref={homeRef}
        onMouseEnter={() => gsap.to(homeRef.current, { scale: 1.1, duration: 0.2 })}
        onMouseLeave={() => gsap.to(homeRef.current, { scale: 1, duration: 0.2 })}
      >
        <FontAwesomeIcon icon={faHome} className="mr-2" />
      </Link>
      <button
        onClick={handleClick}
        className="toggle-button px-4 py-2 bg-white text-black dark:bg-gray-900 dark:text-white"
        ref={toggleButtonRef}
        onMouseEnter={() => gsap.to(toggleButtonRef.current, { scale: 1.1, duration: 0.2 })}
        onMouseLeave={() => gsap.to(toggleButtonRef.current, { scale: 1, duration: 0.2 })}
      >
        <FontAwesomeIcon
          icon={darkMode ? faMoon : faSun}
          ref={iconRef}
          className="text-xl w-5"
        />
      </button>
      <button
        onClick={() => changeTranslation("id.indonesian")}
        className="px-4 py-2 bg-white text-black dark:bg-gray-900 dark:text-white"
      >
        ID
      </button>
      <button
        onClick={() => changeTranslation("en.asad")}
        className="px-4 py-2 bg-white text-black dark:bg-gray-900 dark:text-white"
      >
        EN
      </button>
    </div>
  );
};

export default Header;
