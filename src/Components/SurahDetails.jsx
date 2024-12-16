import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const SurahDetails = () => {
  const { surahNumber } = useParams();
  const [surah, setSurah] = useState(null);
  const [translation, setTranslation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const ayahsPerPage = 10;

  useEffect(() => {
    const fetchSurah = async () => {
      try {
        const responseArabic = await fetch(
          `https://api.alquran.cloud/v1/surah/${surahNumber}`
        );
        const responseIndonesian = await fetch(
          `https://api.alquran.cloud/v1/surah/${surahNumber}/id.indonesian`
        );

        if (!responseArabic.ok || !responseIndonesian.ok) {
          throw new Error("Network response was not ok");
        }

        const dataArabic = await responseArabic.json();
        const dataIndonesian = await responseIndonesian.json();

        setSurah(dataArabic.data);
        setTranslation(dataIndonesian.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchSurah();
  }, [surahNumber]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const indexOfLastAyah = currentPage * ayahsPerPage;
  const indexOfFirstAyah = indexOfLastAyah - ayahsPerPage;
  const currentAyahs = surah.ayahs.slice(indexOfFirstAyah, indexOfLastAyah);
  const totalPages = Math.ceil(surah.ayahs.length / ayahsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <h1>{surah.englishName}</h1>
      <p>{surah.englishNameTranslation}</p>
      <ul>
        {currentAyahs.map((ayah, index) => (
          <li key={ayah.numberInSurah}>
            <p>{ayah.text}</p>
            <p>{translation.ayahs[indexOfFirstAyah + index].text}</p>
          </li>
        ))}
      </ul>
      <div>
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          {" "}
          Page {currentPage} of {totalPages}{" "}
        </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
      <Link to="/">Back</Link>
    </div>
  );
};

export default SurahDetails;
