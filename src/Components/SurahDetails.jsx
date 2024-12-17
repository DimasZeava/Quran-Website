import { useEffect, useState, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { TranslationContext } from '../context.jsx';

const SurahDetails = () => {
  const { surahNumber } = useParams();
  const { translation } = useContext(TranslationContext);
  const [surah, setSurah] = useState(null);
  const [translationData, setTranslationData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const ayahsPerPage = 10;

  useEffect(() => {
    const fetchSurah = async () => {
      try {
        const responseArabic = await fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}`);
        const responseTranslation = await fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/${translation}`);

        if (!responseArabic.ok || !responseTranslation.ok) {
          throw new Error("Network response was not ok");
        }

        const dataArabic = await responseArabic.json();
        const dataTranslation = await responseTranslation.json();

        setSurah(dataArabic.data);
        setTranslationData(dataTranslation.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchSurah();
  }, [surahNumber, translation]);

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
    <div className='max-w-screen-lg'>
      <h1>{translationData.name}</h1>
      <p>{translationData.englishNameTranslation}</p>
      <ul>
        {currentAyahs.map((ayah, index) => (
          <li key={ayah.numberInSurah}>
            <p>{ayah.text}</p>
            <p>{translationData.ayahs[indexOfFirstAyah + index].text}</p>
          </li>
        ))}
      </ul>
      <div>
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span> Page {currentPage} of {totalPages} </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
      <Link to="/">Back</Link>
    </div>
  );
};

export default SurahDetails;