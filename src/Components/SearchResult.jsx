import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

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
    <div>
      <h2>Search Results for &quot;{query}&quot;</h2>
      <ul>
        {results.map((result) => (
          <li key={result.number}>
            <Link to={`/surah/${result.number}`}>{result.englishName}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResult;
