import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [surahs, setSurahs] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch Surah data from the API
    const fetchSurahs = async () => {
      try {
        const response = await fetch("https://api.alquran.cloud/v1/surah");
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setSurahs(data.data);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching Surah data:", error);
      }
    };

    fetchSurahs();
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    // Filter suggestions based on the input value
    if (value) {
      const filteredSuggestions = surahs
        .filter((surah) =>
          surah.englishName.toLowerCase().includes(value.toLowerCase())
        )
        .slice(0, 3);
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearch = () => {
    navigate(`/search`, { state: { query, surahs } });
    setSuggestions([]);
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion.englishName);
    setSuggestions([]);
    navigate(`/surah/${suggestion.number}`);
  };

  return (
    <div className="text-black w-full relative">
      <div className="flex items-center rounded-lg w-full bg-white shadow-md border">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Search..."
          className="px-4 py-2 w-full outline-none rounded-l-lg"
        />
        <button
          onClick={handleSearch}
          className="p-2 text-gray-500 bg-white rounded-r-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </div>
      {error && <div className="mt-2 text-red-500">{error}</div>}
      {suggestions.length > 0 && (
        <ul className="absolute mt-2 border rounded-lg w-full bg-white overflow-y-auto">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.number}
              onClick={() => handleSuggestionClick(suggestion)}
              className="px-4 py-2 cursor-pointer hover:bg-gray-200"
            >
              {suggestion.englishName}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;
