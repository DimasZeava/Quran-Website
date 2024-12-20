import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Juz = () => {
  const [juzs, setJuzs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJuzs = async () => {
      try {
        const juzNumbers = Array.from({ length: 30 }, (_, i) => i + 1);
        const juzPromises = juzNumbers.map((juzNumber) =>
          fetch(
            `http://api.alquran.cloud/v1/juz/${juzNumber}/quran-uthmani`
          ).then((response) => {
            if (!response.ok) {
              throw new Error(
                `Error: ${response.status} ${response.statusText}`
              );
            }
            return response.json();
          })
        );
        const juzData = await Promise.all(juzPromises);
        setJuzs(juzData.map((data) => data.data));
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchJuzs();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-10 text-lg text-gray-600">Loading...</div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 text-xl mt-6">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="max-w-screen-lg mx-auto">
      <h1 className="surah-header text-gray-800 dark:text-white">List of Juz</h1>
      <div className="surah-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
        {juzs.map((juz) => (
          <div
            key={juz.number}
            className="surah-card bg-white shadow-lg rounded-lg p-4 text-center hover:bg-gray-100 hover:shadow-2xl transform hover:-translate-y-1 transition-transform duration-300"
          >
            <Link
              to={`/juz/${juz.number}`}
              className="surah-link text-lg font-medium text-gray-800 hover:text-blue-600"
            >
              Juz {juz.number}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Juz;
