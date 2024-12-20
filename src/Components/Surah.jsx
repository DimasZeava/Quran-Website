import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Surah = () => {
  const [data, setData] = useState([]); // Menyimpan data surah
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1); // Halaman aktif
  const surahPerPage = 15; // Batas 15 surah per halaman

  // Fetch data surah dari API
  useEffect(() => {
    fetch("https://api.alquran.cloud/v1/surah")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setData(data.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center text-gray-600 text-xl mt-6">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600 text-xl mt-6">Error: {error.message}</div>;
  }

  // Logic untuk pagination
  const indexOfLastSurah = currentPage * surahPerPage;
  const indexOfFirstSurah = indexOfLastSurah - surahPerPage;
  const currentSurahs = data.slice(indexOfFirstSurah, indexOfLastSurah);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="max-w-screen-lg mx-auto">
      <h1 className="surah-header text-gray-800 dark:text-white">List of Surah</h1>
      <div className="surah-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
        {currentSurahs.map((surah) => (
          <div key={surah.number} className="surah-card bg-white shadow-lg rounded-lg p-4 text-center hover:bg-gray-100 hover:shadow-2xl transform hover:-translate-y-1 transition-transform duration-300">
            <Link to={`/surah/${surah.number}`} className="surah-link text-lg font-medium text-gray-800 hover:text-blue-600">
              {surah.number}. {surah.englishName} ({surah.name})
            </Link>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6 mb-10">
        {Array.from({ length: Math.ceil(data.length / surahPerPage) }).map((_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={`mx-1 px-4 py-2 rounded-lg ${currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-blue-400 hover:text-white"}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Surah;
