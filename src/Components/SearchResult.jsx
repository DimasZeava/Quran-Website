import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Search from "./Search";

const SearchResult = () => {
  const location = useLocation();
  const { query, surahs } = location.state || { query: "", surahs: [] };
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const filteredResults = surahs.filter((surah) =>
          surah.englishName.toLowerCase().includes(query.toLowerCase())
        );
        setResults(filteredResults);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    if (query) {
      fetchResults();
    }
  }, [query, surahs]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="p-4">
      <Search />
      <h2 className="text-xl font-semibold mt-10 mb-4">Search Results for &quot;{query}&quot;</h2>
      <ul className="space-y-4">
        {results.map((result) => (
          <li key={result.number} className="surah-card p-4 bg-white shadow-md rounded-lg hover:bg-gray-100">
            <Link to={`/surah/${result.number}`} className="text-gray-900">
              {result.englishName}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResult;
