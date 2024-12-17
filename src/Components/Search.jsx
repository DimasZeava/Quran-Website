import { useState, useEffect } from "react";

const Search = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [surahs, setSurahs] = useState([]);

  useEffect(() => {
    // Fetch Surah data from the API
    const fetchSurahs = async () => {
      try {
        const response = await fetch("https://api.alquran.cloud/v1/surah");
        const data = await response.json();
        setSurahs(data.data);
      } catch (error) {
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
      const filteredSuggestions = surahs.filter((surah) =>
        surah.englishName.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSearch = () => {
    onSearch(query);
    setSuggestions([]);
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion.englishName);
    setSuggestions([]);
    onSearch(suggestion.englishName);
  };

  return (
    <div className="p-4">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search..."
        className="px-4 py-2 border rounded-lg w-full text-black"
      />
      <button
        onClick={handleSearch}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        Search
      </button>
      {suggestions.length > 0 && (
        <ul className="mt-2 border rounded-lg bg-white text-black">
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
